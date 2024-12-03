"use client";

import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import EmptyMenu from "@/app/components/Menu/EmptyMenu";
import ExpandMenuItem from "@/app/components/Menu/ExpandMenuItem";
import { useSortableTreeHandlers } from "@/app/components/SortableTree/handlers";
import { SortableTreeItem } from "@/app/components/SortableTree/SortableTreeItem";
import type { TreeItems } from "@/app/components/SortableTree/sortableTreeTypes";
import { useNavigationContext } from "@/context/NavigationContext";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface SortableMenuTreeProps {
  initialList?: TreeItems;
  indentationWidth?: number;
}

export const SortableMenuTree = ({
  indentationWidth = 50,
}: SortableMenuTreeProps) => {
  const { itemList } = useNavigationContext();
  const sensors = useSensors(useSensor(PointerSensor));

  const {
    handleDragStart,
    handleDragMove,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
    handleRemove,
    handleEdit,
    handleAdd,
    activeId,
    offsetLeft,
    sensorContext,
    measuring,
    flattenedItems,
    sortedIds,
    activeItem,
    projected,
    findOverlayItemData,
  } = useSortableTreeHandlers();

  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft,
    };
  }, [flattenedItems, offsetLeft]);

  return (
    <div className="overflow-hidden rounded-lg border border-secondary-5">
      {itemList.length ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          measuring={measuring}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={sortedIds}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col bg-secondary-2">
              {flattenedItems.map(({ id, depth, data }) => (
                <SortableTreeItem
                  key={id}
                  id={id}
                  data={data}
                  depth={id === activeId && projected ? projected.depth : depth}
                  indentationWidth={indentationWidth}
                  onRemove={() => handleRemove(id)}
                  onEdit={handleEdit}
                  onAdd={handleAdd}
                />
              ))}
              {createPortal(
                <DragOverlay>
                  {activeId && activeItem ? (
                    <SortableTreeItem
                      id={activeId}
                      depth={activeItem.depth}
                      clone
                      data={findOverlayItemData(activeId)}
                      indentationWidth={indentationWidth}
                    />
                  ) : null}
                </DragOverlay>,
                document.body
              )}
              <ExpandMenuItem />
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <EmptyMenu />
      )}
    </div>
  );
};

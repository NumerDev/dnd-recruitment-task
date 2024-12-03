import { FlattenedItem } from "@/app/components/SortableTree/items";
import {
  addSubItem,
  buildTree,
  findItem,
  findItemDeep,
  flattenTree,
  getProjection,
  removeItem,
  updateItem,
} from "@/app/components/SortableTree/utilities";
import { useNavigationContext } from "@/context/NavigationContext";
import {
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core/dist/types";
import { useMemo, useRef, useState } from "react";

import type {
  SensorContext,
  TreeItemData,
} from "@/app/components/SortableTree/sortableTreeTypes";
import { MeasuringStrategy } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const indentationWidth = 50;

export const useSortableTreeHandlers = () => {
  const { itemList, setItemList } = useNavigationContext();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(itemList);

    return flattenedTree;
  }, [activeId, itemList]);

  const sensorContext: SensorContext = useRef({
    items: flattenedItems,
    offset: offsetLeft,
  });

  const projected =
    activeId && overId
      ? getProjection(
          flattenedItems,
          activeId,
          overId,
          offsetLeft,
          indentationWidth
        )
      : null;

  const sortedIds = useMemo(
    () => flattenedItems.map(({ id }) => id),
    [flattenedItems]
  );

  const activeItem = activeId
    ? flattenedItems.find(({ id }) => id === activeId)
    : null;

  const handleDragStart = ({ active: { id: activeId } }: DragStartEvent) => {
    setActiveId(activeId);
    setOverId(activeId);
  };

  const handleDragMove = ({ delta }: DragMoveEvent) => {
    setOffsetLeft(delta.x);
  };

  const handleDragOver = ({ over }: DragOverEvent) => {
    setOverId(over?.id ?? null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    resetState();

    if (projected && over) {
      const { depth, parentId } = projected;

      if (over?.id === parentId) {
        return;
      }

      const clonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree(itemList))
      );

      const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);

      const activeTreeItem = clonedItems[activeIndex];

      const isInvalidParent = (
        parentId: UniqueIdentifier | null,
        childId: UniqueIdentifier
      ): boolean => {
        let currentParentId = parentId;

        while (currentParentId) {
          if (currentParentId === childId) {
            return true;
          }

          const currentItem = clonedItems.find(
            ({ id }) => id === currentParentId
          );
          currentParentId = currentItem?.parentId ?? null;
        }

        return false;
      };

      if (isInvalidParent(parentId, active.id)) return;

      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
      const newItems = buildTree(sortedItems);

      setItemList(newItems);
    }
  };

  const handleDragCancel = () => {
    resetState();
  };

  const resetState = () => {
    setOverId(null);
    setActiveId(null);
    setOffsetLeft(0);
  };

  const handleRemove = (id: UniqueIdentifier) => {
    setItemList((items) => removeItem(items, id));
  };

  const handleEdit = (id: UniqueIdentifier, data: TreeItemData) => {
    setItemList((items) => updateItem(items, id, data));
  };

  const handleAdd = (id: UniqueIdentifier, data: TreeItemData) => {
    setItemList((items) => addSubItem(items, id, data));
  };

  const findItemById = (id: UniqueIdentifier) => {
    return findItemDeep(flattenedItems, id);
  };

  const findOverlayItemData = (activeId: UniqueIdentifier) =>
    findItem(flattenedItems, activeId)?.data as TreeItemData;

  const measuring = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  };

  return {
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
    flattenedItems,
    sortedIds,
    activeItem,
    projected,
    findOverlayItemData,
    findItemById,
    measuring,
  };
};

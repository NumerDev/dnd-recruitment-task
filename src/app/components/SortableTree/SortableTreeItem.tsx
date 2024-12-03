import type { TreeMenuItemProps } from "@/app/components/Menu/MenuItem";
import MenuItem from "@/app/components/Menu/MenuItem";

import type { UniqueIdentifier } from "@dnd-kit/core";
import { AnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";

interface SortableTreeItemProps extends TreeMenuItemProps {
  id: UniqueIdentifier;
}

const animateLayoutChanges: AnimateLayoutChanges = ({
  isSorting,
  wasDragging,
}) => (isSorting || wasDragging ? false : true);

export const SortableTreeItem = ({
  id,
  depth,
  ...props
}: SortableTreeItemProps) => {
  const {
    attributes,
    listeners,
    isSorting,
    transform,
    transition,
    setDraggableNodeRef,
    setDroppableNodeRef,
  } = useSortable({ id, animateLayoutChanges });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <MenuItem
      id={id}
      ref={setDraggableNodeRef}
      wrapperRef={setDroppableNodeRef}
      style={style}
      depth={depth}
      disableInteraction={isSorting}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      {...props}
    />
  );
};

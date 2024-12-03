import { TreeItemData } from "@/app/components/SortableTree/sortableTreeTypes";
import { UniqueIdentifier } from "@dnd-kit/core";

export interface TreeItem {
  id: UniqueIdentifier;
  data: TreeItemData;
  children: TreeItem[];
}

export type TreeItems = TreeItem[];

export interface FlattenedItem extends TreeItem {
  parentId: UniqueIdentifier | null;
  depth: number;
  index: number;
}

export const initialItems: TreeItems = [];

import type { UniqueIdentifier } from '@dnd-kit/core';
import type { MutableRefObject } from 'react';

export interface TreeItemData {
  name: string;
  link?: string;
}

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

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[];
  offset: number;
}>;

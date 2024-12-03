import type { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import type {
  FlattenedItem,
  TreeItem,
  TreeItemData,
  TreeItems,
} from './sortableTreeTypes';

function getDragDepth(offset: number, indentationWidth: number) {
  return Math.round(offset / indentationWidth);
}

export const getProjection = (
  items: FlattenedItem[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
  dragOffset: number,
  indentationWidth: number
) => {
  const overItemIndex = items.findIndex(({ id }) => id === overId);
  const activeItemIndex = items.findIndex(({ id }) => id === activeId);
  const activeItem = items[activeItemIndex];
  const newItems = arrayMove(items, activeItemIndex, overItemIndex);
  const previousItem = newItems[overItemIndex - 1];
  const nextItem = newItems[overItemIndex + 1];
  const dragDepth = getDragDepth(dragOffset, indentationWidth);
  const projectedDepth = activeItem.depth + dragDepth;
  const maxDepth = getMaxDepth({
    previousItem,
  });
  const minDepth = getMinDepth({ nextItem });
  let depth = projectedDepth;

  if (projectedDepth >= maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }

  const getParentId = () => {
    if (depth === 0 || !previousItem) {
      return null;
    }

    if (depth === previousItem.depth) {
      return previousItem.parentId;
    }

    if (depth > previousItem.depth) {
      return previousItem.id;
    }

    const newParent = newItems
      .slice(0, overItemIndex)
      .reverse()
      .find((item) => item.depth === depth)?.parentId;

    return newParent ?? null;
  };

  return { depth, maxDepth, minDepth, parentId: getParentId() };
};

const getMaxDepth = ({ previousItem }: { previousItem: FlattenedItem }) => {
  if (previousItem) {
    return previousItem.depth + 1;
  }

  return 0;
};

const getMinDepth = ({ nextItem }: { nextItem: FlattenedItem }) => {
  if (nextItem) {
    return nextItem.depth;
  }

  return 0;
};

const flatten = (
  items: TreeItems,
  parentId: UniqueIdentifier | null = null,
  depth = 0
): FlattenedItem[] => {
  return items.reduce<FlattenedItem[]>((acc, item, index) => {
    return [
      ...acc,
      { ...item, parentId, depth, index },
      ...flatten(item.children, item.id, depth + 1),
    ];
  }, []);
};

export const flattenTree = (items: TreeItems): FlattenedItem[] => {
  return flatten(items);
};

export const buildTree = (flattenedItems: FlattenedItem[]): TreeItems => {
  const root: TreeItem = {
    id: 'root',
    data: { name: 'root', link: '' },
    children: [],
  };
  const nodes: Record<string, TreeItem> = { [root.id]: root };
  const items = flattenedItems.map((item) => ({ ...item, children: [] }));

  for (const item of items) {
    const { id, children } = item;
    const parentId = item.parentId ?? root.id;
    const parent = nodes[parentId] ?? findItem(items, parentId);

    nodes[id] = { id, children, data: item.data };
    parent.children.push(item);
  }

  return root.children;
};

export const findItem = (items: TreeItem[], itemId: UniqueIdentifier) => {
  return items.find(({ id }) => id === itemId);
};

export const findItemDeep = (
  items: TreeItems,
  itemId: UniqueIdentifier
): TreeItem | undefined => {
  for (const item of items) {
    const { id, children } = item;

    if (id === itemId) {
      return item;
    }

    if (children.length) {
      const child = findItemDeep(children, itemId);

      if (child) {
        return child;
      }
    }
  }

  return undefined;
};

export const removeItem = (items: TreeItems, id: UniqueIdentifier) => {
  const newItems = [];

  for (const item of items) {
    if (item.id === id) {
      continue;
    }

    if (item.children.length) {
      item.children = removeItem(item.children, id);
    }

    newItems.push(item);
  }

  return newItems;
};

const countChildren = (items: TreeItem[], count = 0): number => {
  return items.reduce((acc, { children }) => {
    if (children.length) {
      return countChildren(children, acc + 1);
    }

    return acc + 1;
  }, count);
};

export const getChildCount = (items: TreeItems, id: UniqueIdentifier) => {
  const item = findItemDeep(items, id);

  return item ? countChildren(item.children) : 0;
};

export function setProperty<T extends keyof TreeItem>(
  items: TreeItems,
  id: UniqueIdentifier,
  property: T,
  setter: (value: TreeItem[T]) => TreeItem[T]
) {
  for (const item of items) {
    if (item.id === id) {
      item[property] = setter(item[property]);
      continue;
    }

    if (item.children.length) {
      item.children = setProperty(item.children, id, property, setter);
    }
  }

  return [...items];
}

export const removeChildrenOf = (
  items: FlattenedItem[],
  ids: UniqueIdentifier[]
) => {
  const excludeParentIds = [...ids];

  return items.filter((item) => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if (item.children.length) {
        excludeParentIds.push(item.id);
      }
      return false;
    }

    return true;
  });
};

export const updateItem = (
  items: TreeItems,
  id: UniqueIdentifier,
  data: TreeItemData
) => {
  const newItems = items.map((item) => {
    if (item.id === id) {
      return { ...item, data };
    }

    if (item.children.length) {
      item.children = updateItem(item.children, id, data);
    }

    return item;
  });

  return newItems;
};

export const addSubItem = (
  items: TreeItems,
  id: UniqueIdentifier,
  data: TreeItemData
): TreeItems => {
  const newItem: TreeItem = {
    id: Math.floor(Math.random() * 1000),
    data: data,
    children: [],
  };

  return items.map((item) => {
    if (item.id === id) {
      return { ...item, children: [...item.children, newItem] };
    }

    if (item.children.length) {
      return { ...item, children: addSubItem(item.children, id, data) };
    }

    return item;
  });
};

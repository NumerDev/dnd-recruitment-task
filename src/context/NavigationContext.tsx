"use client";
import { AddMenuFormSchema } from "@/app/components/Form/schema";
import { initialItems, TreeItem } from "@/app/components/SortableTree/items";
import { TreeItems } from "@/app/components/SortableTree/sortableTreeTypes";
import React, { createContext, useContext, useState } from "react";

interface NavigationContextProps {
  itemList: TreeItems;
  addMenuItem: (item: AddMenuFormSchema) => void;
  setItemList: React.Dispatch<React.SetStateAction<TreeItems>>;
}

interface NavigationContextProviderProps {
  children: React.ReactNode;
}

const NavigationContext = createContext<NavigationContextProps>(
  {} as NavigationContextProps
);

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      "useNavigationContext must be used within a NavigationContextProvider"
    );
  }
  return context;
};

const NavigationContextProvider = ({
  children,
}: NavigationContextProviderProps) => {
  const [itemList, setItemList] = useState(initialItems);

  const addMenuItem = (item: AddMenuFormSchema) => {
    setItemList((items) => {
      const newItem: TreeItem = {
        id: Math.floor(Math.random() * 1000),
        data: item,
        children: [],
      };

      const newItems = [...items, { ...newItem }];
      return newItems;
    });
  };

  return (
    <NavigationContext.Provider value={{ itemList, setItemList, addMenuItem }}>
      {children}
    </NavigationContext.Provider>
  );
};

export { NavigationContextProvider };

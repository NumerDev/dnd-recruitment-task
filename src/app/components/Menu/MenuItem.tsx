"use client";
import Button from "@/app/components/common/Button";
import Card from "@/app/components/common/Card";
import MenuForm from "@/app/components/Form/MenuForm";
import GroupButton from "@/app/components/Menu/GroupButton";
import { TreeItemData } from "@/app/components/SortableTree/sortableTreeTypes";
import { UniqueIdentifier } from "@dnd-kit/core";
import { forwardRef, HTMLAttributes, useState } from "react";
import { RiDragMove2Fill } from "react-icons/ri";
export interface TreeMenuItemProps
  extends Omit<HTMLAttributes<HTMLLIElement>, "id"> {
  id: UniqueIdentifier;
  clone?: boolean;
  depth: number;
  disableInteraction?: boolean;
  disableSelection?: boolean;
  ghost?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleProps?: any;
  indicator?: boolean;
  indentationWidth: number;
  data: TreeItemData;
  onRemove?(): void;
  onEdit?(id: UniqueIdentifier, data: TreeItemData): void;
  onAdd?(id: UniqueIdentifier, data: TreeItemData): void;
  wrapperRef?(node: HTMLLIElement): void;
}
// eslint-disable-next-line react/display-name
const TreeMenuItem = forwardRef<HTMLDivElement, TreeMenuItemProps>(
  (
    {
      id,
      clone,
      depth,
      handleProps,
      indentationWidth,
      onRemove,
      onEdit,
      onAdd,
      style,
      data,
      wrapperRef,
      ...props
    },
    ref
  ) => {
    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
    const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);

    const handleOnEditMenu = () => {
      setIsEditMenuOpen(true);
      setIsAddMenuOpen(false);
    };

    const handleOnCloseEditMenu = () => {
      setIsEditMenuOpen(false);
    };

    const handleOnAddMenu = () => {
      setIsAddMenuOpen(true);
      setIsEditMenuOpen(false);
    };

    const handleOnCloseAddMenu = () => {
      setIsAddMenuOpen(false);
    };

    const handleOnEditMenuSubmit = (
      id: UniqueIdentifier,
      data: TreeItemData
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onEdit && onEdit(id, data);
      handleOnCloseEditMenu();
    };

    const handleOnAddMenuSubmit = (
      id: UniqueIdentifier,
      data: TreeItemData
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onAdd && onAdd(id, data);
      handleOnCloseAddMenu();
    };

    const depthLevel = indentationWidth * depth;
    const cloneBorderStyles = clone
      ? "border shadow-primary w-max"
      : "border-b border-l w-full";

    return (
      <li
        className={`list-none`}
        ref={wrapperRef}
        style={{
          paddingLeft: `${depthLevel}px`,
        }}
        {...props}
      >
        <div
          style={{ ...style }}
          className={
            "flex w-full items-center justify-between border-secondary-4 bg-white px-6 py-4 " +
            cloneBorderStyles
          }
        >
          <div className="flex items-center gap-1" ref={ref}>
            <Button
              variant="icon"
              icon={<RiDragMove2Fill />}
              className="cursor-grab"
              {...handleProps}
            />
            <div className="flex flex-col gap-1.5">
              <div className={"text-sm font-semibold text-secondary-11"}>
                {data.name}
              </div>
              <div className="text-sm text-secondary-8">{data.link}</div>
            </div>
          </div>
          {!clone && (
            <GroupButton
              onRemove={onRemove}
              onAddMenu={handleOnAddMenu}
              onEdit={handleOnEditMenu}
            />
          )}
        </div>
        {isAddMenuOpen && (
          <div className="flex w-full items-center justify-between border border-secondary-5 px-6 py-4">
            <Card className={"flex w-full flex-row-reverse gap-4"}>
              <MenuForm
                onCancel={handleOnCloseAddMenu}
                onAdd={handleOnAddMenuSubmit}
                addSubItemMode
                selectedItemId={id}
              />
            </Card>
          </div>
        )}
        {isEditMenuOpen && (
          <div className="flex w-full items-center justify-between border border-secondary-5 px-6 py-4">
            <Card className={"flex w-full flex-row-reverse gap-4"}>
              <MenuForm
                onCancel={handleOnCloseEditMenu}
                onEdit={handleOnEditMenuSubmit}
                editMode
                selectedItemId={id}
              />
            </Card>
          </div>
        )}
      </li>
    );
  }
);

export default TreeMenuItem;

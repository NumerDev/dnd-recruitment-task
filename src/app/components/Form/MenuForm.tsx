"use client";
import Button from "@/app/components/common/Button";
import FormInput from "@/app/components/Form/FormInput";
import type { AddMenuFormSchema } from "@/app/components/Form/schema";
import { addMenuFormSchema } from "@/app/components/Form/schema";

import { UniqueIdentifier } from "@dnd-kit/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { IoTrashOutline } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";

interface AddMenuFormProps {
  onSubmit?: (data: AddMenuFormSchema) => void;
  onCancel?: () => void;
  onRemove?: () => void;
  onEdit?: (id: UniqueIdentifier, data: AddMenuFormSchema) => void;
  onAdd?: (id: UniqueIdentifier, data: AddMenuFormSchema) => void;
  actionButtons?: boolean;
  editMode?: boolean;
  addSubItemMode?: boolean;
  selectedItemId?: UniqueIdentifier;
  initialValues?: AddMenuFormSchema;
}

// eslint-disable-next-line react/display-name
const MenuForm = forwardRef<HTMLFormElement, AddMenuFormProps>(
  (
    {
      onEdit,
      onAdd,

      onRemove,
      selectedItemId,
      actionButtons = true,
      editMode = false,
      addSubItemMode = false,
    },
    ref
  ) => {
    const {
      register,
      handleSubmit,
      reset,
      clearErrors,
      formState: { errors },
    } = useForm<AddMenuFormSchema>({
      mode: "onChange",
      resolver: zodResolver(addMenuFormSchema),
      defaultValues: { name: "", link: "" },
    });

    const handleOnSubmit = (data: AddMenuFormSchema) => {
      if (selectedItemId && addSubItemMode && onAdd) {
        return onAdd(selectedItemId, data);
      }
      if (selectedItemId && editMode && onEdit) {
        return onEdit(selectedItemId, data);
      }

      reset();
    };

    const handleOnCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      clearErrors();
      reset();
    };

    return (
      <>
        {onRemove && (
          <Button
            variant={"icon"}
            icon={<IoTrashOutline />}
            onClick={onRemove}
          />
        )}
        <form
          ref={ref}
          onSubmit={handleSubmit(handleOnSubmit)}
          className="flex w-full flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <FormInput
              label={"Nazwa"}
              name={"name"}
              placeholder={"Wprowadź nazwę"}
              error={errors.name?.message}
              register={register}
            />
            <FormInput
              label={"Link"}
              name={"link"}
              placeholder={"Wprowadź link"}
              error={errors.link?.message}
              icon={<TbSearch />}
              register={register}
            />
          </div>
          {actionButtons && (
            <div className="flex gap-2">
              <Button name="Anuluj" onClick={handleOnCancel} />
              <Button
                type="submit"
                name={editMode ? "Zapisz" : "Dodaj"}
                variant={"secondary"}
              />
            </div>
          )}
        </form>
      </>
    );
  }
);

export default MenuForm;
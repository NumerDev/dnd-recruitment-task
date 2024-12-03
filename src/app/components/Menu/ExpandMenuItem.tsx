"use client";
import Button from "@/app/components/common/Button";
import Card from "@/app/components/common/Card";
import MenuForm from "@/app/components/Form/MenuForm";
import { useState } from "react";

const ExpandMenuItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenForm = () => {
    setIsOpen(true);
  };

  const handleCloseForm = () => {
    setIsOpen(false);
  };

  const handleAddMenuItem = () =>
    // data: AddMenuFormSchema
    {
      handleCloseForm();
    };

  return (
    <>
      {isOpen ? (
        <div className="bt-secondary-2 flex w-full items-center justify-between border bg-secondary-2 px-6 py-4">
          <Card className={"flex w-full flex-row-reverse gap-4"}>
            <MenuForm onCancel={handleCloseForm} onSubmit={handleAddMenuItem} />
          </Card>
        </div>
      ) : (
        <div className="flex w-full items-center justify-between bg-white px-6 py-4">
          <Button name={"Dodaj pozycje menu"} onClick={handleOpenForm} />
        </div>
      )}
    </>
  );
};

export default ExpandMenuItem;

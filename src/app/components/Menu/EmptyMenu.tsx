"use client";
import Button from "@/app/components/common/Button";
import MenuForm from "@/app/components/Form/MenuForm";
import { useState } from "react";
import { TbCirclePlus } from "react-icons/tb";

const EmptyMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenForm = () => [setIsMenuOpen(true)];

  const handleCloseForm = () => {
    setIsMenuOpen(false);
  };
  const handleAddMenuItem = () =>
    // data: AddMenuFormSchema
    {
      handleCloseForm();
    };

  return (
    <>
      {isMenuOpen ? (
        <div className="flex w-full items-center justify-between border border-secondary-5 bg-secondary-2 px-6 py-4">
          <MenuForm onCancel={handleCloseForm} onSubmit={handleAddMenuItem} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 rounded-lg border border-secondary-4 bg-secondary-2 px-4 py-6">
          <div className="flex flex-col items-center justify-center gap-1">
            <h3 className="text-base font-semibold text-secondary-11">
              Menu jest puste
            </h3>
            <h4 className="text-sm text-secondary-8">
              W tym miejscu nie ma jeszcze żadnych linków.
            </h4>
          </div>
          <Button
            name="Dodaj pozycję menu"
            icon={<TbCirclePlus />}
            variant={"primary"}
            onClick={handleOpenForm}
          />
        </div>
      )}
    </>
  );
};

export default EmptyMenu;

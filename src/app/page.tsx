"use client";
import Button from "@/app/components/common/Button";
import Card from "@/app/components/common/Card";
import MenuForm from "@/app/components/Form/MenuForm";
import { AddMenuFormSchema } from "@/app/components/Form/schema";
import { useNavigationContext } from "@/context/NavigationContext";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const PepegaTree = dynamic(
  () =>
    import("@/app/components/SortableTree/SortableMenuTree").then(
      (mod) => mod.SortableMenuTree
    ),
  {
    ssr: false,
  }
);

const Home = () => {
  const navigationFormRef = useRef<HTMLFormElement | null>(null);
  const { itemList } = useNavigationContext();
  const [navigationData, setNavigationData] = useState<AddMenuFormSchema>();

  const handleNavigationData = async (data: AddMenuFormSchema) =>
    await setNavigationData(data);

  const handleSave = () => {
    if (navigationFormRef.current) {
      navigationFormRef.current.requestSubmit();
    }

    const savedData = { ...navigationData, items: itemList };

    window.localStorage.setItem("navigationData", JSON.stringify(savedData));
  };

  return (
    <div className="mx-auto flex max-w-[1168px] flex-col gap-6 p-4">
      <Card header="Nazwa">
        <MenuForm
          actionButtons={false}
          ref={navigationFormRef}
          onSubmit={handleNavigationData}
        />
      </Card>

      <Card header="Pozycje menu">
        <PepegaTree />
      </Card>
      <div className="flex w-full justify-end gap-2">
        <Button name="Anuluj" />
        <Button
          type="submit"
          name={"Zapisz"}
          variant={"primary"}
          disabled={!!!itemList.length}
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default Home;

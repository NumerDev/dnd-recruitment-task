import Button from "@/app/components/common/Button";

interface GroupButtonPropsa {
  onRemove?: () => void;
  onEdit?: () => void;
  onAddMenu?: () => void;
}

const GroupButton = ({ onRemove, onEdit, onAddMenu }: GroupButtonPropsa) => {
  return (
    <div className="flex overflow-hidden rounded-lg border border-secondary-5">
      <Button
        name={"Usuń"}
        className={"rounded-none border-transparent"}
        onClick={onRemove}
      />
      <Button
        name={"Edytuj"}
        className={"rounded-none border-x border-y-transparent"}
        onClick={onEdit}
      />
      <Button
        name={"Dodaj pozycje menu"}
        className={"rounded-none border-transparent"}
        onClick={onAddMenu}
      />
    </div>
  );
};

export default GroupButton;

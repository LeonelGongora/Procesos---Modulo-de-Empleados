import { useState, ReactElement } from "react";
import { Equipment } from "../../interfaces/equipment";
import { ListEquipmentPage } from "../listEquipment-page/ListEquipmentPage";
import { EquipmentForm } from "../../components/equipment-form/EquipmentForm";

export default function InventoryPage(): ReactElement {
  const [content, setContent] = useState<ReactElement>(
    <ListEquipmentPage showForm={showForm} />
  );

  function showList(): void {
    setContent(<ListEquipmentPage showForm={showForm} />);
  }

  function showForm(product?: Equipment): void {
    setContent(<EquipmentForm product={product} showList={showList} />);
  }

  return <div className="container my-5">{content}</div>;
}

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./style.css";
import {
  createCategory,
  updateCategory,
} from "../../../../mantenimiento/services/maintenance/categoryService";

interface CategoryFormProps {
  onRegister: (id: number, catnombre: string, catdescripcion: string) => void;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  dataToEdit: { id: number; catnombre: string; catdescripcion: string };
  setDataToEdit: (dataToEdit: {
    id: number;
    catnombre: string;
    catdescripcion: string;
  }) => void;
  handleEditCategory: (
    id: number,
    catnombre: string,
    catdescription: string
  ) => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  onRegister,
  isEditing,
  setIsEditing,
  dataToEdit,
  setDataToEdit,
  handleEditCategory,
}) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() && description.trim()) {
      onRegister(id, name, description);
      setName("");
      setDescription("");
      registerData();
    } else {
      alert("Todos los campos deben ser llenados");
    }
  };

  useEffect(() => {
    setName(dataToEdit.catnombre);
    setDescription(dataToEdit.catdescripcion);
    setId(dataToEdit.id);
  }, [isEditing, dataToEdit]);

  const registerData = async () => {
    try {
      createCategory({
        catnombre: name,
        catdescripcion: description,
        disabled: false,
      });
    } catch (error) {
      console.error("Error creating new category:", error);
    }
  };

  const updateData = async () => {
    try {
      const categoryUpdated = { catnombre: name, catdescripcion: description };
      //console.log("🚀 ~ updateData ~ categoryUpdated:", id, categoryUpdated);
      const response = await updateCategory(id, categoryUpdated);
      //console.log("🚀 ~ updateData ~ response:", response);
      handleEditCategory(id, name, description);
      setIsEditing(false);
      setDataToEdit({ id: 0, catnombre: "", catdescripcion: "" });
    } catch (error) {}
  };

  return (
    <form id="form-field">
      <div className="input">
        <p>Nombre de la categoría</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input">
        <p>Descripcion</p>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {isEditing ? (
        <button type="button" onClick={updateData}>
          Actualizar
        </button>
      ) : (
        <button type="button" onClick={handleSubmit}>
          Registrar
        </button>
      )}
    </form>
  );
};

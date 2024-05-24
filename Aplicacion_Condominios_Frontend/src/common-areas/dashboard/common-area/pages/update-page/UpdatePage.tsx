import { useParams, useNavigate } from "react-router-dom";
import CommonAreaForm from "../../components/common-area-form/CommonAreaForm";

import "./update-page.css";
import { FormEvent } from "react";
import Swal from "sweetalert2";

export default function UpdatePage() {
  const { id } = useParams<{ id: string }>();
  const navigation = useNavigate();

  const handleDelete = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Swal.fire({
      title: "¿Estás seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const url = `http://localhost:8000/api/common-areas/${id}`;
        await fetch(url, {
          method: "DELETE",
        });
        Swal.fire("Eliminado", "El área común ha sido eliminada", "success");
        navigation("/areas-comunes");
      }
    });
  };

  return (
    <section className="update-container">
      <div className="delete-form-container">
        <form onSubmit={handleDelete}>
          <button className="delete-button">Eliminar</button>
        </form>
      </div>

      {id && <CommonAreaForm id={parseInt(id)} isEditing />}
    </section>
  );
}

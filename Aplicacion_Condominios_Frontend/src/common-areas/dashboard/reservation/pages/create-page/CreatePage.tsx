import { Link, useParams } from "react-router-dom";

import ReservationForm from "../../components/reservation-form/ReservationForm";

import "./create-page.css";
import { useEffect, useState } from "react";
import { getNameCommonAreaById } from "../../../common-area/services/common-area.service";

export default function ReservationPage() {
  const { id } = useParams<{ id: string }>();
  const [commonAreaName, setCommonAreaName] = useState<string>("");

  useEffect(() => {
    getNameCommonAreaById(Number(id)).then((name) => {
      setCommonAreaName(name);
    });
  }, [id]);

  return (
    <section className="reservation-container">
      <header className="reservation-header">
        <h1>Reserva - Area Común {commonAreaName}</h1>

        <Link to={`/areas-comunes/calendario/${id}`}>Volver al calendario</Link>
      </header>

      <article>
        <ReservationForm idCommonArea={Number(id)} />
      </article>
    </section>
  );
}

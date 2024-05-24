import { useEffect, useState } from "react";

import { CommonArea } from "../../interfaces/common-areas";
import Loader from "../../../../components/Loader/Loader";
import CardCommonArea from "../../components/card-common-area/CardCommonArea";

import "./list-page.css";

export default function ListPage() {
  const [commonAreas, setCommonAreas] = useState<CommonArea[] | null>([]);

  useEffect(() => {
    const fetchCommonAreas = async () => {
      const response = await fetch("http://localhost:8000/api/common-areas/");
      const {
        data: { commonAreas },
      } = await response.json();

      setCommonAreas(commonAreas);
    };

    setCommonAreas(null);
    fetchCommonAreas();
  }, []);

  return (
    <section className="list-page-container">
      <h2
        style={{
          margin: "0",
        }}
      >
        Areas Comunes
      </h2>

      <div className="list-page-content">
        {commonAreas === null ? (
          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Loader />
          </div>
        ) : commonAreas.length === 0 ? (
          <p
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
            }}
          >
            No hay areas comunes registradas
          </p>
        ) : (
          commonAreas.map((commonArea) => {
            return (
              <CardCommonArea key={commonArea.id} commonArea={commonArea} />
            );
          })
        )}
      </div>
    </section>
  );
}

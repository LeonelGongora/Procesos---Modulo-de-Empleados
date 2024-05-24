import CommonAreaForm from "../../components/common-area-form/CommonAreaForm";

import "./create-page.css";

export default function CreatePage() {
  return (
    <section
      className="create-page-container"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <div className="create-page-content">
        <h2
          style={{
            margin: 0,
            textAlign: "center",
          }}
        >
          Registrar Área Común
        </h2>

        <CommonAreaForm />
      </div>
    </section>
  );
}

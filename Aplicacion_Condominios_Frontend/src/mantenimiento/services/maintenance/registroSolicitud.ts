import api from "../api";

interface RegistroSolicitud {
  idRegistroSolicitud: number;
  idCategoria: number;
  idEstado: number;
  descripcion: string;
  nombrePropietario: string;
  ubicacion: string;
  numerReferencia: string;
  encargado: string;
  fechaSolicitud: Date;
  fechaFinalizado: Date;
  categoria: null;
  estado: {
    idEstado: number;
    nombreEstado: string;
  };
}

//* to create a solicitud

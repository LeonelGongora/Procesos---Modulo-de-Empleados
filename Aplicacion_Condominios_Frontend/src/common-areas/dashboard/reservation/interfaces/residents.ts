export interface Resident {
  id: number;
  nombre_residente: string;
  apellidos_residente: string;
  cedula_residente: string;
  telefono_residente: string;
  fecha_nacimiento_residente: Date;
  tipo_residente: string;
  nacionalidad_residente: string;
  email_residente: string;
  genero_residente: string;
  estado_residente: number;
  imagen_residente: string;
  contrato_id: number;
  created_at: Date;
  updated_at: Date;
}

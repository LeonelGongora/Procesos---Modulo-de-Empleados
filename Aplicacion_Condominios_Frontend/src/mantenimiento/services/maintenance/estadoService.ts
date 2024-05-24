import { AxiosResponse } from "axios";
import api from "../api";

interface Estado {
  idEstado: number;
  nombreEstado: string;
  created_at: string;
  updated_at: string;
}

export const getAllEstados = async (): Promise<Estado[]> => {
  try {
    const response: AxiosResponse = await api.get("/estado-solicitud");
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getEstadoById = async (
  estadoId: number
): Promise<Estado | null> => {
  try {
    const response: AxiosResponse = await api.get(
      `/estado-solicitud/${estadoId}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

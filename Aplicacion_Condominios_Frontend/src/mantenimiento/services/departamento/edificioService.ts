import { AxiosResponse } from "axios";
import api from "../api";

interface Edificio {
  id: number;
  nombre_edificio: string;
  descripcion_edificio: string;
  imagen_edificio: string;
  cantidad_pisos: string;
  bloque_id: number;
}

export const getAllEdificios = async (): Promise<Edificio[]> => {
  try {
    const response: AxiosResponse = await api.get("/edificios");
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getEdificiosByBloqueId = async (
  bloqueId: number
): Promise<Edificio[] | []> => {
  try {
    const response: AxiosResponse = await api.get(
      `/edificios-by-bloques/${bloqueId}`
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

import { CommonArea } from "../interfaces/common-areas";

const API_URL = "http://localhost:8000/api/";

export async function getCommonAreaById(
  commonAreaId: number
): Promise<CommonArea> {
  const response = await fetch(`${API_URL}common-areas/${commonAreaId}`);

  if (!response.ok) {
    throw new Error("No se pudo obtener el área común");
  }

  const {
    data: { commonArea },
  } = await response.json();

  return commonArea;
}

export async function getNameCommonAreaById(
  commonAreaId: number
): Promise<string> {
  const commonArea = await getCommonAreaById(commonAreaId);

  return commonArea.name;
}

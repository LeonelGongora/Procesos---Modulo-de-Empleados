import { AxiosResponse } from "axios";
import api from "../api";

interface Category {
  id: number;
  catnombre: string;
  catdescripcion: string;
  disabled: boolean;
}

//* to create a new category

export const createCategory = async (
  newCategory: Partial<Category>
): Promise<Category | null> => {
  try {
    const response: AxiosResponse<Category> = await api.post(
      "/CategoriaServicio/insert",
      newCategory
    );
    return response.data;
  } catch (error) {
    console.error("Error creating category: ", error);
    return null;
  }
};

//* to get all categories

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response: AxiosResponse<Category[]> = await api.get(
      "/CategoriaServicio"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

//* to get a category by category id

export const getCategoryById = async (
  categoryId: number
): Promise<Category | null> => {
  try {
    const response: AxiosResponse<Category> = await api.get(
      `/CategoriaServicio/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category: ", error);
    return null;
  }
};

//* to update an existing category

export const updateCategory = async (
  categoryId: number,
  updateCategory: Partial<Category>
): Promise<Category | null> => {
  try {
    const response: AxiosResponse<Category> = await api.put(
      `/CategoriaServicio/update/${categoryId}`,
      updateCategory
    );
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    return null;
  }
};

//* to delete a category by category id

export const deleteCategory = async (categoryId: number): Promise<void> => {
  try {
    await api.delete(`/CategoriaServicio/delete/${categoryId}`);
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};

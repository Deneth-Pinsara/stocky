import type { ApiResponse, Product } from "../types/product";

const API_URL = import.meta.env.VITE_API_URL;
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || `HTTP error ${response.status}`);
  }

  return result as T;
}

export async function getProducts(): Promise<Product[]> {
  const response = await apiRequest<ApiResponse<Product[]>>("/products");

  return response.data;
}
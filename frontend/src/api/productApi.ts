import type { ApiResponse, Product, ProductInput, ProductUpdate } from "../types/product";

const API_URL = import.meta.env.VITE_API_URL;

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
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

export const getProducts = () =>
  apiRequest<ApiResponse<Product[]>>("/products").then((r) => r.data);

export const getProduct = (id: number) =>
  apiRequest<ApiResponse<Product>>(`/products/${id}`).then((r) => r.data);

export const createProduct = (data: ProductInput) =>
  apiRequest<ApiResponse<Product>>("/products/create", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((r) => r.data);

export const updateProduct = (id: number, data: ProductUpdate) =>
  apiRequest<ApiResponse<Product>>(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }).then((r) => r.data);

export const deleteProduct = (id: number) =>
  apiRequest<ApiResponse<null>>(`/products/${id}`, { method: "DELETE" });

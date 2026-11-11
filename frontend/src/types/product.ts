export interface Product {
    id: number;
    name: string;
    sku: string;
    description: string | null;
    price: string;
    quantity: number;
    created_at: string;
    updated_at: string;
}

export interface ProductInput {
    name: string;
    sku: string;
    description: string | null;
    price: number;
    quantity: number;
}

export type ProductUpdate = Partial<ProductInput>;

export interface ApiResponse<T> {
  message: string;
  data: T;
  success?: boolean;
}
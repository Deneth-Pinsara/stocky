import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../api/productApi";
import type { Product, ProductInput } from "../types/product";

const emptyForm: ProductInput = {
  name: "",
  sku: "",
  description: null,
  price: 0,
  quantity: 0,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductInput>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = () =>
    getProducts()
      .then(setProducts)
      .catch((e) => setError(e.message));

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingId !== null) {
        await updateProduct(editingId, form);
        setEditingId(null);
      } else {
        await createProduct(form);
      }
      setForm(emptyForm);
      load();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      sku: product.sku,
      description: product.description,
      price: parseFloat(product.price),
      quantity: product.quantity,
    });
  };

  const handleDelete = async (id: number) => {
    setError(null);
    try {
      await deleteProduct(id);
      load();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const set =
    (field: keyof ProductInput) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Products</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "1rem",
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={set("name")}
          required
        />
        <input
          placeholder="SKU"
          value={form.sku}
          onChange={set("sku")}
          required
        />
        <input
          placeholder="Description"
          value={form.description ?? ""}
          onChange={set("description")}
        />
        <input
          placeholder="Price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={set("price")}
          required
        />
        <input
          placeholder="Quantity"
          type="number"
          value={form.quantity}
          onChange={set("quantity")}
          required
        />
        <button type="submit">
          {editingId !== null ? "Update" : "Create"}
        </button>
        {editingId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm(emptyForm);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table border={1} cellPadding={6} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>{" "}
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

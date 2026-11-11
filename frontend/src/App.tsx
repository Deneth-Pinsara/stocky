import { useEffect, useState } from "react";
import "./App.css";
import type { Product } from "./types/product";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    sku: "",
    description: null,
    price: "15000",
    quantity: 0,
    created_at: "",
    updated_at: "",
  });
  const [updateProduct, setUpdateProduct] = useState<Product>({
    id: 0,
    name: "",
    sku: "",
    description: null,
    price: "15000",
    quantity: 0,
    created_at: "",
    updated_at: "",
  });

  async function GetProducts() {
    const ApiResponse = await axios.get(`${BASE_URL}/products`);
    setProducts(ApiResponse?.data?.data);
    // console.log(ApiResponse.data.data);
  }

  async function CreateProduct() {
    const response = await axios.post(
      `${BASE_URL}/products/create`,
      newProduct,
    );
    console.log(response);
    setRefresh((prev) => !prev);
  }

  async function UpdateProduct(id) {
    const response = await axios.put(
      `${BASE_URL}/products/${id}`,
      updateProduct,
    );
    setRefresh((prev) => !prev);
    console.log(response);
  }

  async function DeleteProduct(id) {
    const response = await axios.delete(`${BASE_URL}/products/${id}`);
    console.log(response);
    setRefresh((prev) => !prev);
  }

  useEffect(() => {
    GetProducts();
  }, [refresh]);

  return (
    <>
      {/* create form */}
      <div>
        <input
          placeholder="name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        ></input>
        <input
          placeholder="sku"
          value={newProduct.sku}
          onChange={(e) =>
            setNewProduct({ ...newProduct, sku: e.target.value })
          }
        ></input>
        <input
          placeholder="description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        ></input>
        <button
          onClick={() => {
            CreateProduct();
          }}
        >
          Create
        </button>
      </div>

      {/* product table */}
      <div>
        <h1>Products List</h1>
        <button
          onClick={() => {
            setRefresh((prev) => !prev);
          }}
        >
          Refresh
        </button>
        <table>
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Sku</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button
                    onClick={() => {
                      DeleteProduct(product.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setUpdateProduct(product);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* update form */}
      {updateProduct.id && (
        <div>
          <input
            placeholder="name"
            value={updateProduct.name}
            onChange={(e) =>
              setUpdateProduct({ ...updateProduct, name: e.target.value })
            }
          ></input>
          <input
            placeholder="sku"
            value={updateProduct.sku}
            onChange={(e) =>
              setUpdateProduct({ ...updateProduct, sku: e.target.value })
            }
          ></input>
          <input
            placeholder="description"
            value={updateProduct.description}
            onChange={(e) =>
              setUpdateProduct({
                ...updateProduct,
                description: e.target.value,
              })
            }
          ></input>
          <button
            onClick={() => {
              UpdateProduct(updateProduct.id);
            }}
          >
            Update
          </button>
        </div>
      )}

      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
    </>
  );
}
export default App;

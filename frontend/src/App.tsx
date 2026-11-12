import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
  return (
    <BrowserRouter>
      {/* <nav style={{ padding: "0.5rem 1rem", borderBottom: "1px solid #ccc", display: "flex", gap: "1rem" }}>
        <Link to="/products">Products</Link>
      </nav> */}
      <Routes>
        {/* <Route path="/" element={<ProductsPage />} /> */}
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

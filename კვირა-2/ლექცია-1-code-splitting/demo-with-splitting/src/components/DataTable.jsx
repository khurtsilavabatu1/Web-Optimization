import { useState } from "react";
import { getProductsByCategory, searchProducts } from "../utils/heavyUtils";

const CATEGORIES = ["All", "Electronics", "Clothing", "Books", "Home", "Sports", "Toys", "Food", "Beauty", "Auto", "Garden"];

export default function DataTable() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  let products;
  if (search.length >= 2) {
    products = searchProducts(search);
  } else if (category === "All") {
    products = CATEGORIES.slice(1).flatMap((c) => getProductsByCategory(c));
  } else {
    products = getProductsByCategory(category);
  }

  const sorted = [...products].sort((a, b) => {
    const val = sortDir === "asc" ? 1 : -1;
    if (sortBy === "price" || sortBy === "rating") return (a[sortBy] - b[sortBy]) * val;
    return a[sortBy].localeCompare(b[sortBy]) * val;
  });

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14, width: 220 }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14 }}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <span style={{ color: "#6b7280", fontSize: 14 }}>{sorted.length} products</span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e7eb", background: "#f9fafb" }}>
              {[
                { key: "name", label: "Name" },
                { key: "category", label: "Category" },
                { key: "price", label: "Price" },
                { key: "rating", label: "Rating" },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  style={{ textAlign: "left", padding: "10px 8px", cursor: "pointer", userSelect: "none" }}
                >
                  {col.label} {sortBy === col.key ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
                </th>
              ))}
              <th style={{ textAlign: "left", padding: "10px 8px" }}>Stock</th>
            </tr>
          </thead>
          <tbody>
            {sorted.slice(0, 100).map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "8px" }}>{p.name}</td>
                <td style={{ padding: "8px" }}>
                  <span style={{
                    background: "#e0e7ff", color: "#3730a3", padding: "2px 8px",
                    borderRadius: 12, fontSize: 12,
                  }}>
                    {p.category}
                  </span>
                </td>
                <td style={{ padding: "8px" }}>${p.price.toFixed(2)}</td>
                <td style={{ padding: "8px" }}>{"★".repeat(Math.round(p.rating))} {p.rating}</td>
                <td style={{ padding: "8px" }}>
                  <span style={{ color: p.inStock ? "#059669" : "#dc2626", fontWeight: 500 }}>
                    {p.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

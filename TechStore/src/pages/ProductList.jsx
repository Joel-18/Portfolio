import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import { categories } from "../data/categories";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("categoria") || "Todas";
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("relevancia");

  const filtered = useMemo(() => {
    let result = [...products];

    if (categoryParam !== "Todas") {
      result = result.filter((p) => p.category === categoryParam);
    }

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(term));
    }

    if (sortBy === "precio-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "precio-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [categoryParam, search, sortBy]);

  return (
    <div className="container">
      <h1 className="page-title">Productos</h1>
      <p className="page-subtitle">{filtered.length} resultado(s)</p>

      <div className="ts-filters">
        <input
          className="ts-search"
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={categoryParam}
          onChange={(e) =>
            setSearchParams(e.target.value === "Todas" ? {} : { categoria: e.target.value })
          }
        >
          <option value="Todas">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="relevancia">Relevancia</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
          <option value="rating">Mejor valorados</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No se encontraron productos con esa búsqueda.</p>
      ) : (
        <div className="products-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;

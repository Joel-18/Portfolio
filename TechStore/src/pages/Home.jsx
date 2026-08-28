import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

function Home() {
  const featured = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <>
      <section className="ts-hero">
        <div className="container ts-hero__inner">
          <h1>Todo lo que necesitas en tecnología</h1>
          <p>Laptops, componentes y accesorios al mejor precio.</p>
          <Link to="/productos" className="btn btn-primary">Ver catálogo</Link>
        </div>
      </section>

      <section className="container">
        <h2 className="page-title">Categorías</h2>
        <div className="ts-categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/productos?categoria=${encodeURIComponent(cat)}`}
              className="ts-category-chip"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="container">
        <h2 className="page-title">Destacados</h2>
        <p className="page-subtitle">Los productos mejor valorados por nuestros clientes.</p>
        <div className="products-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;

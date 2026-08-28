import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import ProductCard from "../components/ProductCard";

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  if (!product) {
    return (
      <div className="container">
        <p className="empty-state">Producto no encontrado.</p>
        <Link to="/productos" className="btn btn-outline">Volver a productos</Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const submitReview = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    setReviews((prev) => [{ id: Date.now(), text: reviewText }, ...prev]);
    setReviewText("");
  };

  return (
    <div className="container">
      <div className="ts-detail">
        <div className="ts-detail__image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="ts-detail__info">
          <span className="ts-product-card__category">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="ts-product-card__rating">⭐ {product.rating} ({product.reviewsCount} reseñas)</div>
          <p className="ts-detail__price">${product.price.toFixed(2)}</p>
          <p className="ts-detail__description">{product.description}</p>

          <ul className="ts-detail__specs">
            {Object.entries(product.specs).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>

          {product.stock === 0 ? (
            <p className="ts-detail__stock ts-detail__stock--out">Producto sin stock disponible.</p>
          ) : (
            <p className="ts-detail__stock">{product.stock} unidades disponibles</p>
          )}

          <div className="ts-detail__actions">
            <input
              type="number"
              min="1"
              max={product.stock || 1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              disabled={product.stock === 0}
            />
            <button
              className="btn btn-primary"
              disabled={product.stock === 0}
              onClick={() => addItem(product, quantity)}
            >
              Agregar al carrito
            </button>
            <button
              className={`btn btn-outline ${isFavorite(product.id) ? "ts-fav-active" : ""}`}
              onClick={() => toggleFavorite(product.id)}
            >
              {isFavorite(product.id) ? "♥ En favoritos" : "♡ Agregar a favoritos"}
            </button>
          </div>
        </div>
      </div>

      <section className="ts-reviews">
        <h2 className="page-title">Reseñas</h2>
        <form onSubmit={submitReview} className="ts-reviews__form">
          <textarea
            placeholder="Escribe tu reseña..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Publicar reseña</button>
        </form>
        {reviews.length === 0 ? (
          <p className="empty-state">Aún no hay reseñas para este producto.</p>
        ) : (
          <ul className="ts-reviews__list">
            {reviews.map((r) => (
              <li key={r.id}>{r.text}</li>
            ))}
          </ul>
        )}
      </section>

      {related.length > 0 && (
        <section>
          <h2 className="page-title">Productos relacionados</h2>
          <div className="products-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;

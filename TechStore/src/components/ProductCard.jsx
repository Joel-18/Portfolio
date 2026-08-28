import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const outOfStock = product.stock === 0;
  const favorite = isFavorite(product.id);

  return (
    <div className="ts-product-card">
      <button
        className={`ts-product-card__fav ${favorite ? "ts-product-card__fav--active" : ""}`}
        onClick={() => toggleFavorite(product.id)}
        aria-label="Agregar a favoritos"
      >
        ♥
      </button>

      <Link to={`/productos/${product.id}`} className="ts-product-card__image-wrapper">
        <img src={product.image} alt={product.name} loading="lazy" />
        {outOfStock && <span className="ts-product-card__badge">Sin stock</span>}
      </Link>

      <div className="ts-product-card__body">
        <span className="ts-product-card__category">{product.category}</span>
        <Link to={`/productos/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <div className="ts-product-card__rating">
          ⭐ {product.rating} ({product.reviewsCount})
        </div>
        <div className="ts-product-card__footer">
          <span className="ts-product-card__price">${product.price.toFixed(2)}</span>
          <button
            className="ts-product-card__btn"
            disabled={outOfStock}
            onClick={() => addItem(product)}
          >
            {outOfStock ? "Agotado" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

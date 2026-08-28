import { products } from "../data/products";
import { useFavorites } from "../context/FavoritesContext";
import ProductCard from "../components/ProductCard";

function Favorites() {
  const { favoriteIds } = useFavorites();
  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id));

  return (
    <div className="container">
      <h1 className="page-title">Mis favoritos</h1>
      {favoriteProducts.length === 0 ? (
        <p className="empty-state">Aún no has agregado productos a favoritos.</p>
      ) : (
        <div className="products-grid">
          {favoriteProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}

export default Favorites;

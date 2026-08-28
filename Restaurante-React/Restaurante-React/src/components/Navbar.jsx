import { useCart } from "../context/CartContext";
import "./Navbar.css";

function Navbar({ onCartClick }) {
  const { totalItems } = useCart();

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <span className="navbar__brand">🍽️ Restaurante Ortiz</span>
        <button className="navbar__cart-btn" onClick={onCartClick}>
          🛒 Carrito
          {totalItems > 0 && <span className="navbar__badge">{totalItems}</span>}
        </button>
      </div>
    </header>
  );
}

export default Navbar;

import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { totalItems } = useCart();
  const { currentUser } = useAuth();

  return (
    <header className="ts-navbar">
      <div className="ts-navbar__inner">
        <Link to="/" className="ts-navbar__brand">TechStore</Link>

        <nav className="ts-navbar__links">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/productos">Productos</NavLink>
          <NavLink to="/favoritos">Favoritos</NavLink>
          <NavLink to="/sobre-nosotros">Sobre nosotros</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
        </nav>

        <div className="ts-navbar__actions">
          <Link to="/carrito" className="ts-navbar__cart">
            🛒
            {totalItems > 0 && <span className="ts-navbar__badge">{totalItems}</span>}
          </Link>
          {currentUser ? (
            <Link to="/perfil" className="ts-navbar__user">Hola, {currentUser.name.split(" ")[0]}</Link>
          ) : (
            <Link to="/login" className="ts-navbar__user">Iniciar sesión</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

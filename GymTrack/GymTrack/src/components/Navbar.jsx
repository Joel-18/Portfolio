import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationsContext";
import "./Navbar.css";

function Navbar() {
  const { currentUser } = useAuth();
  const { notifications } = useNotifications();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="gt-navbar">
      <div className="gt-navbar__inner">
        <Link to="/" className="gt-navbar__brand">💪 GymTrack</Link>
        <nav className="gt-navbar__links">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/ejercicios">Ejercicios</NavLink>
          <NavLink to="/rutinas">Rutinas</NavLink>
          <NavLink to="/historial">Historial</NavLink>
          <NavLink to="/progreso">Progreso</NavLink>
          <NavLink to="/objetivos">Objetivos</NavLink>
          <NavLink to="/calendario">Calendario</NavLink>
        </nav>
        <div className="gt-navbar__actions">
          <NavLink to="/notificaciones" className="gt-navbar__bell">
            🔔 {unread > 0 && <span className="gt-navbar__badge">{unread}</span>}
          </NavLink>
          {currentUser ? (
            <Link to="/perfil" className="gt-navbar__user">Hola, {currentUser.name.split(" ")[0]}</Link>
          ) : (
            <Link to="/login" className="gt-navbar__user">Iniciar sesión</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

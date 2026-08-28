import "./Footer.css";

function Footer() {
  return (
    <footer className="ts-footer">
      <div className="ts-footer__inner">
        <p>© {new Date().getFullYear()} TechStore — Tienda ficticia con fines demostrativos.</p>
        <div className="ts-footer__links">
          <a href="/sobre-nosotros">Sobre nosotros</a>
          <a href="/contacto">Contacto</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>© {year} Joel Enrique Ortiz Álvarez — Desarrollador Frontend Junior</p>
      </div>
    </footer>
  );
}

export default Footer;

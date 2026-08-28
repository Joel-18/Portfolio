import { useState } from "react";

function Contact() {
  const [sent, setSent] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="container">
      <h1 className="page-title">Contacto</h1>

      {sent ? (
        <p className="ts-form-success">¡Gracias! Tu mensaje fue enviado (simulado).</p>
      ) : (
        <form className="card-box" style={{ maxWidth: 480, marginBottom: 32 }} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <div className="form-field"><label>Nombre</label><input required /></div>
          <div className="form-field"><label>Correo</label><input type="email" required /></div>
          <div className="form-field"><label>Mensaje / Sugerencia</label><textarea required style={{ minHeight: 100 }} /></div>
          <button className="btn btn-primary">Enviar</button>
        </form>
      )}

      <div className="card-box" style={{ maxWidth: 480 }}>
        <h2 style={{ marginBottom: 10 }}>Newsletter</h2>
        {subscribed ? (
          <p className="ts-form-success">¡Suscrito correctamente!</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }} style={{ display: "flex", gap: 10 }}>
            <input
              type="email"
              placeholder="tu@correo.com"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              style={{ flex: 1, background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: 10, color: "#e2e8f0" }}
            />
            <button className="btn btn-primary">Suscribirme</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;

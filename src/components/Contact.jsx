import "./Contact.css";

const PHONE = "18292761619";
const EMAIL = "joel.18.ortiz@gmail.com";

function Contact() {
  return (
    <section id="contacto" className="section contact">
      <div className="container">
        <h2 className="section-title">Contacto</h2>
        <p className="section-subtitle">
          ¿Interesado en trabajar juntos? Puedes contactarme por cualquiera de
          estos medios.
        </p>

        <div className="contact__actions">
          <a href={`tel:+${PHONE}`} className="btn btn-primary">
            Llamar
          </a>
          <a
            href={`https://wa.me/${PHONE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            WhatsApp
          </a>
          <a href={`mailto:${EMAIL}`} className="btn btn-outline">
            {EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;

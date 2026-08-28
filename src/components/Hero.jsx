import "./Hero.css";

const TECHS = ["HTML", "CSS", "JavaScript", "React", "APIs", "Git/GitHub"];

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        <div className="hero__photo-wrapper">
          <img
            src={`${import.meta.env.BASE_URL}profile-photo.jpg`}
            alt="Foto de perfil de Joel Enrique Ortiz Álvarez"
            className="hero__photo"
          />
        </div>

        <h1 className="hero__name">Joel Enrique Ortiz Álvarez</h1>
        <h2 className="hero__title">Desarrollador Frontend Junior</h2>

        <p className="hero__description">
          Desarrollador frontend autodidacta, apasionado por construir
          interfaces modernas, responsive y bien estructuradas con React y
          JavaScript.
        </p>

        <ul className="hero__techs">
          {TECHS.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="hero__actions">
          <a href="#proyectos" className="btn btn-primary">
            Ver proyectos
          </a>
          <a href="#contacto" className="btn btn-outline">
            Contactarme
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;

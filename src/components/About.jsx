import "./About.css";

function About() {
  return (
    <section id="sobre-mi" className="section about">
      <div className="container">
        <h2 className="section-title">Sobre mí</h2>
        <p className="about__text">
          Soy un desarrollador frontend autodidacta de 25 años, enfocado en la
          construcción de interfaces web modernas y funcionales. He desarrollado
          varios proyectos personales utilizando React, JavaScript, consumo de
          APIs y control de versiones con Git/GitHub, lo que me ha permitido
          practicar buenas prácticas de desarrollo y resolver problemas reales
          de interfaz y estado.
        </p>
        <p className="about__text">
          Actualmente sigo aprendiendo y perfeccionando mis habilidades,
          combinando estudio autodidacta con el uso de inteligencia artificial
          como herramienta de apoyo en el proceso de desarrollo. Estoy en
          búsqueda de mi primera oportunidad laboral como Desarrollador Frontend
          Junior.
        </p>
      </div>
    </section>
  );
}

export default About;

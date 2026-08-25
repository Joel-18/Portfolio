import { skillsData } from "../data/skills";
import "./Skills.css";

function Skills() {
  return (
    <section id="habilidades" className="section">
      <div className="container">
        <h2 className="section-title">Habilidades</h2>
        <p className="section-subtitle">
          Tecnologías y herramientas que utilizo para construir aplicaciones
          web.
        </p>

        <div className="skills__grid">
          {skillsData.map((group) => (
            <div className="skills__card" key={group.category}>
              <h3 className="skills__card-title">{group.category}</h3>
              <ul className="skills__list">
                {group.items.map((item) => (
                  <li key={item.name} className="skills__item">
                    <span>{item.name}</span>
                    {item.level === "aprendiendo" && (
                      <span className="skills__badge">En aprendizaje</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;

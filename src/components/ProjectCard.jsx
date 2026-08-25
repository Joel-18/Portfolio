import "./ProjectCard.css";

function ProjectCard({ project }) {
  const { name, description, technologies, image, demoUrl, codeUrl } = project;

  return (
    <article className="project-card">
      <div className="project-card__image-wrapper">
        <img src={image} alt={`Captura del proyecto ${name}`} loading="lazy" />
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{name}</h3>
        <p className="project-card__description">{description}</p>

        <ul className="project-card__techs">
          {technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="project-card__actions">
          <a
            href={demoUrl}
            className="btn btn-primary btn-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver proyecto
          </a>
          <a
            href={codeUrl}
            className="btn btn-outline btn-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver código
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;

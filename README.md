# Portfolio — Joel Enrique Ortiz Álvarez

Portafolio profesional de Desarrollador Frontend Junior, construido con React + Vite.

## Tecnologías

- React
- JavaScript (ES6+)
- HTML5 / CSS3
- Vite

## Secciones

- **Inicio**: presentación, título profesional y tecnologías principales
- **Sobre mí**: perfil profesional breve
- **Habilidades**: tarjetas por categoría (Frontend, APIs, Herramientas)
- **Proyectos**: tarjetas enlazando a las 4 aplicaciones del portafolio
- **Contacto**: llamada, WhatsApp y correo

## Estructura

```
src/
├── components/   # Navbar, Hero, About, Skills, Projects, ProjectCard, Contact, Footer
├── data/         # skills.js, projects.js
├── App.jsx
├── main.jsx
└── index.css     # variables de diseño y estilos globales
```

## Cómo correrlo

```bash
npm install
npm run dev
```

## Pendiente

- Agregar `public/profile-photo.jpg` (foto de perfil real)
- Agregar capturas reales en `public/projects/`
- Reemplazar los placeholders `demoUrl` / `codeUrl` en `src/data/projects.js` con las URLs reales de cada deploy y repositorio

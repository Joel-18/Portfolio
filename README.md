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

## Cómo publicar (deploy)

1. Crea un repositorio nuevo y vacío en GitHub (sin README) llamado igual que esta carpeta.
2. Desde esta carpeta:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/NOMBRE-DEL-REPO.git
   git branch -M main
   git push -u origin main
   ```
3. Entra a https://vercel.com, inicia sesión con tu cuenta de GitHub, elige "Add New Project" e importa este repositorio. Vercel detecta Vite automáticamente — solo dale a "Deploy".
4. Cuando termine, Vercel te da una URL pública (ej: `nombre-del-repo.vercel.app`). Esa es tu `demoUrl`.

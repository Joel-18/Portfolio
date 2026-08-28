# Calculadora

Calculadora construida con React + Vite. Soporta suma, resta, multiplicación, división, decimales, borrado y limpieza de pantalla.

## Tecnologías
React, JavaScript, HTML5, CSS3, Vite

## Estructura
```
src/
├── components/  # Button, Display
├── hooks/       # useCalculator.js (lógica de la calculadora)
└── App.jsx
```

## Cómo correrlo
```bash
npm install
npm run dev
```

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

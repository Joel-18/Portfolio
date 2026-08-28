# GymTrack

Aplicación de gestión de gimnasio, 100% frontend (sin backend), construida con React + Vite + React Router + recharts.

## Tecnologías
React, React Router, JavaScript, Context API, localStorage, recharts, HTML5, CSS3, Vite

## Funcionalidades
- Autenticación simulada (registro, login, logout, perfil editable, eliminar cuenta) con localStorage
- 48 ejercicios en 8 grupos musculares, con búsqueda, filtro y favoritos
- Rutinas: crear, editar, eliminar, duplicar, agregar/quitar ejercicios y reordenarlos
- Sesión de entrenamiento en vivo: registrar series, temporizador de descanso, avanzar entre ejercicios y finalizar
- Historial de entrenamientos con detalle de series/reps/peso
- Progreso: peso corporal, volumen total, mejor marca y gráficos (recharts)
- Objetivos: peso objetivo, entrenamientos semanales y meta de fuerza, con barra de progreso
- Calendario mensual con los días entrenados resaltados
- Notificaciones simuladas guardadas en localStorage

## Estructura
```
src/
├── components/  # Navbar, Footer, ExerciseCard, ProtectedRoute
├── context/     # AuthContext, RoutinesContext, WorkoutsContext, NotificationsContext, GoalsContext
├── data/        # exercises.js
├── pages/       # Home, Exercises, Routines, RoutineEditor, WorkoutSession,
│                # History, Progress, Goals, Calendar, Notifications,
│                # Login, Register, Profile
└── utils/       # storage.js
```

## Cómo correrlo
```bash
npm install
npm run dev
```

## Nota
No hay backend: usuarios, rutinas, entrenamientos, objetivos y notificaciones se guardan en `localStorage`.

## Pendiente
Agregar imágenes reales de ejercicios en `public/exercises/`.

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

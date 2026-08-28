# TechStore

Tienda online ficticia de tecnología, 100% frontend (sin backend), construida con React + Vite + React Router.

## Tecnologías
React, React Router, JavaScript, Context API, localStorage, HTML5, CSS3, Vite

## Funcionalidades
- Catálogo con 11 categorías y 66 productos
- Búsqueda, filtros por categoría y ordenamiento
- Detalle de producto con especificaciones, stock, reseñas y productos relacionados
- Favoritos persistidos en localStorage
- Carrito: agregar, eliminar, modificar cantidades, subtotal, envío, descuentos y total
- Autenticación simulada (registro, login, logout, editar perfil, eliminar cuenta) con localStorage
- Checkout simulado con datos de envío y método de pago
- Historial de pedidos ("Mis pedidos")
- Sobre nosotros, contacto y newsletter

## Estructura
```
src/
├── components/  # Navbar, ProductCard, Footer, ProtectedRoute
├── context/     # AuthContext, CartContext, FavoritesContext, OrdersContext
├── data/        # categories.js, products.js
├── pages/       # Home, ProductList, ProductDetail, Cart, Checkout,
│                # OrderConfirmation, Orders, Login, Register, Profile,
│                # Favorites, About, Contact
└── utils/       # storage.js (helpers de localStorage)
```

## Cómo correrlo
```bash
npm install
npm run dev
```

## Nota
No hay backend ni pagos reales: todo (usuarios, carrito, pedidos, favoritos) se guarda en `localStorage` del navegador.

## Pendiente
Agregar imágenes reales de productos en `public/products/`.

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

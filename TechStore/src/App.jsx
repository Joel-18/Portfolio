import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { OrdersProvider } from "./context/OrdersContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <OrdersProvider>
            <CartProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<ProductList />} />
                <Route path="/productos/:id" element={<ProductDetail />} />
                <Route path="/carrito" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pedido-confirmado/:orderId" element={<OrderConfirmation />} />
                <Route path="/mis-pedidos" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="/favoritos" element={<Favorites />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/sobre-nosotros" element={<About />} />
                <Route path="/contacto" element={<Contact />} />
              </Routes>
              <Footer />
            </CartProvider>
          </OrdersProvider>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

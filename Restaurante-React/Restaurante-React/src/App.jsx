import { useState, useMemo } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import CategoryFilter from "./components/CategoryFilter";
import MenuItem from "./components/MenuItem";
import Cart from "./components/Cart";
import { categories, products } from "./data/menu";

function App() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "Todos") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <CartProvider>
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <main className="container">
        <h1 className="page-title">Nuestro Menú</h1>
        <p className="page-subtitle">Platos preparados con ingredientes frescos, todos los días.</p>

        <CategoryFilter categories={categories} active={activeCategory} onSelect={setActiveCategory} />

        <div className="menu-grid">
          {filteredProducts.map((product) => (
            <MenuItem key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </CartProvider>
  );
}

export default App;

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, shipping, discount, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container">
        <h1 className="page-title">Tu carrito</h1>
        <p className="empty-state">Tu carrito está vacío.</p>
        <Link to="/productos" className="btn btn-primary">Ir a productos</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Tu carrito</h1>
      <div className="ts-cart-layout">
        <ul className="ts-cart-list">
          {items.map((item) => (
            <li key={item.id} className="ts-cart-list__item">
              <img src={item.image} alt={item.name} />
              <div className="ts-cart-list__info">
                <h3>{item.name}</h3>
                <span>${item.price.toFixed(2)} c/u</span>
                <div className="ts-cart-list__qty">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <div className="ts-cart-list__side">
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                <button className="ts-cart-list__remove" onClick={() => removeItem(item.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>

        <aside className="card-box ts-cart-summary">
          <h2>Resumen</h2>
          <div className="ts-cart-summary__row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="ts-cart-summary__row"><span>Envío</span><span>{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span></div>
          {discount > 0 && (
            <div className="ts-cart-summary__row"><span>Descuento</span><span>-${discount.toFixed(2)}</span></div>
          )}
          <div className="ts-cart-summary__row ts-cart-summary__total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <Link to="/checkout" className="btn btn-primary" style={{ width: "100%", marginTop: 16 }}>
            Ir a pagar
          </Link>
          <button className="btn btn-outline" style={{ width: "100%", marginTop: 10 }} onClick={clearCart}>
            Vaciar carrito
          </button>
        </aside>
      </div>
    </div>
  );
}

export default Cart;

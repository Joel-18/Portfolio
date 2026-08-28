import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart({ isOpen, onClose }) {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();

  return (
    <div className={`cart-drawer ${isOpen ? "cart-drawer--open" : ""}`}>
      <div className="cart-drawer__overlay" onClick={onClose} />
      <div className="cart-drawer__panel">
        <div className="cart-drawer__header">
          <h2>Tu carrito</h2>
          <button onClick={onClose} className="cart-drawer__close">✕</button>
        </div>

        {items.length === 0 ? (
          <p className="cart-drawer__empty">Tu carrito está vacío.</p>
        ) : (
          <>
            <ul className="cart-drawer__list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item__info">
                    <h4>{item.name}</h4>
                    <span>RD$ {item.price} c/u</span>
                    <div className="cart-item__qty">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button className="cart-item__remove" onClick={() => removeItem(item.id)}>
                    🗑️
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__total">
                <span>Total</span>
                <strong>RD$ {total}</strong>
              </div>
              <button className="cart-drawer__clear" onClick={clearCart}>
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;

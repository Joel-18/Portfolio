import { useCart } from "../context/CartContext";
import "./MenuItem.css";

function MenuItem({ product }) {
  const { addItem } = useCart();

  return (
    <article className="menu-item">
      <div className="menu-item__image-wrapper">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="menu-item__body">
        <h3>{product.name}</h3>
        <p className="menu-item__description">{product.description}</p>
        <div className="menu-item__footer">
          <span className="menu-item__price">RD$ {product.price}</span>
          <button className="menu-item__btn" onClick={() => addItem(product)}>
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}

export default MenuItem;

import { useState } from "react";
import { useOrders } from "../context/OrdersContext";

function Orders() {
  const { orders } = useOrders();
  const [selected, setSelected] = useState(null);

  if (orders.length === 0) {
    return (
      <div className="container">
        <h1 className="page-title">Mis pedidos</h1>
        <p className="empty-state">Aún no tienes pedidos realizados.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Mis pedidos</h1>
      <ul className="ts-orders-list">
        {orders.map((order) => (
          <li key={order.id} className="card-box">
            <div className="ts-orders-list__header" onClick={() => setSelected(selected === order.id ? null : order.id)}>
              <div>
                <strong>{order.id}</strong>
                <p>{new Date(order.date).toLocaleDateString()} — {order.status}</p>
              </div>
              <span>${order.total.toFixed(2)}</span>
            </div>
            {selected === order.id && (
              <ul className="ts-orders-list__items">
                {order.items.map((item) => (
                  <li key={item.id}>{item.quantity}x {item.name} — ${(item.price * item.quantity).toFixed(2)}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;

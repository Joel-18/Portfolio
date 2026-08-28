import { useParams, Link } from "react-router-dom";
import { useOrders } from "../context/OrdersContext";

function OrderConfirmation() {
  const { orderId } = useParams();
  const { orders } = useOrders();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="container">
        <p className="empty-state">No encontramos ese pedido.</p>
        <Link to="/" className="btn btn-primary">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card-box ts-confirmation">
        <h1>✅ ¡Pedido confirmado!</h1>
        <p>Número de pedido: <strong>{order.id}</strong></p>
        <p>Fecha: {new Date(order.date).toLocaleString()}</p>
        <p>Total: <strong>${order.total.toFixed(2)}</strong></p>
        <p>Te enviaremos la confirmación a {order.customer.correo}.</p>
        <div className="ts-confirmation__actions">
          <Link to="/mis-pedidos" className="btn btn-primary">Ver mis pedidos</Link>
          <Link to="/productos" className="btn btn-outline">Seguir comprando</Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;

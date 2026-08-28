import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";

const initialForm = {
  nombre: "", apellido: "", correo: "", telefono: "",
  direccion: "", ciudad: "", codigoPostal: "",
  metodoEnvio: "estandar", metodoPago: "tarjeta",
};

function Checkout() {
  const { items, total, clearCart } = useCart();
  const { createOrder } = useOrders();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = createOrder({
      items,
      total,
      customer: form,
    });
    clearCart();
    navigate(`/pedido-confirmado/${order.id}`);
  };

  if (items.length === 0) {
    return (
      <div className="container">
        <p className="empty-state">No hay productos para pagar. Agrega algo al carrito primero.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Checkout</h1>
      <form onSubmit={handleSubmit} className="ts-checkout-form card-box">
        <div className="ts-checkout-grid">
          <div className="form-field"><label>Nombre</label><input name="nombre" required value={form.nombre} onChange={handleChange} /></div>
          <div className="form-field"><label>Apellido</label><input name="apellido" required value={form.apellido} onChange={handleChange} /></div>
          <div className="form-field"><label>Correo</label><input type="email" name="correo" required value={form.correo} onChange={handleChange} /></div>
          <div className="form-field"><label>Teléfono</label><input name="telefono" required value={form.telefono} onChange={handleChange} /></div>
          <div className="form-field"><label>Dirección</label><input name="direccion" required value={form.direccion} onChange={handleChange} /></div>
          <div className="form-field"><label>Ciudad</label><input name="ciudad" required value={form.ciudad} onChange={handleChange} /></div>
          <div className="form-field"><label>Código postal</label><input name="codigoPostal" required value={form.codigoPostal} onChange={handleChange} /></div>
          <div className="form-field">
            <label>Método de envío</label>
            <select name="metodoEnvio" value={form.metodoEnvio} onChange={handleChange}>
              <option value="estandar">Estándar (3-5 días)</option>
              <option value="express">Express (24 horas)</option>
            </select>
          </div>
          <div className="form-field">
            <label>Método de pago</label>
            <select name="metodoPago" value={form.metodoPago} onChange={handleChange}>
              <option value="tarjeta">Tarjeta de crédito/débito</option>
              <option value="transferencia">Transferencia bancaria</option>
              <option value="efectivo">Pago contra entrega</option>
            </select>
          </div>
        </div>

        <p className="ts-checkout-note">Total a pagar: <strong>${total.toFixed(2)}</strong> (compra simulada, sin pagos reales)</p>
        <button type="submit" className="btn btn-primary">Confirmar pedido</button>
      </form>
    </div>
  );
}

export default Checkout;

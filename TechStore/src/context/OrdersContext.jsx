import { createContext, useContext, useState, useEffect } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => loadFromStorage("techstore_orders", []));

  useEffect(() => {
    saveToStorage("techstore_orders", orders);
  }, [orders]);

  const createOrder = (order) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: "Confirmado",
      ...order,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <OrdersContext.Provider value={{ orders, createOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) throw new Error("useOrders debe usarse dentro de OrdersProvider");
  return context;
}

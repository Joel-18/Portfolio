import { createContext, useContext, useState, useEffect } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(() => loadFromStorage("gymtrack_notifications", []));

  useEffect(() => {
    saveToStorage("gymtrack_notifications", notifications);
  }, [notifications]);

  const addNotification = (type, message) => {
    setNotifications((prev) => [
      { id: Date.now(), type, message, read: false, date: new Date().toISOString() },
      ...prev,
    ]);
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, markAllRead }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications debe usarse dentro de NotificationsProvider");
  return ctx;
}

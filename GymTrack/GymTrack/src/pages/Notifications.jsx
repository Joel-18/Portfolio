import { useEffect } from "react";
import { useNotifications } from "../context/NotificationsContext";

function Notifications() {
  const { notifications, markAllRead } = useNotifications();

  useEffect(() => {
    markAllRead();
  }, []);

  if (notifications.length === 0) {
    return (
      <div className="container">
        <h1 className="page-title">Notificaciones</h1>
        <p className="empty-state">No tienes notificaciones todavía.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Notificaciones</h1>
      <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {notifications.map((n) => (
          <li key={n.id} className="card-box">
            <p>{n.message}</p>
            <span style={{ color: "#64748b", fontSize: "0.8rem" }}>{new Date(n.date).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Notifications;

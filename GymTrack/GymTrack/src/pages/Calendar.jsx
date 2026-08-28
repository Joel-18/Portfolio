import { useState } from "react";
import { useWorkouts } from "../context/WorkoutsContext";

function Calendar() {
  const { history } = useWorkouts();
  const [monthOffset, setMonthOffset] = useState(0);

  const today = new Date();
  const viewDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const workoutDays = new Set(
    history
      .filter((h) => {
        const d = new Date(h.date);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .map((h) => new Date(h.date).getDate())
  );

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const cells = [...Array(firstDayOfWeek).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const monthName = viewDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" });

  return (
    <div className="container">
      <h1 className="page-title">Calendario de entrenamientos</h1>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <button className="btn btn-outline" onClick={() => setMonthOffset((o) => o - 1)}>← Anterior</button>
        <h2 style={{ textTransform: "capitalize" }}>{monthName}</h2>
        <button className="btn btn-outline" onClick={() => setMonthOffset((o) => o + 1)}>Siguiente →</button>
      </div>

      <div className="gt-calendar">
        {["D", "L", "M", "X", "J", "V", "S"].map((d) => (
          <div key={d} className="gt-calendar__day-label">{d}</div>
        ))}
        {cells.map((day, i) => (
          <div key={i} className={`gt-calendar__cell ${day && workoutDays.has(day) ? "gt-calendar__cell--active" : ""}`}>
            {day || ""}
          </div>
        ))}
      </div>
      <p style={{ color: "#94a3b8", marginTop: 16, fontSize: "0.85rem" }}>🟢 Días con entrenamiento registrado</p>
    </div>
  );
}
export default Calendar;

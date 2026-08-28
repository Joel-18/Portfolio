import { useState } from "react";
import { useWorkouts } from "../context/WorkoutsContext";

function History() {
  const { history } = useWorkouts();
  const [selected, setSelected] = useState(null);

  if (history.length === 0) {
    return (
      <div className="container">
        <h1 className="page-title">Historial de entrenamientos</h1>
        <p className="empty-state">Aún no has completado ningún entrenamiento.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Historial de entrenamientos</h1>
      <ul style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {history.map((entry) => (
          <li key={entry.id} className="card-box">
            <div
              style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}
              onClick={() => setSelected(selected === entry.id ? null : entry.id)}
            >
              <div>
                <strong>{entry.routineName}</strong>
                <p style={{ color: "#64748b", fontSize: "0.85rem" }}>{new Date(entry.date).toLocaleString()}</p>
              </div>
              <span>{entry.duration} min</span>
            </div>
            {selected === entry.id && (
              <ul style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #1e293b", color: "#94a3b8", fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: 6 }}>
                {entry.exercises.map((ex, i) => (
                  <li key={i}>{ex.name}: {ex.sets} series × {ex.reps} reps — {ex.weight} kg</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default History;

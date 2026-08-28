import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useWorkouts } from "../context/WorkoutsContext";

function Progress() {
  const { history, bodyWeightLog, logBodyWeight } = useWorkouts();
  const [weightInput, setWeightInput] = useState("");

  const weightData = bodyWeightLog.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString(),
    peso: entry.weight,
  }));

  const frequencyByWeek = {};
  history.forEach((h) => {
    const date = new Date(h.date);
    const week = `${date.getFullYear()}-S${Math.ceil(date.getDate() / 7)}`;
    frequencyByWeek[week] = (frequencyByWeek[week] || 0) + 1;
  });
  const frequencyData = Object.entries(frequencyByWeek).map(([week, count]) => ({ week, entrenamientos: count }));

  const totalVolume = history.reduce((sum, h) =>
    sum + h.exercises.reduce((s, ex) => s + ex.sets * ex.reps * ex.weight, 0), 0);

  const bestLift = history
    .flatMap((h) => h.exercises)
    .reduce((best, ex) => (ex.weight > (best?.weight || 0) ? ex : best), null);

  const handleAddWeight = (e) => {
    e.preventDefault();
    if (!weightInput) return;
    logBodyWeight(weightInput);
    setWeightInput("");
  };

  return (
    <div className="container">
      <h1 className="page-title">Progreso</h1>

      <div className="gt-stats" style={{ marginBottom: 32 }}>
        <div className="card-box"><span>Entrenamientos totales</span><strong>{history.length}</strong></div>
        <div className="card-box"><span>Volumen total (kg)</span><strong>{totalVolume.toLocaleString()}</strong></div>
        <div className="card-box"><span>Mejor marca</span><strong>{bestLift ? `${bestLift.name} — ${bestLift.weight}kg` : "N/A"}</strong></div>
      </div>

      <div className="card-box" style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 16 }}>Evolución de peso corporal</h2>
        <form onSubmit={handleAddWeight} style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <input
            type="number" placeholder="Peso actual (kg)" value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: 10, color: "#e2e8f0" }}
          />
          <button className="btn btn-primary">Registrar</button>
        </form>
        {weightData.length === 0 ? (
          <p className="empty-state">Registra tu peso para ver la evolución.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={weightData}>
              <CartesianGrid stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
              <Line type="monotone" dataKey="peso" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="card-box">
        <h2 style={{ marginBottom: 16 }}>Frecuencia de entrenamientos por semana</h2>
        {frequencyData.length === 0 ? (
          <p className="empty-state">Completa entrenamientos para ver tu frecuencia.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={frequencyData}>
              <CartesianGrid stroke="#1e293b" />
              <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
              <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
              <Bar dataKey="entrenamientos" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
export default Progress;

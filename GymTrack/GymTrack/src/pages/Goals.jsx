import { useState } from "react";
import { useGoals } from "../context/GoalsContext";
import { useWorkouts } from "../context/WorkoutsContext";

function Goals() {
  const { goals, updateGoals } = useGoals();
  const { history } = useWorkouts();
  const [form, setForm] = useState(goals);
  const [saved, setSaved] = useState(false);

  const thisWeekCount = history.filter((h) => {
    const d = new Date(h.date);
    const now = new Date();
    const diffDays = (now - d) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  }).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateGoals(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const progressPct = Math.min(100, Math.round((thisWeekCount / (goals.weeklyWorkouts || 1)) * 100));

  return (
    <div className="container">
      <h1 className="page-title">Objetivos</h1>

      <div className="card-box" style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 10 }}>Progreso semanal</h2>
        <p style={{ color: "#94a3b8", marginBottom: 10 }}>{thisWeekCount} de {goals.weeklyWorkouts} entrenamientos esta semana</p>
        <div style={{ background: "#1e293b", borderRadius: 999, height: 10, overflow: "hidden" }}>
          <div style={{ width: `${progressPct}%`, background: "#22c55e", height: "100%" }} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card-box" style={{ maxWidth: 420 }}>
        {saved && <p className="gt-form-success">Objetivos actualizados ✓</p>}
        <div className="form-field">
          <label>Peso objetivo (kg)</label>
          <input type="number" value={form.targetWeight} onChange={(e) => setForm({ ...form, targetWeight: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Entrenamientos por semana</label>
          <input type="number" min="1" max="7" value={form.weeklyWorkouts} onChange={(e) => setForm({ ...form, weeklyWorkouts: Number(e.target.value) })} />
        </div>
        <div className="form-field">
          <label>Objetivo de fuerza</label>
          <input placeholder="Ej: Sentadilla 100kg" value={form.strengthGoal} onChange={(e) => setForm({ ...form, strengthGoal: e.target.value })} />
        </div>
        <button className="btn btn-primary" style={{ width: "100%" }}>Guardar objetivos</button>
      </form>
    </div>
  );
}
export default Goals;

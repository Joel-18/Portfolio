import { useState } from "react";
import { Link } from "react-router-dom";
import { useRoutines } from "../context/RoutinesContext";

function Routines() {
  const { routines, createRoutine, deleteRoutine, duplicateRoutine } = useRoutines();
  const [name, setName] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    createRoutine({ name, description: "" });
    setName("");
  };

  return (
    <div className="container">
      <h1 className="page-title">Mis rutinas</h1>

      <form onSubmit={handleCreate} style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
        <input
          placeholder="Nombre de la nueva rutina"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ flex: 1, minWidth: 200, background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: 10, color: "#e2e8f0" }}
        />
        <button className="btn btn-primary">Crear rutina</button>
      </form>

      {routines.length === 0 ? (
        <p className="empty-state">Aún no tienes rutinas. Crea la primera arriba.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {routines.map((r) => (
            <div key={r.id} className="card-box" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
              <div>
                <h3>{r.name}</h3>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{r.exercises.length} ejercicio(s)</p>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Link to={`/rutinas/${r.id}`} className="btn btn-primary">Editar</Link>
                <Link to={`/entrenamiento/${r.id}`} className="btn btn-outline">Iniciar</Link>
                <button className="btn btn-outline" onClick={() => duplicateRoutine(r.id)}>Duplicar</button>
                <button className="btn btn-danger" onClick={() => deleteRoutine(r.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Routines;

import { useState, useMemo } from "react";
import { exercises, muscleGroups } from "../data/exercises";
import ExerciseCard from "../components/ExerciseCard";
import { loadFromStorage, saveToStorage } from "../utils/storage";

function Exercises() {
  const [search, setSearch] = useState("");
  const [muscle, setMuscle] = useState("Todos");
  const [favoriteIds, setFavoriteIds] = useState(() => loadFromStorage("gymtrack_fav_exercises", []));

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      saveToStorage("gymtrack_fav_exercises", updated);
      return updated;
    });
  };

  const filtered = useMemo(() => {
    let result = exercises;
    if (muscle !== "Todos") result = result.filter((e) => e.muscle === muscle);
    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((e) => e.name.toLowerCase().includes(term));
    }
    return result;
  }, [search, muscle]);

  return (
    <div className="container">
      <h1 className="page-title">Ejercicios</h1>
      <p className="page-subtitle">{filtered.length} ejercicio(s)</p>

      <div className="ts-filters" style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <input
          placeholder="Buscar ejercicio..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200, background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: 10, color: "#e2e8f0" }}
        />
        <select value={muscle} onChange={(e) => setMuscle(e.target.value)} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: 10, color: "#e2e8f0" }}>
          <option value="Todos">Todos los músculos</option>
          {muscleGroups.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No se encontraron ejercicios.</p>
      ) : (
        <div className="exercises-grid">
          {filtered.map((ex) => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              isFavorite={favoriteIds.includes(ex.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default Exercises;

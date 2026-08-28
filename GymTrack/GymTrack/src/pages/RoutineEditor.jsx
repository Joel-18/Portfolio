import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useRoutines } from "../context/RoutinesContext";
import { exercises, muscleGroups } from "../data/exercises";

function RoutineEditor() {
  const { id } = useParams();
  const {
    routines, updateRoutine, addExerciseToRoutine,
    removeExerciseFromRoutine, reorderExercise, updateExerciseInRoutine,
  } = useRoutines();
  const routine = routines.find((r) => r.id === Number(id));
  const [muscleFilter, setMuscleFilter] = useState("Todos");

  if (!routine) {
    return (
      <div className="container">
        <p className="empty-state">Rutina no encontrada.</p>
        <Link to="/rutinas" className="btn btn-outline">Volver a rutinas</Link>
      </div>
    );
  }

  const availableExercises = muscleFilter === "Todos"
    ? exercises
    : exercises.filter((e) => e.muscle === muscleFilter);

  return (
    <div className="container">
      <h1 className="page-title">Editar rutina</h1>
      <input
        value={routine.name}
        onChange={(e) => updateRoutine(routine.id, { name: e.target.value })}
        style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: 10, color: "#e2e8f0", marginBottom: 24, width: "100%", maxWidth: 400 }}
      />

      <div className="gt-editor-layout">
        <div>
          <h2 style={{ marginBottom: 12 }}>Ejercicios en la rutina ({routine.exercises.length})</h2>
          {routine.exercises.length === 0 ? (
            <p className="empty-state">Agrega ejercicios desde la lista de la derecha.</p>
          ) : (
            <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {routine.exercises.map((ex, index) => (
                <li key={`${ex.id}-${index}`} className="card-box gt-routine-exercise">
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>{ex.name}</strong>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button disabled={index === 0} onClick={() => reorderExercise(routine.id, index, index - 1)}>↑</button>
                      <button disabled={index === routine.exercises.length - 1} onClick={() => reorderExercise(routine.id, index, index + 1)}>↓</button>
                      <button onClick={() => removeExerciseFromRoutine(routine.id, index)}>🗑️</button>
                    </div>
                  </div>
                  <div className="gt-routine-exercise__fields">
                    <label>Series
                      <input type="number" min="1" value={ex.sets} onChange={(e) => updateExerciseInRoutine(routine.id, index, { sets: Number(e.target.value) })} />
                    </label>
                    <label>Reps
                      <input type="number" min="1" value={ex.reps} onChange={(e) => updateExerciseInRoutine(routine.id, index, { reps: Number(e.target.value) })} />
                    </label>
                    <label>Peso (kg)
                      <input type="number" min="0" value={ex.weight} onChange={(e) => updateExerciseInRoutine(routine.id, index, { weight: Number(e.target.value) })} />
                    </label>
                    <label>Descanso (s)
                      <input type="number" min="0" value={ex.rest} onChange={(e) => updateExerciseInRoutine(routine.id, index, { rest: Number(e.target.value) })} />
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 style={{ marginBottom: 12 }}>Agregar ejercicios</h2>
          <select
            value={muscleFilter}
            onChange={(e) => setMuscleFilter(e.target.value)}
            style={{ marginBottom: 12, width: "100%", background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: 10, color: "#e2e8f0" }}
          >
            <option value="Todos">Todos los músculos</option>
            {muscleGroups.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <ul className="gt-add-exercise-list">
            {availableExercises.map((ex) => (
              <li key={ex.id}>
                <span>{ex.name} <small>({ex.muscle})</small></span>
                <button className="btn btn-primary" onClick={() => addExerciseToRoutine(routine.id, ex)}>+</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default RoutineEditor;

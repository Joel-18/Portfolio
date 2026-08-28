import { createContext, useContext, useState, useEffect } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const RoutinesContext = createContext(null);

export function RoutinesProvider({ children }) {
  const [routines, setRoutines] = useState(() => loadFromStorage("gymtrack_routines", []));

  useEffect(() => {
    saveToStorage("gymtrack_routines", routines);
  }, [routines]);

  const createRoutine = (routine) => {
    const newRoutine = { id: Date.now(), exercises: [], ...routine };
    setRoutines((prev) => [...prev, newRoutine]);
    return newRoutine;
  };

  const updateRoutine = (id, updates) => {
    setRoutines((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  const deleteRoutine = (id) => {
    setRoutines((prev) => prev.filter((r) => r.id !== id));
  };

  const duplicateRoutine = (id) => {
    const original = routines.find((r) => r.id === id);
    if (!original) return;
    const copy = { ...original, id: Date.now(), name: `${original.name} (copia)` };
    setRoutines((prev) => [...prev, copy]);
  };

  const addExerciseToRoutine = (routineId, exercise) => {
    setRoutines((prev) =>
      prev.map((r) =>
        r.id === routineId
          ? { ...r, exercises: [...r.exercises, { ...exercise, sets: 3, reps: 10, weight: 0, rest: 60 }] }
          : r
      )
    );
  };

  const removeExerciseFromRoutine = (routineId, exerciseIndex) => {
    setRoutines((prev) =>
      prev.map((r) =>
        r.id === routineId
          ? { ...r, exercises: r.exercises.filter((_, i) => i !== exerciseIndex) }
          : r
      )
    );
  };

  const reorderExercise = (routineId, fromIndex, toIndex) => {
    setRoutines((prev) =>
      prev.map((r) => {
        if (r.id !== routineId) return r;
        const list = [...r.exercises];
        const [moved] = list.splice(fromIndex, 1);
        list.splice(toIndex, 0, moved);
        return { ...r, exercises: list };
      })
    );
  };

  const updateExerciseInRoutine = (routineId, exerciseIndex, updates) => {
    setRoutines((prev) =>
      prev.map((r) => {
        if (r.id !== routineId) return r;
        const list = r.exercises.map((ex, i) => (i === exerciseIndex ? { ...ex, ...updates } : ex));
        return { ...r, exercises: list };
      })
    );
  };

  return (
    <RoutinesContext.Provider
      value={{
        routines, createRoutine, updateRoutine, deleteRoutine, duplicateRoutine,
        addExerciseToRoutine, removeExerciseFromRoutine, reorderExercise, updateExerciseInRoutine,
      }}
    >
      {children}
    </RoutinesContext.Provider>
  );
}

export function useRoutines() {
  const ctx = useContext(RoutinesContext);
  if (!ctx) throw new Error("useRoutines debe usarse dentro de RoutinesProvider");
  return ctx;
}

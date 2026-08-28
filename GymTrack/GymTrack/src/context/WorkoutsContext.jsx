import { createContext, useContext, useState, useEffect } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const WorkoutsContext = createContext(null);

export function WorkoutsProvider({ children }) {
  const [history, setHistory] = useState(() => loadFromStorage("gymtrack_history", []));
  const [bodyWeightLog, setBodyWeightLog] = useState(() => loadFromStorage("gymtrack_bodyweight", []));

  useEffect(() => {
    saveToStorage("gymtrack_history", history);
  }, [history]);

  useEffect(() => {
    saveToStorage("gymtrack_bodyweight", bodyWeightLog);
  }, [bodyWeightLog]);

  const saveWorkout = (workout) => {
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...workout,
    };
    setHistory((prev) => [entry, ...prev]);
    return entry;
  };

  const logBodyWeight = (weight) => {
    setBodyWeightLog((prev) => [...prev, { date: new Date().toISOString(), weight: Number(weight) }]);
  };

  return (
    <WorkoutsContext.Provider value={{ history, saveWorkout, bodyWeightLog, logBodyWeight }}>
      {children}
    </WorkoutsContext.Provider>
  );
}

export function useWorkouts() {
  const ctx = useContext(WorkoutsContext);
  if (!ctx) throw new Error("useWorkouts debe usarse dentro de WorkoutsProvider");
  return ctx;
}

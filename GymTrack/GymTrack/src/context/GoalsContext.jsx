import { createContext, useContext, useState, useEffect } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const GoalsContext = createContext(null);

const defaultGoals = { targetWeight: "", weeklyWorkouts: 3, strengthGoal: "" };

export function GoalsProvider({ children }) {
  const [goals, setGoals] = useState(() => loadFromStorage("gymtrack_goals", defaultGoals));

  useEffect(() => {
    saveToStorage("gymtrack_goals", goals);
  }, [goals]);

  const updateGoals = (updates) => setGoals((prev) => ({ ...prev, ...updates }));

  return (
    <GoalsContext.Provider value={{ goals, updateGoals }}>
      {children}
    </GoalsContext.Provider>
  );
}

export function useGoals() {
  const ctx = useContext(GoalsContext);
  if (!ctx) throw new Error("useGoals debe usarse dentro de GoalsProvider");
  return ctx;
}

import { createContext, useContext, useState } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const AuthContext = createContext(null);

function getUsers() {
  return loadFromStorage("gymtrack_users", []);
}
function saveUsers(users) {
  saveToStorage("gymtrack_users", users);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => loadFromStorage("gymtrack_current_user", null));

  const register = ({ name, email, password }) => {
    const users = getUsers();
    if (users.some((u) => u.email === email)) {
      return { ok: false, error: "Ya existe una cuenta con ese correo." };
    }
    const newUser = {
      id: Date.now(), name, email, password,
      phone: "", age: "", weight: "", height: "",
      goal: "Ganar masa muscular", level: "Principiante",
    };
    saveUsers([...users, newUser]);
    setCurrentUser(newUser);
    saveToStorage("gymtrack_current_user", newUser);
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { ok: false, error: "Correo o contraseña incorrectos." };
    setCurrentUser(found);
    saveToStorage("gymtrack_current_user", found);
    return { ok: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("gymtrack_current_user");
  };

  const updateProfile = (updates) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    saveUsers(getUsers().map((u) => (u.id === updated.id ? updated : u)));
    setCurrentUser(updated);
    saveToStorage("gymtrack_current_user", updated);
  };

  const deleteAccount = () => {
    if (!currentUser) return;
    saveUsers(getUsers().filter((u) => u.id !== currentUser.id));
    logout();
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout, updateProfile, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}

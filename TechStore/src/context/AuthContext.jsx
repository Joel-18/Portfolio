import { createContext, useContext, useState } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const AuthContext = createContext(null);

function getUsers() {
  return loadFromStorage("techstore_users", []);
}

function saveUsers(users) {
  saveToStorage("techstore_users", users);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() =>
    loadFromStorage("techstore_current_user", null)
  );

  const register = ({ name, email, password }) => {
    const users = getUsers();
    if (users.some((u) => u.email === email)) {
      return { ok: false, error: "Ya existe una cuenta con ese correo." };
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      phone: "",
      preferences: { newsletter: true },
    };
    saveUsers([...users, newUser]);
    setCurrentUser(newUser);
    saveToStorage("techstore_current_user", newUser);
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { ok: false, error: "Correo o contraseña incorrectos." };
    setCurrentUser(found);
    saveToStorage("techstore_current_user", found);
    return { ok: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("techstore_current_user");
  };

  const updateProfile = (updates) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    const users = getUsers().map((u) => (u.id === updated.id ? updated : u));
    saveUsers(users);
    setCurrentUser(updated);
    saveToStorage("techstore_current_user", updated);
  };

  const deleteAccount = () => {
    if (!currentUser) return;
    const users = getUsers().filter((u) => u.id !== currentUser.id);
    saveUsers(users);
    logout();
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, register, login, logout, updateProfile, deleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}

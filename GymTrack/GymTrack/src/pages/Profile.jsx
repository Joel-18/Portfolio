import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GOALS = ["Perder grasa", "Ganar masa muscular", "Mantenimiento", "Mejorar resistencia"];
const LEVELS = ["Principiante", "Intermedio", "Avanzado"];

function Profile() {
  const { currentUser, updateProfile, deleteAccount, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...currentUser });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = () => {
    if (confirm("¿Seguro que quieres eliminar tu cuenta?")) {
      deleteAccount();
      navigate("/");
    }
  };

  return (
    <div className="container gt-auth">
      <form onSubmit={handleSubmit} className="card-box gt-auth-form">
        <h1 className="page-title">Mi perfil</h1>
        {saved && <p className="gt-form-success">Perfil actualizado ✓</p>}
        <div className="form-field"><label>Correo</label><input value={form.email} disabled /></div>
        <div className="form-field"><label>Nombre</label><input name="name" value={form.name} onChange={handleChange} /></div>
        <div className="form-field"><label>Teléfono</label><input name="phone" value={form.phone} onChange={handleChange} /></div>
        <div className="form-field"><label>Edad</label><input type="number" name="age" value={form.age} onChange={handleChange} /></div>
        <div className="form-field"><label>Peso (kg)</label><input type="number" name="weight" value={form.weight} onChange={handleChange} /></div>
        <div className="form-field"><label>Altura (cm)</label><input type="number" name="height" value={form.height} onChange={handleChange} /></div>
        <div className="form-field">
          <label>Objetivo</label>
          <select name="goal" value={form.goal} onChange={handleChange}>
            {GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label>Nivel</label>
          <select name="level" value={form.level} onChange={handleChange}>
            {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <button className="btn btn-primary" style={{ width: "100%" }}>Guardar cambios</button>
        <button type="button" className="btn btn-outline" style={{ width: "100%", marginTop: 10 }} onClick={logout}>Cerrar sesión</button>
        <button type="button" className="btn btn-danger" style={{ width: "100%", marginTop: 10 }} onClick={handleDelete}>Eliminar cuenta</button>
      </form>
    </div>
  );
}
export default Profile;

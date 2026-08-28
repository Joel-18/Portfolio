import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = register(form);
    if (!result.ok) return setError(result.error);
    navigate("/perfil");
  };

  return (
    <div className="container gt-auth">
      <form onSubmit={handleSubmit} className="card-box gt-auth-form">
        <h1 className="page-title">Crear cuenta</h1>
        {error && <p className="gt-form-error">{error}</p>}
        <div className="form-field"><label>Nombre completo</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div className="form-field"><label>Correo</label><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div className="form-field"><label>Contraseña</label><input type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
        <button className="btn btn-primary" style={{ width: "100%" }}>Registrarme</button>
        <p className="gt-auth-switch">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </form>
    </div>
  );
}
export default Register;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form);
    if (!result.ok) return setError(result.error);
    navigate("/perfil");
  };

  return (
    <div className="container gt-auth">
      <form onSubmit={handleSubmit} className="card-box gt-auth-form">
        <h1 className="page-title">Iniciar sesión</h1>
        {error && <p className="gt-form-error">{error}</p>}
        <div className="form-field"><label>Correo</label><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div className="form-field"><label>Contraseña</label><input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
        <button className="btn btn-primary" style={{ width: "100%" }}>Iniciar sesión</button>
        <p className="gt-auth-switch">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
      </form>
    </div>
  );
}
export default Login;

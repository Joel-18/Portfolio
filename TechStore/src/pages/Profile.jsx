import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { currentUser, updateProfile, deleteAccount, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: currentUser.name,
    phone: currentUser.phone || "",
    newsletter: currentUser.preferences?.newsletter ?? true,
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({ name: form.name, phone: form.phone, preferences: { newsletter: form.newsletter } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = () => {
    if (confirm("¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      deleteAccount();
      navigate("/");
    }
  };

  return (
    <div className="container ts-auth">
      <form onSubmit={handleSubmit} className="card-box ts-auth-form">
        <h1 className="page-title">Mi perfil</h1>
        {saved && <p className="ts-form-success">Perfil actualizado ✓</p>}
        <div className="form-field"><label>Correo</label><input value={currentUser.email} disabled /></div>
        <div className="form-field">
          <label>Nombre</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Teléfono</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <label className="ts-checkbox">
          <input
            type="checkbox"
            checked={form.newsletter}
            onChange={(e) => setForm({ ...form, newsletter: e.target.checked })}
          />
          Recibir newsletter con ofertas
        </label>
        <button className="btn btn-primary" style={{ width: "100%", marginTop: 12 }}>Guardar cambios</button>
        <button type="button" className="btn btn-outline" style={{ width: "100%", marginTop: 10 }} onClick={logout}>
          Cerrar sesión
        </button>
        <button type="button" className="btn btn-danger" style={{ width: "100%", marginTop: 10 }} onClick={handleDelete}>
          Eliminar cuenta
        </button>
      </form>
    </div>
  );
}

export default Profile;

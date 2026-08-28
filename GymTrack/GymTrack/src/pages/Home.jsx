import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useWorkouts } from "../context/WorkoutsContext";
import { useRoutines } from "../context/RoutinesContext";

function Home() {
  const { currentUser } = useAuth();
  const { history } = useWorkouts();
  const { routines } = useRoutines();

  return (
    <div className="container">
      <section className="gt-hero">
        <h1>Registra tu progreso, alcanza tus metas</h1>
        <p>Rutinas, entrenamientos e historial, todo en un solo lugar.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/ejercicios" className="btn btn-primary">Ver ejercicios</Link>
          <Link to="/rutinas" className="btn btn-outline">Mis rutinas</Link>
        </div>
      </section>

      {currentUser && (
        <section className="gt-stats">
          <div className="card-box"><span>Entrenamientos totales</span><strong>{history.length}</strong></div>
          <div className="card-box"><span>Rutinas creadas</span><strong>{routines.length}</strong></div>
          <div className="card-box"><span>Objetivo</span><strong>{currentUser.goal}</strong></div>
        </section>
      )}
    </div>
  );
}
export default Home;

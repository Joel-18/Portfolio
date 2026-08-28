import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useRoutines } from "../context/RoutinesContext";
import { useWorkouts } from "../context/WorkoutsContext";
import { useNotifications } from "../context/NotificationsContext";

function WorkoutSession() {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const { routines } = useRoutines();
  const { saveWorkout } = useWorkouts();
  const { addNotification } = useNotifications();
  const routine = routines.find((r) => r.id === Number(routineId));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [log, setLog] = useState([]);
  const [completedSets, setCompletedSets] = useState(0);
  const [restSeconds, setRestSeconds] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [startTime] = useState(Date.now());
  const timerRef = useRef(null);

  useEffect(() => {
    if (isResting && restSeconds > 0) {
      timerRef.current = setTimeout(() => setRestSeconds((s) => s - 1), 1000);
    } else if (isResting && restSeconds === 0) {
      setIsResting(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [isResting, restSeconds]);

  if (!routine) {
    return (
      <div className="container">
        <p className="empty-state">Rutina no encontrada.</p>
        <Link to="/rutinas" className="btn btn-outline">Volver</Link>
      </div>
    );
  }

  const currentExercise = routine.exercises[currentIndex];

  const completeSet = () => {
    const nextCompleted = completedSets + 1;
    setCompletedSets(nextCompleted);
    if (nextCompleted < currentExercise.sets) {
      setRestSeconds(currentExercise.rest);
      setIsResting(true);
    }
  };

  const nextExercise = () => {
    setLog((prev) => [...prev, { name: currentExercise.name, sets: completedSets, reps: currentExercise.reps, weight: currentExercise.weight }]);
    setCompletedSets(0);
    setIsResting(false);
    if (currentIndex + 1 < routine.exercises.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      finishWorkout();
    }
  };

  const finishWorkout = () => {
    const durationMinutes = Math.round((Date.now() - startTime) / 60000);
    saveWorkout({
      routineName: routine.name,
      duration: durationMinutes,
      exercises: [...log, { name: currentExercise.name, sets: completedSets, reps: currentExercise.reps, weight: currentExercise.weight }],
    });
    addNotification("entrenamiento", `Completaste tu entrenamiento de "${routine.name}" 🎉`);
    navigate("/historial");
  };

  if (routine.exercises.length === 0) {
    return (
      <div className="container">
        <p className="empty-state">Esta rutina no tiene ejercicios todavía.</p>
        <Link to={`/rutinas/${routine.id}`} className="btn btn-primary">Agregar ejercicios</Link>
      </div>
    );
  }

  return (
    <div className="container gt-session">
      <h1 className="page-title">{routine.name}</h1>
      <p className="page-subtitle">Ejercicio {currentIndex + 1} de {routine.exercises.length}</p>

      <div className="card-box gt-session__card">
        <h2>{currentExercise.name}</h2>
        <p>{currentExercise.sets} series × {currentExercise.reps} reps — {currentExercise.weight} kg</p>

        {isResting ? (
          <div className="gt-session__rest">
            <span>Descansando</span>
            <strong>{restSeconds}s</strong>
            <button className="btn btn-outline" onClick={() => setIsResting(false)}>Saltar descanso</button>
          </div>
        ) : (
          <>
            <p className="gt-session__progress">Series completadas: {completedSets} / {currentExercise.sets}</p>
            {completedSets < currentExercise.sets ? (
              <button className="btn btn-primary" onClick={completeSet}>Registrar serie</button>
            ) : (
              <button className="btn btn-primary" onClick={nextExercise}>
                {currentIndex + 1 < routine.exercises.length ? "Siguiente ejercicio" : "Finalizar entrenamiento"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default WorkoutSession;

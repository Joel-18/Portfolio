import "./ExerciseCard.css";

function ExerciseCard({ exercise, onAdd, isFavorite, onToggleFavorite }) {
  return (
    <div className="ex-card">
      {onToggleFavorite && (
        <button
          className={`ex-card__fav ${isFavorite ? "ex-card__fav--active" : ""}`}
          onClick={() => onToggleFavorite(exercise.id)}
        >
          ♥
        </button>
      )}
      <div className="ex-card__image-wrapper">
        <img src={exercise.image} alt={exercise.name} loading="lazy" />
      </div>
      <div className="ex-card__body">
        <span className="ex-card__muscle">{exercise.muscle}</span>
        <h3>{exercise.name}</h3>
        <p>{exercise.description}</p>
        <div className="ex-card__meta">
          <span>🎯 {exercise.difficulty}</span>
          <span>🏋️ {exercise.equipment}</span>
        </div>
        {onAdd && (
          <button className="btn btn-primary" style={{ width: "100%", marginTop: 10 }} onClick={() => onAdd(exercise)}>
            Agregar a rutina
          </button>
        )}
      </div>
    </div>
  );
}

export default ExerciseCard;

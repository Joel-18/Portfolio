function Button({ label, onClick, variant = "default", span }) {
  return (
    <button
      className={`calc-btn calc-btn--${variant} ${span ? "calc-btn--span" : ""}`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
}

export default Button;

function Display({ expression, result }) {
  return (
    <div className="calc-display">
      <div className="calc-display__expression">{expression || "0"}</div>
      <div className="calc-display__result">{result}</div>
    </div>
  );
}

export default Display;

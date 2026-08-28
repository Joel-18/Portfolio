import Display from "./components/Display";
import Button from "./components/Button";
import { useCalculator } from "./hooks/useCalculator";

const BUTTONS = [
  { label: "C", variant: "function" },
  { label: "⌫", variant: "function" },
  { label: "÷", variant: "operator" },
  { label: "×", variant: "operator" },
  { label: "7" }, { label: "8" }, { label: "9" }, { label: "-", variant: "operator" },
  { label: "4" }, { label: "5" }, { label: "6" }, { label: "+", variant: "operator" },
  { label: "1" }, { label: "2" }, { label: "3" }, { label: "=", variant: "equals" },
  { label: "0", wide: true }, { label: "." },
];

function App() {
  const { expression, result, handleInput } = useCalculator();

  return (
    <div className="calculator">
      <Display expression={expression} result={result} />
      <div className="calc-grid">
        {BUTTONS.map((btn) => (
          <Button
            key={btn.label}
            label={btn.label}
            variant={btn.variant}
            span={btn.wide}
            onClick={handleInput}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

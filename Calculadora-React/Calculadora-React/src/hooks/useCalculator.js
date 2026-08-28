import { useState } from "react";

const OPERATORS = ["+", "-", "×", "÷"];

function calculate(a, b, operator) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  switch (operator) {
    case "+":
      return numA + numB;
    case "-":
      return numA - numB;
    case "×":
      return numA * numB;
    case "÷":
      return numB === 0 ? "Error" : numA / numB;
    default:
      return numB;
  }
}

export function useCalculator() {
  const [expression, setExpression] = useState("");
  const [current, setCurrent] = useState("0");
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [justEvaluated, setJustEvaluated] = useState(false);

  const inputDigit = (digit) => {
    if (justEvaluated) {
      setCurrent(digit);
      setExpression(digit);
      setJustEvaluated(false);
      return;
    }
    setCurrent((prev) => (prev === "0" ? digit : prev + digit));
    setExpression((prev) => (prev === "" && previous === null ? digit : prev + digit));
  };

  const inputDecimal = () => {
    if (justEvaluated) {
      setCurrent("0.");
      setExpression("0.");
      setJustEvaluated(false);
      return;
    }
    if (!current.includes(".")) {
      setCurrent((prev) => prev + ".");
      setExpression((prev) => prev + ".");
    }
  };

  const chooseOperator = (op) => {
    if (previous !== null && operator && !justEvaluated) {
      const result = calculate(previous, current, operator);
      setPrevious(String(result));
      setExpression(`${result} ${op} `);
    } else {
      setPrevious(current);
      setExpression(`${current} ${op} `);
    }
    setOperator(op);
    setCurrent("0");
    setJustEvaluated(false);
  };

  const evaluate = () => {
    if (operator === null || previous === null) return;
    const result = calculate(previous, current, operator);
    setExpression(`${previous} ${operator} ${current} =`);
    setCurrent(String(result));
    setPrevious(null);
    setOperator(null);
    setJustEvaluated(true);
  };

  const clear = () => {
    setExpression("");
    setCurrent("0");
    setPrevious(null);
    setOperator(null);
    setJustEvaluated(false);
  };

  const deleteLast = () => {
    if (justEvaluated) {
      clear();
      return;
    }
    setCurrent((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    setExpression((prev) => prev.slice(0, -1));
  };

  const handleInput = (label) => {
    if (label === "C") return clear();
    if (label === "⌫") return deleteLast();
    if (label === "=") return evaluate();
    if (OPERATORS.includes(label)) return chooseOperator(label);
    if (label === ".") return inputDecimal();
    return inputDigit(label);
  };

  return { expression, result: current, handleInput };
}

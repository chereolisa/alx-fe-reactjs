import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  const reset = () => {
    setCount(0);
  };

  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      <p
        style={{ color: "#c1db00", fontWeight: "semi-bold", fontSize: "3rem" }}
      >
        Count: {count}
      </p>
      <button onClick={decrement} style={{ margin: "1rem" }}>
        DECREASE
      </button>
      <button onClick={reset} style={{ margin: "1rem" }}>
        RESET
      </button>
      <button onClick={increment} style={{ margin: "1rem" }}>
        INCREASE
      </button>
    </div>
  );
}

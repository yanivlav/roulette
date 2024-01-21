import React, { useState, useRef } from "react";
import "./App.css";

const generateRandomNumber = () => Math.floor(Math.random() * 37);

const App: React.FC = () => {
  const [result, setResult] = useState<number | null>(null);
  const [chips, setChips] = useState<{ [key: number]: number }>({});
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleSpin = () => {
    const randomNumber = generateRandomNumber();
    setResult(randomNumber);
    spinWheel(randomNumber);
  };

  const handleAddChip = (number: number) => {
    setChips((prevChips) => ({
      ...prevChips,
      [number]: (prevChips[number] || 0) + 1,
    }));
  };

  const spinWheel = (randomNumber: number) => {
    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 2s ease-out";
      wheelRef.current.style.transform = `rotate(720deg)`;
      setTimeout(() => {
        wheelRef.current!.style.transition = "none";
        wheelRef.current!.style.transform = "rotate(0deg)";
      }, 2000);
    }
  };

  return (
    <div className="app">
      <h1>Roulette Game</h1>
      <div className="roulette-board">
        {[...Array(37)].map((_, index) => (
          <div
            key={index}
            className={`roulette-number ${
              index === 0 ? "green" : index % 2 === 1 ? "red" : "black"
            }`}
            onClick={() => handleAddChip(index)}
          >
            {index}
            {chips[index] && <div className="chip">{chips[index]}</div>}
          </div>
        ))}
      </div>
      <div className="roulette-wheel" ref={wheelRef}>
        {result !== null && <p className="result">Result: {result}</p>}
        <button onClick={handleSpin}>Spin</button>
      </div>
    </div>
  );
};

export default App;

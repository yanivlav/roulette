import React, { useState, useRef } from "react";
import "./App.css";

const generateRandomNumber = () => Math.floor(Math.random() * 37);

const App: React.FC = () => {
  const [result, setResult] = useState<number | null>(null);
  const [chips, setChips] = useState<{ [key: number]: number }>({});
  const [balance, setBalance] = useState<number>(100); // Initial balance
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleSpin = () => {
    const randomNumber = generateRandomNumber();
    setResult(randomNumber);
    spinWheel(randomNumber);

    // Determine win or loss based on the selected color
    const selectedColor = chips[38] ? "black" : chips[39] ? "red" : null;

    if (
      selectedColor &&
      ((randomNumber % 2 === 1 && selectedColor === "red") ||
        (randomNumber % 2 === 0 && selectedColor === "black"))
    ) {
      // Win
      setBalance((prevBalance) => prevBalance + calculateWinnings(chips));
    } else {
      // Loss
      setBalance((prevBalance) => prevBalance - calculateWager(chips));
    }

    // Clear the placed chips
    setChips({});
  };

  const handleAddChip = (number: number) => {
    setChips((prevChips) => ({
      ...prevChips,
      [number]: (prevChips[number] || 0) + 1,
    }));
  };

  const handleBuyChips = () => {
    // Add 50 chips to the balance when buying
    setBalance((prevBalance) => prevBalance + 50);
  };

  const calculateWager = (chips: { [key: number]: number }): number => {
    // Calculate the total wagered amount
    return Object.keys(chips).reduce(
      (total, number) => total + chips[parseInt(number, 10)] * 5,
      0
    );
  };

  const calculateWinnings = (chips: { [key: number]: number }): number => {
    // Calculate the winnings based on the total wagered amount
    const totalWager = calculateWager(chips);
    return totalWager * 2;
  };

  const spinWheel = (randomNumber: number) => {
    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 2s ease-out";
      wheelRef.current.style.transform = `rotate(${
        720 + (randomNumber * 360) / 37
      }deg)`;
      setTimeout(() => {
        wheelRef.current!.style.transition = "none";
        wheelRef.current!.style.transform = "rotate(0deg)";
      }, 2000);
    }
  };

  return (
    <div className="app">
      <h1>Roulette Game</h1>
      <div className="balance">Balance: {balance} chips</div>
      <button onClick={handleBuyChips}>Buy Chips</button>
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
        <div
          className={`roulette-color black`}
          onClick={() => handleAddChip(38)}
        >
          Black
          {chips[38] && <div className="chip">{chips[38]}</div>}
        </div>
        <div className={`roulette-color red`} onClick={() => handleAddChip(39)}>
          Red
          {chips[39] && <div className="chip">{chips[39]}</div>}
        </div>
      </div>
      <div className="roulette-wheel" ref={wheelRef}>
        {result !== null && <p className="result">Result: {result}</p>}
        <button onClick={handleSpin}>Spin</button>
      </div>
    </div>
  );
};

export default App;

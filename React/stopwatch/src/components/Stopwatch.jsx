import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        console.log(`Time: ${Math.floor(time / 60)}:${time % 60}`);
      }, 10);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

 
  const formatTime = (timeInSec) => {
    const minutes = String(Math.floor(timeInSec / 60)).padStart(2, "0");
    const seconds = String(timeInSec % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">⏱️ Stopwatch</h1>
      <div className="text-5xl font-mono text-blue-600 mb-8">
        {formatTime(time)}
      </div>
      <div className="space-x-4">
        <button
          onClick={handleStart}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Play
        </button>
        <button
          onClick={handlePause}
          className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;

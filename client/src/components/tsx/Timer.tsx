// Inspired by : https://volerelife.wordpress.com/2023/01/03/how-to-create-a-countdown-timer-with-react-hooks-v2/

import React, { useState, useEffect } from "react";
import "../css/Timer.css";

const Stopwatch = () => {
  // state to store time
  const [time, setTime] = useState(0);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: any;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milliseconds using functional update form
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]); // Removed 'time' from the dependency array

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // hundreths of a second calculation
  const hundreths = time % 100;

  // Make timer start and stop 
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Reset time to 0
  const reset = () => {
    setTime(0);
    setIsRunning(false); // Stop the stopwatch when resetting
  };

  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">
        {
            hours > 0 ? 
            `${hours.toString().padStart(2, "0")}h:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
            : `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${hundreths.toString().padStart(2, "0")}`
        }
      </p>
      <div className="stopwatch-buttons">
        <button className="stopwatch-button" onClick={startAndStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="stopwatch-button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
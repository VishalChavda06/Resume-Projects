import { useState, useEffect } from 'react';

const Timer = ({ timeLeft, onTimeUp }) => {
  const [displayTime, setDisplayTime] = useState(timeLeft);

  useEffect(() => {
    setDisplayTime(timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    if (displayTime <= 0) {
      onTimeUp();
      return;
    }

    const timer = setTimeout(() => {
      setDisplayTime(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [displayTime, onTimeUp]);

  const getTimerColor = () => {
    if (displayTime <= 5) return '#ff4444';
    if (displayTime <= 10) return '#ff8800';
    return '#4CAF50';
  };

  return (
    <div className="timer">
      <div 
        className="timer-circle"
        style={{ 
          '--time-left': displayTime,
          '--timer-color': getTimerColor()
        }}
      >
        <span className="timer-text">{displayTime}</span>
      </div>
    </div>
  );
};

export default Timer;

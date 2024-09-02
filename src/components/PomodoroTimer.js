import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';

const PomodoroTimer = () => {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    if (time === 0) {
      clearInterval(interval);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const resetTimer = () => {
    setTime(1500);
    setIsActive(false);
  };

  return (
    <div>
      <Typography variant="h5">
        {`${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`}
      </Typography>
      <Button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Pause' : 'Start'}
      </Button>
      <Button onClick={resetTimer}>
        Reset
      </Button>
    </div>
  );
};

export default PomodoroTimer;

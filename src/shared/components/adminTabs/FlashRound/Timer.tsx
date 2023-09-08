import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

interface TimerProps {
  initialTime: number;
}

const Timer: React.FC<TimerProps> = ({ initialTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeRemaining]);

  const handleReset = () => {
    setTimeRemaining(initialTime);
    setIsRunning(false);
  };

  const handleAddTime = () => {
    setTimeRemaining((prevTime) => prevTime + 5);
  };

  const handleSubstractTime = () => {
    if (timeRemaining > 5){
        setTimeRemaining((prevTime) => prevTime - 5);
    } else {
        setTimeRemaining(0);
    }
  };

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  return (
    <div style={{marginBottom: "20px;"}}>
      <h2 style={{fontFamily: 'Popins', fontSize: '30px;', marginBottom: '10px'}}>Time Remaining: {timeRemaining}s</h2>
      <Grid spacing={4} item xs={12} style={{justifyContent: ' space-around ', display: 'flex', width: '50%', margin: '0 auto'}}>
        
      <Button  variant="contained"   onClick={handleReset}>Reset</Button>
      <Button  variant="contained"  onClick={handleSubstractTime}>Substract 5 seconds</Button>
      <Button  variant="contained"  onClick={handleAddTime}>Add 5 seconds</Button>
      <Button  variant="contained"  onClick={handleStartStop}>{isRunning ? "Stop" : "Start"}</Button>
      </Grid>
    </div>
  );
};

export default Timer;
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import useTimerStore from '../../../../store/timerStore';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';

const Timer = () => {
  const {
    currentTime,
    isRunning,
    isFirstRound,
    startTimer,
    stopTimer,
    setFirstRoundTimer,
    setSecondRoundTimer
  } = useTimerStore();
  const [storedCurrentTime, setStoredCurrentTime] = useLocalStorage('currentTime', currentTime);
  const [storedIsFirstRound, storedSetIsFirstRound] = useLocalStorage('isFirstRound', true);

  useEffect(() => {
    let timer: any;

    if (isRunning) {
      timer = setInterval(() => {
        useTimerStore.getState().tick();
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    setStoredCurrentTime(currentTime);
  }, [currentTime, setStoredCurrentTime]);

  useEffect(() => {
    storedSetIsFirstRound(isFirstRound);
  }, [isFirstRound, storedSetIsFirstRound]);

  const hanldeFirstRound = () => {
    setFirstRoundTimer();
    storedSetIsFirstRound(true);
  };

  const hanldeSecondRound = () => {
    setSecondRoundTimer();
    storedSetIsFirstRound(false);
  };

  return (
    <div style={{ marginBottom: '20px;' }}>
      <h2 style={{ fontFamily: 'Popins', fontSize: '30px;', marginBottom: '10px' }}>
        Time Remaining: {currentTime}s
      </h2>
      <Grid
        spacing={4}
        item
        xs={12}
        style={{ justifyContent: 'space-around', display: 'flex', width: '50%', margin: '0 auto' }}
      >
        <Button variant="contained" onClick={startTimer} disabled={isRunning}>
          Start
        </Button>
        <Button
          variant="contained"
          onClick={stopTimer}
          disabled={!isRunning}
          style={{ marginLeft: '10px' }}
        >
          Stop
        </Button>
        <Button variant="contained" onClick={hanldeFirstRound} style={{ marginLeft: '10px' }}>
          Set First Round Timer
        </Button>
        <Button variant="contained" onClick={hanldeSecondRound} style={{ marginLeft: '10px' }}>
          Set Second Round Timer
        </Button>
      </Grid>
    </div>
  );
};

export default Timer;

import React, { useState, useEffect } from 'react';
import { useAnimationStore } from '../../store/timerStore';

type CountdownTimerProps = {
  seconds: number;
  size: number;
  strokeBgColor: string;
  strokeColor: string;
  strokeWidth: number;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  seconds,
  size,
  strokeBgColor,
  strokeColor,
  strokeWidth
}) => {
  const radius = size / 2;
  const circumference = size * Math.PI;

  const countdownSizeStyles: React.CSSProperties = {
    height: size,
    width: size
  };

  const textStyles: React.CSSProperties = {
    color: strokeColor,
    fontSize: size * 0.3
  };

  const [remainingTime, setRemainingTime] = useState(seconds);
  const { started, setStarted } = useAnimationStore();

  useEffect(() => {
    console.log(started);
  }, [started]);

  useEffect(() => {
    // Create a timer to update the remaining time
    const timer = setInterval(() => {
      // Decrease the remaining time by 1 second
      setRemainingTime((prevRemainingTime) => (prevRemainingTime > 0 ? prevRemainingTime - 1 : 0));
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, [started, seconds]);

  // Calculate the strokeDashoffset based on the remaining time
  const strokeDashoffset = () => {
    if (started) {
      const fractionElapsed = (seconds - remainingTime) / seconds;
      return circumference * (1 - fractionElapsed);
    } else {
      return 0;
    }
  };

  return (
    <div>
      <div
        style={{
          opacity: started ? 0.4 : 1
        }}
      ></div>
      <div style={{ ...styles.countdownContainer, ...countdownSizeStyles }}>
        <p style={textStyles}>{seconds}s</p>
        <svg style={styles.svg}>
          <circle
            cx={radius}
            cy={radius}
            r={radius}
            fill="none"
            stroke={strokeBgColor}
            strokeWidth={strokeWidth}
          ></circle>
        </svg>
        <svg style={styles.svg}>
          <circle
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset()}
            r={radius}
            cx={radius}
            cy={radius}
            fill="none"
            strokeLinecap="round"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          ></circle>
        </svg>
      </div>
    </div>
  );
};

const styles = {
  countdownContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative' as 'relative',
    margin: 'auto'
  },
  svg: {
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transform: 'rotateY(-180deg) rotateZ(-90deg)',
    overflow: 'visible'
  } as React.CSSProperties
};

export default CountdownTimer;

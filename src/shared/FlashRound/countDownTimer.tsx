import React, { useState, useEffect } from 'react';

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

  const [remainingTime, setRemainingTime] = useState(
    localStorage.getItem('startAnimation') ? seconds : 0
  );

  useEffect(() => {
    if (localStorage.getItem('startAnimation') === 'true') {
      const timer = setInterval(() => {
        // Decrease the remaining time by 1 second
        setRemainingTime((prevRemainingTime) =>
          prevRemainingTime > 0 ? prevRemainingTime - 1 : 0
        );
      }, 1000);

      // Clear the interval when component unmounts or when seconds reach 0
      return () => {
        clearInterval(timer);
        if (remainingTime === 0) {
          localStorage.setItem('startAnimation', 'false');
        }
      };
    }
  }, [localStorage.getItem('startAnimation'), remainingTime]);

  // Calculate the strokeDashoffset based on the remaining time
  const strokeDashoffset = () => {
    if (localStorage.getItem('startAnimation') != 'true') {
      return 0; // Full stroke when not started
    }
    const fractionElapsed = remainingTime / seconds;
    return circumference * (1 - fractionElapsed);
  };

  return (
    <div>
      <div
        style={{
          opacity: localStorage.getItem('startAnimation') ? 0.4 : 1
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

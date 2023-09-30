import React from 'react';
import { TIMER_BONUS, TIMER_LENGTH } from "../../utils/constants";

type CountdownTimerProps = {
  seconds: number;
  size: number;
  strokeBgColor: string;
  strokeColor: string;
  strokeWidth: number;
};

const CountDownTimer: React.FC<CountdownTimerProps> = ({
  seconds,
  size,
  strokeBgColor,
  strokeColor,
  strokeWidth
}) => {
  const radius = size / 2;
  const localStorageIsStarted = localStorage.getItem('isStarted')
  const maxSeconds =  localStorage.getItem('isFirstRound') === 'true' ? TIMER_LENGTH : (TIMER_LENGTH+TIMER_BONUS)
  const circumference = size * Math.PI;

  const countdownSizeStyles: React.CSSProperties = {
    height: size,
    width: size
  };

  const textStyles: React.CSSProperties = {
    color: strokeColor,
    fontSize: size * 0.3
  };


  const strokeDashoffset = () => {
    if (localStorageIsStarted != 'true') {
      return 0;
    }
    const fractionElapsed = seconds / maxSeconds;
    console.log(fractionElapsed)
    console.log(circumference, circumference * (1 - fractionElapsed))
    return circumference * (1 - fractionElapsed);
  };

  return (
    <div>
      <div
        style={{
          opacity: localStorageIsStarted ? 0.4 : 1
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

export default CountDownTimer;

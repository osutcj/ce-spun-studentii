import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { styled } from '@mui/material';
import '../static/styles/home.css';
import useFlashRound from '../hooks/useFlashRound';
import { useParams } from 'react-router-dom';
import { FlashRoundAnswers } from '../types/flashRound';
import wrongAnswerSound from '../static/x.mp3';
import { useSounds } from '../hooks/useSounds.hook';
import wrongAnswerPng from '../static/x.png';
import { TIMER_LENGTH, TIMER_BONUS } from '../utils/constants';
import CountDownTimer from '../shared/FlashRound/CountDownTimer';

const FlashRoundClient = () => {
  const [answers, setAnswers] = useState<FlashRoundAnswers[]>([]);
  const [points, setPoints] = useState(0);
  const urlParams = useParams();
  const flash = useFlashRound(urlParams.id || '');
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [currentTime, setCurrentTime] = useState(
    parseInt(localStorage.getItem('currentTime') || '20')
  );

  useEffect(() => {
    const handldeCurrentTimeFromLocalStorage = () => {
      const data = localStorage.getItem('currentTime');
      if (!data) return;
      setCurrentTime(parseInt(data));
    };

    handldeCurrentTimeFromLocalStorage();
    const interval = setInterval(handldeCurrentTimeFromLocalStorage, 500);

    return () => clearInterval(interval);
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    background:
      'linear-gradient(to bottom,#cedbe9 0%,#aac5de 17%, #6199c7 50%, #3a84c3 51%, #419ad6 59%,#4bb8f0 71%, #3A8BC2 84%, #26558B 100%)',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    minHeight: 40,
    maxWidth: 400,
    marginLeft: '15%',
    fontSize: 15
  }));

  useEffect(() => {
    if (flash?.toggleWrongSound === undefined) return;
    // I hate to do this but unless I make the action unusable the first second
    // it will always render the X and play the sound, this was the only workaround I was able to find
    if (isInitialRender) {
      setTimeout(() => {
        setIsInitialRender(false);
      }, 1000);
    } else {
      const audio = new Audio(wrongAnswerSound);
      const { play, stop } = useSounds(audio);

      play(audio);
      setIsPlayingSound(true);

      setTimeout(() => {
        stop(audio);
        setIsPlayingSound(false);
      }, 2000);
    }
  }, [flash?.toggleWrongSound]);

  useEffect(() => {
    if (!flash) {
      return;
    }
    setAnswers(flash.answers);
    computePoints(flash.answers);
  }, [flash]);

  const computePoints = (answers: FlashRoundAnswers[]) => {
    let points = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].points && answers[i].showPoints) {
        points += answers[i].points;
      }
    }
    setPoints(points);
  };

  const indexOfAnswer = (index: number) => {
    const answer = answers[index];

    if (answer === undefined || answer.answer === '') {
      return '';
    }

    if (answers && answers.length > 0 && answers.length > index) {
      return answer.showPoints ? `${answer.answer} - ${answer.points}` : `${answer.answer} `;
    }
    return 'Waiting for answer';
  };

  const RenderWrongAnswers = () => {
    return (
      <Grid item xs={12}>
        <img src={wrongAnswerPng} width={200} height={200} />
      </Grid>
    );
  };

  const RenderCountdownCircle = () => {
    return (
      <CountDownTimer
        seconds={currentTime}
        size={150}
        strokeBgColor="#000000"
        strokeColor="#ffffff"
        strokeWidth={5}
      />
    );
  };

  return (
    <div className={'ce-spun-studentii'}>
      {isPlayingSound && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <RenderWrongAnswers />
        </div>
      )}
      <div className="board-flash">
        <div className="timer">
          {' '}
          <RenderCountdownCircle />{' '}
        </div>

        <div className="tablaRaspunsuri-flash">
          <div className="coloana1">
            <div className="raspunsuri">{indexOfAnswer(0)}</div>
            <div className="raspunsuri">{indexOfAnswer(1)}</div>
            <div className="raspunsuri">{indexOfAnswer(2)}</div>
            <div className="raspunsuri">{indexOfAnswer(3)}</div>
            <div className="raspunsuri">{indexOfAnswer(4)}</div>
          </div>
        </div>
        <div className="puncteRunda-flash"> Total: {points} </div>
      </div>
    </div>
  );
};

export default FlashRoundClient;

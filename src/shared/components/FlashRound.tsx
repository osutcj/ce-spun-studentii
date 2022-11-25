import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { styled } from '@mui/material';
import './styles/home.css';
import useFlashRound from '../../hooks/useFlashRound';
import { useParams } from 'react-router-dom';
import { FlashRoundAnswers } from '../types/flashRound';

const FlashRound = () => {
  const [answers, setAnswers] = useState<FlashRoundAnswers[]>([]);
  const [points, setPoints] = useState(0);

  const urlParams = useParams();

  const flash = useFlashRound(urlParams.id || '');

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
    fontSize: 15,
  }));

  useEffect(() => {
    if (flash) {
      if (flash.currentRound === 1) {
        setAnswers(flash.answers1);
        computePoints(flash.answers1);
      }
      if (flash.currentRound === 2) {
        setAnswers(flash.answers2);
        computePoints(flash.answers2);
      }
    }
  }, [flash]);

  const computePoints = (answers: FlashRoundAnswers[]) => {
    let totalPoints = 0;
    answers.map((answer) => {
      totalPoints += answer.points;
    });
    setPoints(totalPoints);
  };

  const indexOfAnswer = (index: number) => {
    if (
      answers &&
      answers.length > 0 &&
      answers.length > index &&
      answers[index].answer
    ) {
      return `${answers[index].answer} - ${answers[index].points}`;
    }
    return '';
  };

  return (
    <div className={'board'}>
      <Container maxWidth="lg" style={{ paddingTop: 30, paddingBottom: 20 }}>
        <Box sx={{ flexGrow: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="scor" id={'boardScore'}>
              <p style={{ fontSize: 25 }}>{points}</p>
            </div>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Item>{indexOfAnswer(0)}</Item>
            </Grid>
            <Grid item xs={3}></Grid>

            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Item>{indexOfAnswer(1)}</Item>
            </Grid>
            <Grid item xs={3}></Grid>

            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Item>{indexOfAnswer(2)}</Item>
            </Grid>
            <Grid item xs={3}></Grid>

            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Item>{indexOfAnswer(3)}</Item>
            </Grid>
            <Grid item xs={3}></Grid>

            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Item>{indexOfAnswer(4)}</Item>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default FlashRound;

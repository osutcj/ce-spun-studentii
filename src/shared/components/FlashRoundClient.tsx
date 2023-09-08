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

const FlashRoundClient = () => {
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

    if (
      answer === undefined || answer.answer === ''
    ){
      return '';
    }

    if (
      answers &&
      answers.length > 0 &&
      answers.length > index
    ) {
     console.log(index)
      return answer.showPoints ? `${answer.answer} - ${answer.points}` : `${answer.answer} ` ;
    }
    return 'Waiting for answer';
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

export default FlashRoundClient;

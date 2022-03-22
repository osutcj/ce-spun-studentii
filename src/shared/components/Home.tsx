import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
// import '../styles/home.css';
import { ref, onValue } from 'firebase/database';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { styled } from '@mui/material';
import { db } from '../../utils/firebase/firebase';
import { useObjectVal } from 'react-firebase-hooks/database';
import { DB, DBAnswer, DBQuestion, DBTeam } from '../models/db';
import './styles/home.css'

const Home = () => {
  const [currentQuestion, setCurrentQuestion] = useState<DBQuestion>();
  const [answers, setAnswers] = useState<DBAnswer[]>([]);
  const [points, setPoints] = useState(0);
  const [team1, setTeam1] = useState<DBTeam>();
  const [team2, setTeam2] = useState<DBTeam>();


  const Item = styled(Paper)(({ theme }) => ({
    background: 'linear-gradient(to bottom,#cedbe9 0%,#aac5de 17%, #6199c7 50%, #3a84c3 51%, #419ad6 59%,#4bb8f0 71%, #3A8BC2 84%, #26558B 100%)',
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

  const [dbValue] = useObjectVal<DB>(ref(db, '/'));

  const computeTotalPoints = () => {
    if (dbValue) {
      let totalPoints = 0;
      dbValue.questions[dbValue.currentQuestion].answers.map(answer => {
        if (answer.revealed) {
          totalPoints += answer.points;
        }
      });
      setPoints(totalPoints);
    }
  }

  useEffect(() => {
    if (dbValue) {
      if (dbValue.questions[dbValue.currentQuestion]) {
        setCurrentQuestion(dbValue.questions[dbValue.currentQuestion]);
        setAnswers(dbValue.questions[dbValue.currentQuestion].answers);
        computeTotalPoints();
      }
      if (dbValue.team1) {
        setTeam1(dbValue.team1);
      }
      if (dbValue.team2) {
        setTeam2(dbValue.team2);
      }
    }
  }, [dbValue]);

  const indexOfAnswer = (index: number) => {
    if (
      answers !== undefined &&
      answers.length > index &&
      answers[index].revealed
    ) {
      return `${answers[index].text} -  ${answers[index].points}`;
    }
    return '';
  };

  return (
    <div className={'board'}>
      <Container maxWidth="lg" style={{ paddingTop: 30, paddingBottom: 50 }}>
        <Box sx={{ flexGrow: 2 }} >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='scor' id={'boardScore'}>
              <p style={{ fontSize: 25 }}>{points}</p>
            </div>
          </div>
          <div className={'questions'}>
            <h1 className='question'>
              {currentQuestion && currentQuestion.revealed ? currentQuestion.text : 'Coming...'}
            </h1>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>{indexOfAnswer(0)}</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>{indexOfAnswer(1)}</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>{indexOfAnswer(2)}</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>{indexOfAnswer(3)}</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>{indexOfAnswer(4)}</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>{indexOfAnswer(5)}</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>{indexOfAnswer(6)}</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>{indexOfAnswer(7)}</Item>
            </Grid>
          </Grid>
          <div className={'btnHolder'}>
            <div id="awardTeam1" className="button">
              <p>{team1?.name}: {team1?.points}</p>
            </div>
            <div id="awardTeam2" className="button">
              <p>{team2?.name}: {team2?.points}</p>
            </div>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default Home;

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
import { DB } from '../models/db';

const Home = () => {
  const [currentQuestion, setCurrentQuestion] = useState(new Question());
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [points, setPoints] = useState(0);
  const [team1Points, setTeam1Points] = useState(0);
  const [team2Points, setTeam2Points] = useState(0);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#4fc3f7',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 20,
  }));

  const [dbValue] = useObjectVal<DB>(ref(db, '/'));

  useEffect(() => {
    if (dbValue) {
      // if (dbValue.currentQuestion)
    }
  }, [dbValue]);

  // useEffect(() => {
  //   const questions = ref(db, '/questions');
  //   onValue(questions, (snapshot) => {
  //     const data = snapshot.val();
  //     setCurrentQuestion(data.questions[data.currentQuestion]);
  //     setAnswers(
  //       data.currentQuestion >= 0
  //         ? data.questions[data.currentQuestion].answers
  //         : []
  //     );
  //     let totalPoints = 0;
  //     setTeam1Points(data.team1);
  //     setTeam2Points(data.team2);
  //     data.questions[data.currentQuestion].answers.map((ans: Answer) => {
  //       if (ans.revealed) {
  //         totalPoints += ans.points === undefined ? 0 : ans.points;
  //       }
  //     });
  //     if (data.doublePoints) {
  //       totalPoints *= 2;
  //     } else if (data.triplePoints) {
  //       totalPoints *= 3;
  //     }
  //     setPoints(totalPoints);
  //   });
  // }, []);

  const indexOfAnswer = (index: number) => {
    if (
      answers !== undefined &&
      answers.length > index &&
      answers[index].revealed
    ) {
      return answers[index].text;
    }
    return '';
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 2 }}>
        <div
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <Grid container spacing={2}>
            <p>{points}</p>
          </Grid>
        </div>
        <div>
          <h1>
            {currentQuestion.revealed ? currentQuestion.text : 'Coming...'}
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
            <Item></Item>
          </Grid>
          <Grid item xs={6}>
            <Item></Item>
          </Grid>
          <Grid item xs={6}>
            <Item></Item>
          </Grid>
          <Grid item xs={6}>
            <Item></Item>
          </Grid>
        </Grid>
        <div>
          <p>Echipa 1: {team1Points}</p>
        </div>
        <div>
          <p>Echipa 2: {team2Points}</p>
        </div>
      </Box>
    </Container>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { styled } from '@mui/material';
import { DBAnswer, DBQuestion } from '../models/questions';
import { NormalGame } from '../models/game';
import './styles/home.css'
import { useParams } from 'react-router-dom';
import useGame from '../../hooks/useGame';
import QuestionsService from '../../services/questions.service';

const Home = (props: any) => {
  const [currentQuestion, setCurrentQuestion] = useState<DBQuestion>();
  const [questions, setQuestions] = useState<DBQuestion[]>([]);
  const [points, setPoints] = useState(0);

  const urlParams = useParams();

  const game: NormalGame = useGame(urlParams.id || "");

  useEffect(() => {
    QuestionsService.get()
      .then((response: DBQuestion[]) => {
        setQuestions(response);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (game && game.currentQuestion) {
      setCurrentQuestion(findQuestionByName(game.currentQuestion));
    }
    if (game && game.revealedAnswers) {
      computeTotalPoints();
    }
  }, [game]);


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

  const computeTotalPoints = () => {
    if (game) {
      let totalPoints = 0;
      currentQuestion?.answers.map((answer: DBAnswer, index: number) => {
        if (indexOfAnswer(index)) {
          totalPoints += answer.points;
        }
      });

      totalPoints *= game.pointsMultiplier;

      setPoints(totalPoints);
    }
  }

  const indexOfAnswer = (index: number) => {

    if (currentQuestion && game && game.revealedAnswers) {
      const answerRevealed = game.revealedAnswers.find((answerEntry: number) => answerEntry === index);
      if (answerRevealed !== undefined) {
        return currentQuestion.answers[index].answer;
      }
    }
    return '';

  };

  const findQuestionByName = (name: string) => {
    return questions.find((questionEntry: DBQuestion) => questionEntry.text === name);
  }

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
              {game && game.questionRevealed ? game.currentQuestion : 'Coming...'}
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
              <p>{game?.team1?.name}: {game?.team1?.points}</p>
            </div>
            <div id="awardTeam2" className="button">
              <p>{game?.team2?.name}: {game?.team2?.points}</p>
            </div>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default Home;

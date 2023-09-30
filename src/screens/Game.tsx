import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material';
import { DBAnswer, DBQuestion } from '../types/questions';
import { NormalGame } from '../types/game';
import '../static/styles/home.css';
import { useParams } from 'react-router-dom';
import useGame from '../hooks/useGame';
import QuestionsService from '../services/questions.service';
import wrongAnswerPng from '../static/x.png';
import { truncateQuestion } from '../helpers/truncate-question';
import { WRONG_ANSWER_TIME } from '../utils/constants';

const Game = () => {
  const [currentQuestion, setCurrentQuestion] = useState<DBQuestion>();
  const [questions, setQuestions] = useState<DBQuestion[]>([]);
  const [points, setPoints] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);

  const urlParams = useParams();
  const game: NormalGame = useGame(urlParams.id || '');
  const formatedQuestion = truncateQuestion(game.currentQuestion);

  useEffect(() => {
    QuestionsService.get()
      .then((response: DBQuestion[]) => {
        setQuestions(response);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (game?.wrongAnswer === 0) {
      return;
    }
    setWrongAnswers(Math.min(3, game.wrongAnswer));

    setTimeout(() => {
      setWrongAnswers(0);
    }, WRONG_ANSWER_TIME);
  }, [game?.wrongAnswer]);

  useEffect(() => {
    if (game && game.currentQuestion) {
      setCurrentQuestion(findQuestionByName(game.currentQuestion));
    }
    if (game && game.revealedAnswers) {
      computeTotalPoints();
    }
  }, [game]);

  const Item = styled(Paper)(({ theme }: any) => ({
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

  const computeTotalPoints = () => {
    if (!game || !currentQuestion) return;
    let totalPoints = 0;
    currentQuestion?.answers.map((answer: DBAnswer, index: number) => {
      const answerRevealed = game.revealedAnswers.find(
        (answerEntry: number) => answerEntry === index
      );
      if (answerRevealed !== undefined) {
        totalPoints += answer.points;
      }
    });

    totalPoints *= game.pointsMultiplier;

    setPoints(totalPoints);
  };

  const indexOfAnswer = (index: number) => {
    if (currentQuestion === undefined) return;
    if (
      currentQuestion?.answers[index]?.answer === undefined ||
      currentQuestion?.answers[index]?.answer === ''
    ) {
      return '';
    }
    if (currentQuestion && game && game.revealedAnswers) {
      const answerRevealed = game.revealedAnswers.find(
        (answerEntry: number) => answerEntry === index
      );
      if (answerRevealed !== undefined) {
        return `${currentQuestion?.answers[index]?.answer} - ${currentQuestion?.answers[index]?.points}`;
      } else if (index < currentQuestion?.answers?.length) {
        return `${index + 1}`;
      }
    }
    return '';
  };

  const findQuestionByName = (name: string) => {
    return questions.find((questionEntry: DBQuestion) => questionEntry.text === name);
  };

  const RenderWrongAnswers = () => {
    const photos = [];
    for (let i = 0; i < wrongAnswers; i++) {
      photos.push(
        <Grid item xs={12 / wrongAnswers}>
          <img src={wrongAnswerPng} width={200} height={200} />
        </Grid>
      );
    }
    return <Grid container>{photos.map((photo) => photo)}</Grid>;
  };

  return (
    <div className="ce-spun-studentii">
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
      <div className="board">
        <div className="echipa1">
          {game?.team1?.name}: {game?.team1?.points}{' '}
        </div>
        <div className="puncteRunda"> {points} </div>
        <div className="echipa2">
          {game?.team2?.name}: {game?.team2?.points}{' '}
        </div>
      </div>
      <div className="intrebare">
        {game && game.questionRevealed ? formatedQuestion : 'Coming...'}
      </div>
      <div className="tablaRaspunsuri">
        <div className="coloana1">
          <div className="raspunsuri">{indexOfAnswer(0)}</div>
          <div className="raspunsuri"> {indexOfAnswer(1)} </div>
          <div className="raspunsuri">{indexOfAnswer(2)} </div>
          <div className="raspunsuri">{indexOfAnswer(3)} </div>
        </div>

        <div className="coloana2">
          <div className="raspunsuri"> {indexOfAnswer(4)} </div>
          <div className="raspunsuri"> {indexOfAnswer(5)} </div>
          <div className="raspunsuri">{indexOfAnswer(6)} </div>
          <div className="raspunsuri"> {indexOfAnswer(7)} </div>
        </div>
      </div>
    </div>
  );
};

export default Game;

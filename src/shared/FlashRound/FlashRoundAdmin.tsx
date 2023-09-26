import React, { useEffect, useState } from 'react';
import { Container, Button, InputLabel, FormControl, Select, MenuItem, Grid } from '@mui/material';
import { FlashRoundAnswers, FlashRound } from '../../types/flashRound';
import RoundAnswer from './RoundAnswer';
import useFlashRound from '../../hooks/useFlashRound';
import FlashRoundService from '../../services/flash.service';
import { AlertType } from '../../types/game';
import Timer from './Timer';
import round_start from '../../static/round_start.mp3';
import { useSounds } from '../../hooks/useSounds.hook';
import question_revealed from '../../static/question_revealed.mp3';
import wrongAnswerSound from '../../static/x.mp3';

const FlashRoundAdmin = () => {
  const [game, selectGame] = useState<string>('');
  const [flashRounds, setFlashRounds] = useState<FlashRound[]>();
  const [answers, setAnswers] = useState<FlashRoundAnswers[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(5);
  const [resetChild, setResetChild] = useState(false);
  const flash = useFlashRound(game);
  const [alert, setAlerts] = useState<AlertType>({ message: '', errorType: 1 });
  let currentToggle = flash?.toggleWrongSound;
  if (currentToggle === undefined) currentToggle = false;
  const [toggleWrong, setToggleWrong] = useState<boolean>(currentToggle);

  useEffect(() => {
    FlashRoundService.get()
      .then((response) => {
        setFlashRounds(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!flash) {
      return;
    }
    if (flash.answers) {
      setAnswers(flash.answers);
    } else {
      setAnswers(createEmptyTextFields());
    }
  }, [flash]);

  const updateTextFields = (questionIndex: number, newObject: FlashRoundAnswers) => {
    answers[questionIndex] = newObject;
    setAnswers(answers);
  };

  const renderTextFields = () => {
    if (answers.length <= 0) {
      return [];
    }
    let answersArray = [];
    for (let i = 0; i < questionNumber; i++) {
      answersArray.push(
        <Grid container spacing={2} key={i}>
          <Grid item xs={12}>
            <RoundAnswer
              answer={answers[i]?.answer}
              points={answers[i]?.points}
              showPoints={answers[i]?.showPoints}
              updateFields={(newObject: FlashRoundAnswers) => updateTextFields(i, newObject)}
              reset={resetChild}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={() => saveAnswer(i)}>
              Save Answer {i + 1}
            </Button>
          </Grid>
        </Grid>
      );
    }
    return answersArray;
  };

  const saveAnswer = (questionIndex: number) => {
    const answerToSave = answers[questionIndex];
    if (answerToSave.points === undefined && answerToSave.answer !== undefined) {
      answerToSave.points = 0;
    }
    if (
      !(
        answerToSave.answer.length >= 0 &&
        answerToSave.answer.length < 50 &&
        answerToSave.points >= 0 &&
        answerToSave.points < 101
      )
    ) {
      setAlerts({ message: 'Invalid data, check the answer or points', errorType: 0 });
      return;
    }
    FlashRoundService.update(game, {
      ...flash,
      answers: [...answers],
      type: 1
    })
      .then(() => {
        setAlerts({ message: 'Succes', errorType: 1 });
      })
      .catch((error) => {
        console.error(error);
        setAlerts({ message: 'Error saving answer', errorType: 0 });
      });
    if (answerToSave.showPoints === true) {
      playSound(question_revealed, 4000);
    }
  };

  const createEmptyTextFields = () => {
    const fields: FlashRoundAnswers[] = [];
    for (let i = 0; i < 4; i++) {
      fields.push({ answer: '', points: 0, showPoints: false });
    }
    return fields;
  };

  const clearPointsAndAnswers = () => {
    const clearedAnswers = answers.map((answer) => ({
      ...answer,
      answer: '',
      points: 0,
      showPoints: false
    }));

    setAnswers(clearedAnswers);

    FlashRoundService.update(game, {
      ...flash,
      answers: clearedAnswers,
      type: 1
    })
      .then(() => {
        setAlerts({ message: 'Cleared points and answers', errorType: 1 });
        setResetChild(true);
      })
      .catch((error) => {
        console.error(error);
        setAlerts({ message: 'Error clearing points and answers', errorType: 0 });
      });
  };

  const playSound = (audioPath: string, timeout: number) => {
    const audio = new Audio(audioPath);
    const { play, stop } = useSounds(audio);
    play(audio);
    setTimeout(() => {
      stop(audio);
    }, timeout);
    return audio;
  };

  useEffect(() => {
    if (resetChild) {
      const timeout = setTimeout(() => {
        setResetChild(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [resetChild]);

  const setWrong = () => {
    setToggleWrong((prev) => !prev);
    FlashRoundService.update(game, {
      ...flash,
      toggleWrongSound: toggleWrong
    })
      .then(() => {
        playSound(wrongAnswerSound, 5000);
      })
      .catch((error) => {
        console.error(error);
        setAlerts({ message: 'Error when displaying X', errorType: 0 });
      });
  };

  return (
    <Container>
      {game && (
        <p style={{ color: 'black' }}>
          Link-ul pentru accesarea rundei flash:&nbsp;
          <a
            href={`${window.location.origin}/flash/${game}`}
            style={{
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            {`${window.location.origin}/flash/${game}`}
          </a>
        </p>
      )}
      <FormControl fullWidth margin="normal">
        <InputLabel id="game-select-label">Alege runda</InputLabel>
        <Select
          labelId="game-select-label"
          id="game-select"
          value={game}
          label="Joc curent"
          onChange={(event) => selectGame(event.target.value)}
        >
          {flashRounds &&
            flashRounds.map((flashOption, index) => (
              <MenuItem key={index} value={flashOption.id}>
                {flashOption.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {game &&
        renderTextFields().map((field) => {
          return <div>{field}</div>;
        })}
      <div style={{ marginTop: '24px' }}>
        <Timer />
      </div>
      <div style={{ marginTop: '24px' }}>
        <Button variant="outlined" color="info" onClick={() => clearPointsAndAnswers()}>
          Clear Points and Answers
        </Button>
        <Button
          variant="outlined"
          color="info"
          onClick={() => setWrong()}
          style={{ marginLeft: '20px' }}
        >
          Show X
        </Button>
      </div>
      <div style={{ marginTop: 10, width: '100%' }}>
        <Button
          variant="outlined"
          onClick={() => {
            playSound(round_start, 15000);
          }}
        >
          Play intro theme song
        </Button>
      </div>
    </Container>
  );
};

export default FlashRoundAdmin;

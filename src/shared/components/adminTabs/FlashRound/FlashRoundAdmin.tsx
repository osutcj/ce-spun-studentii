import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { EmptyFlashRound } from '../../../models/flash-round';
import { FlashRoundAnswers, FlashRound } from '../../../types/flashRound';
import RoundAnswer from './RoundAnswer';
import useFlashRound from '../../../../hooks/useFlashRound';
import FlashRoundService from '../../../../services/flash.service';
import BasicAlerts from '../BasicAlerts';
import { AlertType } from '../../../types/game';

const FlashRoundAdmin = () => {
  const [game, selectGame] = useState<string>('');
  const [flashRounds, setFlashRounds] = useState<FlashRound[]>();
  const [answers1, setAnswers1] = useState<FlashRoundAnswers[]>([]);
  const [answers2, setAnswers2] = useState<FlashRoundAnswers[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(5)
  const [round, setRound] = useState<number>(1);
  const flash = useFlashRound(game);
  const [alert, setAlerts] = useState<AlertType>({message:'', errorType:1});

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
    if (flash) {
      if (flash.answers1) {
        setAnswers1(flash.answers1);
      } else {
        setAnswers1(createEmptyTextFields());
      }
      if (flash.answers2) {
        setAnswers2(flash.answers2);
      } else {
        setAnswers2(createEmptyTextFields());
      }
    }
  }, [flash]);

  const updateTextFields = (
    round: number,
    questionIndex: number,
    newObject: FlashRoundAnswers
  ) => {
    if (round == 1 && answers1 !== undefined) {
      answers1[questionIndex] = newObject;
      setAnswers1(answers1);
    }
    if (round === 2 && answers2 !== undefined) {
      answers2[questionIndex] = newObject;
      setAnswers2(answers2);
    }
  };

  const renderTextFields = (round: number) => {
    let answersArray = [];
    if (answers1.length > 0 && answers2.length > 0) {
      for (let i = 0; i < questionNumber; i++) {
        if (round === 1) {
          answersArray.push(
            <RoundAnswer
              answer={answers1[i]?.answer}
              points={answers1[i]?.points}
              updateFields={(newObject: FlashRoundAnswers) =>
                updateTextFields(round, i, newObject)
              }
            />
          );
        } else {
          answersArray.push(
            <RoundAnswer
              answer={answers2[i]?.answer}
              points={answers2[i]?.points}
              updateFields={(newObject: FlashRoundAnswers) =>
                updateTextFields(round, i, newObject)
              }
            />
          );
        }
      }
    }
    return answersArray;
  };

  const handleRoundChange = (event: React.SyntheticEvent, newRound: number) => {
    setRound(newRound);
    FlashRoundService.update(game, {
      ...flash,
      currentRound: newRound,
    });
  };

  const saveChanges = () => {
    let allGood = 1;
    let sumPoints = 0;

    if (round == 1) {
      for (let i = 0; i < answers1.length; i++) {
        sumPoints += answers1[i].points;
        if (
          !(
            answers1[i].answer.length >= 0 &&
            answers1[i].answer.length < 50 &&
            answers1[i].points >= 0 &&
            answers1[i].points < 101
          )
        ) {
          allGood = 0;
        }
      }
    } else {
      for (let i = 0; i < answers2.length; i++) {
        sumPoints += answers2[i].points;
        if (
          !(
            answers2[i].answer.length >= 0 &&
            answers2[i].answer.length < 50 &&
            answers2[i].points >= 0 &&
            answers2[i].points < 101
          )
        ) {
          allGood = 0;
        }
      }
    }

    if (sumPoints > 1000) {
      allGood = 0;
    }

    if (allGood) {
      FlashRoundService.update(game, {
        ...flash,
        answers1,
        answers2,
        type: 2,
        currentRound: round,
      }).catch((error) => console.error(error));
      setAlerts({message:"Succes", errorType:1});
    } else {
      setAlerts({message:"Invalid data, check the answer or points", errorType:0});
    }
  };

  const createEmptyTextFields = () => {
    const fields: FlashRoundAnswers[] = [];
    for (let i = 0; i < 4; i++) {
      fields.push(EmptyFlashRound);
    }
    return fields;
  };

  return (
    <Container>
      {alert.message ?  <BasicAlerts message = {alert.message} errorType={alert.errorType} /> : `` }
      {game && (
        <p style={{ color: 'black' }}>
          Link-ul pentru accesarea rundei flash:&nbsp;
          <a
            href={`${window.location.origin}/flash/${game}`}
            style={{
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
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
        renderTextFields(1).map((field) => {
          return <div>{field}</div>;
        })}
      {game && (
        <>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={() => saveChanges()}>
              Salveaza prima runda
            </Button>
          </Grid>

          {renderTextFields(2).map((field) => {
            return <div>{field}</div>;
          })}
          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={() => saveChanges()}>
              Salveaza a doua runda
            </Button>
          </Grid>
          <Grid item xs={12} spacing={4} style={{ margin: 20 }}>
            <ToggleButtonGroup
              color="primary"
              value={round}
              exclusive
              onChange={handleRoundChange}
            >
              <ToggleButton value={1}>Runda 1</ToggleButton>
              <ToggleButton value={2}>Runda 2</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default FlashRoundAdmin;

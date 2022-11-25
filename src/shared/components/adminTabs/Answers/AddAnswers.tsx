import React, { useEffect, useState } from 'react';
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { DBQuestion, DBAnswer } from '../../../types/questions';
import QuestionsService from '../../../../services/questions.service';

const AddAnswers = () => {
  const [questions, setQuestions] = useState<DBQuestion[]>([]);
  const [answers, setAnswers] = useState<DBAnswer[]>([]);

  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    getQuestions();
  }, []);

  async function getQuestions() {
    const databaseQuestions = await QuestionsService.get();

    if (databaseQuestions) {
      setQuestions(databaseQuestions);
    }
  }

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    setSelected(event.target.value);
    setAnswers(questions[parseInt(event.target.value)].answers);
  };

  const handlePoints = (index: number, newValue: number) => {
    if (isNaN(newValue)) {
      return;
    }
    setAnswers((prevAnswers: DBAnswer[]) => {
      return prevAnswers.map((answer, answerIndex) => {
        if (answerIndex === index) {
          return {
            ...answer,
            points: newValue,
          };
        }
        return answer;
      });
    });
  };

  const handleText = (index: number, newValue: string) => {
    setAnswers((prevAnswers: DBAnswer[]) => {
      return prevAnswers.map((answer, answerIndex) => {
        if (answerIndex === index) {
          return {
            ...answer,
            answer: newValue,
          };
        }
        return answer;
      });
    });
  };

  const pushNewAnswer = () => {
    if (answers.length < 8) {
      setAnswers((prevAnswers: DBAnswer[]) => [
        ...prevAnswers,
        {
          answer: '',
          points: 0,
        },
      ]);
    }
  };

  const saveAnswers = async () => {
    await QuestionsService.update(questions[parseInt(selected)].id, {
      ...questions[parseInt(selected)],
      answers,
    });
    getQuestions();
  };

  const deleteItem = async (index: number) => {
    const newAnswers = answers.filter((answer, answerIndex) => {
      if (answerIndex === index) {
        return null;
      }
      return answer;
    });
    await QuestionsService.update(questions[parseInt(selected)].id, {
      ...questions[parseInt(selected)],
      answers: newAnswers,
    });
    setAnswers(newAnswers);
  };

  return (
    <div>
      <Grid container spacing={2} sx={{ width: 1 / 2 }}>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">Intrebare</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selected}
              label="Intrebare"
              onChange={handleChange}
            >
              {questions.map((q: DBQuestion, index) => {
                return (
                  <MenuItem key={index} value={index}>
                    {q.text}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        {answers.map((answer, index) => {
          return (
            <>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id={'R' + index.toString()}
                  label={`Raspuns ${index + 1}`}
                  value={answer.answer}
                  onChange={(event) => handleText(index, event.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  id={'P' + index.toString()}
                  label={`Puncte ${index + 1}`}
                  value={answer.points}
                  onChange={(event) => handlePoints(index, +event.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3} sx={{ width: 1 }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    deleteItem(index);
                  }}
                >
                  Delete
                </Button>
              </Grid>
            </>
          );
        })}

        <Grid item xs={8}>
          <Button variant="outlined" onClick={() => pushNewAnswer()}>
            Adauga un raspuns
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" onClick={() => saveAnswers()}>
            Salveaza
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddAnswers;

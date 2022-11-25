import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import QuestionField from './QuestionField';
import { DBQuestion } from '../../../types/questions';
import QuestionsService from '../../../../services/questions.service';

const Questions = () => {
  const [gameQuestions, setGameQuestions] = useState<DBQuestion[]>([]);

  useEffect(() => {
    async function getGameQuestions() {
      const questions = await QuestionsService.get();

      if (questions) {
        setGameQuestions(questions);
      }
    }
    getGameQuestions();
  }, []);

  const addNewQuestion = async () => {
    const newQuestionId = await QuestionsService.insert({
      text: '',
      answers: [],
      id: '',
    });
    setGameQuestions([
      ...gameQuestions,
      { id: newQuestionId, text: '', answers: [] },
    ]);
  };

  const handleQuestionsUpdate = async () => {
    gameQuestions.forEach(async (question, index) => {
      await QuestionsService.update(question.id, question);
    });
  };

  const deleteItem = (index: number) => {
    setGameQuestions((prevQuestions: DBQuestion[]) => {
      return prevQuestions.filter((question, questionIndex) => {
        if (questionIndex !== index) {
          return question;
        } else {
          QuestionsService.remove(question.id);
        }
      });
    });
  };

  return (
    <Grid container spacing={2} sx={{ width: 1 / 2 }}>
      {gameQuestions.map((q, index) => {
        return (
          <QuestionField
            text={q.text}
            updateQuestionText={(newText: string) => {
              setGameQuestions(
                gameQuestions.map((question) => {
                  if (question.id === q.id) {
                    return {
                      ...q,
                      text: newText,
                    };
                  }
                  return question;
                })
              );
            }}
            deleteItem={() => deleteItem(index)}
          />
        );
      })}
      <Grid item xs={8}>
        <Button variant="outlined" onClick={() => addNewQuestion()}>
          Adauga o intrebare
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button variant="outlined" onClick={() => handleQuestionsUpdate()}>
          Salveaza
        </Button>
      </Grid>
    </Grid>
  );
};

export default Questions;

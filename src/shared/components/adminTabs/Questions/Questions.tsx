import React, { useEffect, useState } from 'react';
import { Button, Grid, Input } from '@mui/material';
import QuestionField from './QuestionField';
import { DBQuestion } from '../../../types/questions';
import QuestionsService from '../../../../services/questions.service';
import convert from '../../../../helpers/csv-convertor.helper';
import convertFirebaseToCsv from '../../../../helpers/firebase-to-csv.helper';

const Questions = () => {
  const [gameQuestions, setGameQuestions] = useState<DBQuestion[]>([]);
  const [fileContent, setFileContent] = useState<string>('');

  let fileReader: FileReader;

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

  const readFileContents = () => {
    const content: string | undefined = fileReader.result?.toString();

    if (!content) {
      return;
    }

    setFileContent(content);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (!fileList) {
      return;
    }
    fileReader = new FileReader();
    fileReader.onloadend = readFileContents;
    fileReader.readAsText(fileList[0]);
  };

  const handleBulkUpdate = async () => {
    if (!fileContent) {
      alert('Prima data trebuie incarcat un fisier');
      return;
    }
    const firestoreData: DBQuestion[] = convert(fileContent);
  
    try {
      await QuestionsService.removeCollection();
  
      const insertPromises = firestoreData.map(async (question) => {
        const questionId = await QuestionsService.insert(question);
        return {
          ...question,
          id: questionId,
        };
      });
  
      const insertedQuestions = await Promise.all(insertPromises);
  
      setGameQuestions(insertedQuestions);
    } catch (error) {
      console.error('Error handling bulk update:', error);
    }
  };
  

  const downloadCSV = () => {
    const csvContent = convertFirebaseToCsv(gameQuestions);

    const file = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = 'ce-spun-studentii.csv';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <Grid container spacing={2} sx={{ width: 1 / 2 }}>
      <Grid item xs={6}>
        <Button variant="outlined" onClick={() => downloadCSV()}>
          Download
        </Button>
      </Grid>
      <Grid item xs={6} style={{ display: 'flex', gap: 5 }}>
        <Input title="CSV" type="file" onChange={handleFileUpload}></Input>
        <Button variant="outlined" onClick={() => handleBulkUpdate()}>
          Upload
        </Button>
      </Grid>
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

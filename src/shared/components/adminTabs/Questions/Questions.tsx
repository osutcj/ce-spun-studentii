import React, { useEffect, useState } from 'react';
import { Question } from '../../../models/question';
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import TextField from '@mui/material/TextField';
import { Button, Grid } from '@mui/material';
import QuestionField from './QuestionField';

let questions: Array<Question> = new Array<Question>();
const Questions = (props: any) => {

    const [newChange, setNewChange] = useState(false);
    const database = getDatabase();

    useEffect(() => {
        const dbQuestions = ref(database, '/');
        onValue(dbQuestions, (snapshot) => {
            const data = snapshot.val();
            if (data.questions !== undefined) {
                questions = data.questions;
                setNewChange(!newChange);
            }
        })
    }, [])



    const addNewQuestion = () => {
        let newQuestions = questions;
        newQuestions.push(new Question());
        setNewChange(!newChange);
    }

    const handleQuestionsUpdate = () => {
        update(ref(database, "/"), {
            questions: questions,
        });
    }

    const deleteItem = (index: number) => {
        questions.splice(index, 1);
        setNewChange(!newChange);
    }


    return (
        <Grid container spacing={2} sx={{ width: 1 / 2 }}>
            {questions.map((q, index) => {
                return (


                    <QuestionField text={q.text} updateQuestionText={(newText: string) => {
                        questions[index].text = newText;
                        setNewChange(!newChange);
                    }} deleteItem={() => deleteItem(index)} />

                )

            })}
            <Grid item xs={8}>
                <Button variant="outlined" onClick={() => addNewQuestion()}>Adauga o intrebare</Button>
            </Grid>
            <Grid item xs={4}>
                <Button variant="outlined" onClick={() => handleQuestionsUpdate()}>Salveaza</Button>
            </Grid>
        </Grid>

    )
}

export default Questions
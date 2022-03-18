import { Select, MenuItem, SelectChangeEvent, InputLabel, FormControl, Grid, TextField, Button } from '@mui/material';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Question } from '../../../models/question';
import { db } from '../../../../utils/firebase/firebase';
import { useObjectVal } from 'react-firebase-hooks/database';
import {DB, DBAnswer, DBQuestion} from '../../../models/db';

const AddAnswers = (props: any) => {


    const [questions, setQuestions] = useState<DBQuestion[]>([]);
    const [newChange, setNewChange] = useState(false);
    const [answers, setAnswers] = useState<DBAnswer[]>([]);

    const [selected, setSelected] = useState('');

    const [dbValue] = useObjectVal<DB>(ref(db, '/'));

    useEffect(() => {
        if (dbValue && dbValue.questions) {
            setQuestions(dbValue.questions);
        }
    }, [dbValue])

    const handleChange = (event: SelectChangeEvent<typeof selected>) => {
        if (dbValue && dbValue.questions) {
            setAnswers(dbValue.questions[+event.target.value].answers);
            setSelected(event.target.value);
        }
    }

    const handlePuncte = (index: number, newValue: number) => {
        const newAnswers = answers.map((answer, answerIndex) => {
            if (answerIndex === index) {
                return {
                    text: answer.text,
                    points: newValue,
                    revealed: answer.revealed,
                }
            }
            return answer;
        })
        setAnswers(newAnswers);
    }

    const handleText = (index: number, newValue: string) => {
        const newAnswers = answers.map((answer, answerIndex) => {
            if (answerIndex === index) {
                return {
                    text: newValue,
                    points: answer.points,
                    revealed: answer.revealed
                }
            }
            return answer;
        });
        setAnswers(newAnswers);
    }

    const pushNewAnswer = () => {
        if (answers.length < 8) {
            //do some stuff
            setAnswers([...answers, {points: 0, text: "", revealed: false}]);
        }
    }

    const saveAnswers = () => {
        update(ref(db, '/questions/' + selected), {
            answers: answers,
        })
    }

    const deleteItem = (index: number) => {
        answers.splice(index, 1);
        setNewChange(!newChange);
    }

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
                                    <MenuItem key={index} value={index}>{q.text}</MenuItem>
                                )
                            })}
                        </Select>

                    </FormControl>
                </Grid>

                {answers.map((answer, index) => {
                    return (
                        <>
                            <Grid item xs={6}>
                                <TextField fullWidth id={"R"+index.toString()} label={`Raspuns ${index+1}`} value={answer.text} onChange={(event) => handleText(index, event.target.value)} variant="outlined" />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField fullWidth id={"P"+index.toString()} label={`Puncte ${index+1}`} value={answer.points} onChange={(event) => handlePuncte(index, +event.target.value)} variant="outlined" />
                            </Grid>
                            <Grid item xs={3} sx={{width: 1}}>
                                <Button variant="outlined" color="error" onClick={() => {
                                    deleteItem(index);
                                }}>Delete</Button>
                            </Grid>
                        </>
                    )
                })}

            <Grid item xs={8}>
                <Button variant="outlined" onClick={() => pushNewAnswer()}>Adauga un raspuns</Button>
            </Grid>
            <Grid item xs={4}>
                <Button variant="outlined" onClick={() => saveAnswers()}>Salveaza</Button>
            </Grid>

            </Grid>


        </div>
    )
}

export default AddAnswers;
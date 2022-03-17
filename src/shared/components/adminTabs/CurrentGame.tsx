import { Button, FormControl, FormControlLabel, Grid, InputLabel, Menu, MenuItem, Select, Switch } from '@mui/material';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Question } from '../../models/question';





const CurrentGame = (props: any) => {

    const database = getDatabase();
    const [questions, setQuestions] = useState(new Array<Question>());
    const [newChange, setNewChange] = useState(false);
    const [selected, setSelected] = useState(1);
    const [curent, setCurent] = useState(new Question());

    const [revealed, setRevealed] = useState(false)

    useEffect(() => {
        const dbQuestions = ref(database, '/');
        onValue(dbQuestions, (snapshot) => {
            const data = snapshot.val();
            if (data.questions !== undefined) {
                setQuestions(data.questions);
                setNewChange(!newChange);
            }
        })

        


    }, [])

    useEffect(() => {
        console.log(selected);
        update(ref(database, "/"), {
            currentQuestion: selected,
        });

        

    }, [selected])

    // useEffect(() => {
    //     console.log(revealed);
    //     //questions[selected].revealed = revealed;
    //     // setRevealed(questions[selected].revealed);

    // }, [selected])

    const handleChange = (event: any) => {
        setSelected((event.target.value));
        setRevealed(questions[selected].revealed);
        
    }

    const handleRevealedChange = (event: any) => {
        setRevealed(event.target.checked);
        questions[selected].revealed = !revealed;

        update(ref(database, "/"), {
            questions: questions,
        });

    }



    return (
        <Grid container spacing={2} sx={{ width: 1 / 2 }}>
            <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="demo-simple-select-label">Intrebare</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selected}
                        label="Numar Intrebare"
                        onChange={handleChange}

                    >
                        {questions.map((q: Question, index) => {
                            return (
                                <MenuItem key={index} value={index}>{q.text}</MenuItem>
                            )

                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset" variant="standard">
                    <FormControlLabel
                        control={
                            <Switch checked={revealed} onChange={handleRevealedChange} name="revealed" />
                        }
                        label="Question Revealed"
                    />
                </FormControl>
            </Grid>


        </Grid>
    )
}

export default CurrentGame;
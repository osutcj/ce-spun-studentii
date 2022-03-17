import { Select, MenuItem, SelectChangeEvent, InputLabel, FormControl, Grid, TextField } from '@mui/material';
import { getDatabase, ref, onValue } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Question } from '../../../models/question';



let questions: Array<Question> = new Array<Question>();


const AddAnswers = (props: any) => {

    const database = getDatabase();
    const [questions, setQuestions] = useState([]);
    const [newChange, setNewChange] = useState(false);

    const [selected, setSelected] = useState('');
    

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

    const handleChange = (event: SelectChangeEvent<typeof selected>) => {
        setSelected(event.target.value);
        console.log(event.target.value);
    }

    const handlePuncte = (event: any) => {
        console.log(event.target.id)
    }

    const handleText = (event: any) => {
        console.log(event.target.id)
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
                            {questions.map((q: Question, index) => {
                                return (
                                    <MenuItem key={index} value={index}>{q.text}</MenuItem>
                                )
                            })}
                        </Select>

                    </FormControl>
                </Grid>
                <Grid item xs={8}>
                    <TextField fullWidth id="1" label="Raspuns 1" onChange={handleText} variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    <TextField fullWidth id="1" label="Puncte 1" onChange={handlePuncte} variant="outlined" />
                </Grid>
                
                <Grid item xs={8}>
                    <TextField fullWidth id="2" label="Raspuns 2" onChange={handleText} variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    <TextField fullWidth id="2" label="Puncte 2" onChange={handlePuncte} variant="outlined" />
                </Grid>

                <Grid item xs={8}>
                    <TextField fullWidth id="3" label="Raspuns 3" onChange={handleText} variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    <TextField fullWidth id="3" label="Puncte 3" onChange={handlePuncte} variant="outlined" />
                </Grid>

                <Grid item xs={8}>
                    <TextField fullWidth id="4" label="Raspuns 4" onChange={handleText} variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    <TextField fullWidth id="4" label="Puncte 4" onChange={handlePuncte} variant="outlined" />
                </Grid>


                <Grid item xs={8}>
                    <TextField fullWidth id="5" label="Raspuns 5" onChange={handleText} variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    <TextField fullWidth id="5" label="Puncte 5" onChange={handlePuncte} variant="outlined" />
                </Grid>

                
                <Grid item xs={8}>
                    <TextField fullWidth id="6" label="Raspuns 6" onChange={handleText}variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    <TextField fullWidth id="6" label="Puncte 6" onChange={handlePuncte} variant="outlined" />
                </Grid>

                
                <Grid item xs={8}>
                    <TextField fullWidth id="7" label="Raspuns 7" onChange={handleText} variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    <TextField fullWidth id="7" label="Puncte 7" onChange={handlePuncte} variant="outlined" />
                </Grid>

                
                <Grid item xs={8}>
                    <TextField fullWidth id="8" label="Raspuns 8" onChange={handleText} variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    <TextField fullWidth id="8" label="Puncte 8" onChange={handlePuncte} variant="outlined" />
                </Grid>

            </Grid>


        </div>
    )
}

export default AddAnswers;
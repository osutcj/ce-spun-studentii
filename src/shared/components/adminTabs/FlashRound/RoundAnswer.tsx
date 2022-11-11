import React, { useEffect, useState } from 'react';
import { Container, Grid, TextField, Button } from '@mui/material';

const RoundAnswer = (props: any) => {
    const { updateFields } = props;

    const [answer, setAnswer] = useState('');
    const [points, setPoints] = useState(0);

    useEffect(() => {
        if (props.answer) {
            setAnswer(props.answer);
        }
        if (props.points) {
            setPoints(props.points);
        }
    }, []);


    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Raspuns"
                        variant="standard"
                        value={answer}
                        onChange={(e) => {
                            setAnswer(e.target.value);
                            updateFields({ answer: e.target.value, points: points })
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Puncte"
                        variant="standard"
                        value={points}
                        onChange={(e) => {
                            setPoints(e.target.value);
                            updateFields({ answer: answer, points: +e.target.value })
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

export default RoundAnswer;
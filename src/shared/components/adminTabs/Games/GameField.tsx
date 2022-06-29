import React from 'react';
import { Grid, TextField, Button } from '@mui/material';

function GameField(props: any) {
    const { name, changeText, onDelete } = props;

    return (
        <>
            <Grid item xs={8} >
                <TextField id="outlined-basic"
                    sx={{ width: 1 }}
                    label=""
                    variant="outlined"
                    value={name}
                    onChange={(event) => {
                        changeText(event.target.value);
                    }} />
            </Grid>
            <Grid item xs={4} sx={{ width: 1 }}>
                <Button variant="outlined" color="error" onClick={() => {
                    onDelete();
                }}>Delete</Button>
            </Grid>
        </>
    )
}

export default GameField;
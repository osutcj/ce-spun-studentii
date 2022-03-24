import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Question } from '../../../models/question';
import { Button, Grid } from '@mui/material';

const QuestionField = (props: any) => {
    const { text, updateQuestionText, deleteItem } = props;
    return (
        <>
            <Grid item xs={8} >
                <TextField id="outlined-basic" sx={{width: 1}}  label="" variant="outlined" value={text}
                    onChange={(event) => {
                        updateQuestionText(event.target.value);
                    }} />
            </Grid>
            <Grid item xs={4} sx={{width: 1}}>
                <Button variant="outlined" color="error" onClick={() => {
                    deleteItem();
                }}>Delete</Button>
            </Grid>
        </>

    )
}

export default QuestionField;
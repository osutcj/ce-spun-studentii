import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Question } from '../../../models/question';
import { Button } from '@mui/material';

const QuestionField = (props : any) => {
    const {text, updateQuestionText, deleteItem} = props;
    return (
        <>
            <TextField id="filled-basic" label="Filled" variant="filled" value={text} 
            onChange={(event) => {
                updateQuestionText(event.target.value);
            }} />
            <Button style={{color: 'red'}} onClick={() => {
                deleteItem();
            }}>Delete</Button>
        </>
        
    )
}

export default QuestionField;
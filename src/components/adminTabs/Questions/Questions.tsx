import React, { useEffect, useState } from 'react';
import { Question } from '../../../models/question';
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import QuestionField from './QuestionField';

let questions:Array<Question> = new Array<Question>();
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
        console.log(questions);
        update(ref(database, "/"), {
            questions:questions,
        });
    }

    const deleteItem = (index : number) => {
        questions.splice(index, 1);
        setNewChange(!newChange);
    }


    return (
        <div>
            {questions.map((q, index) => {
                return (
                    <div style={{margin: 10}}>
                        <QuestionField text={q.text} updateQuestionText={(newText:String) => {
                            questions[index].text = newText;
                            setNewChange(!newChange);
                        }} deleteItem={() => deleteItem(index)} />
                    </div>
                )
                
            })}
            <Button style={{margin: 10}} variant="contained" onClick={() => addNewQuestion()}>Adauga o intrebare</Button>
            <Button style={{margin: 10}} variant="contained" onClick={() => handleQuestionsUpdate()}>Salveaza</Button>
        </div>

    )
}

export default Questions
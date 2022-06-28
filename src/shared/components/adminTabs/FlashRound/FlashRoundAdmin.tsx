import React, { useEffect, useState } from 'react';
import { Container, Grid, TextField, Button } from '@mui/material';
import { ref, update } from 'firebase/database';
import { useObjectVal } from 'react-firebase-hooks/database';
import { db } from '../../../../utils/firebase/firebase';
import { DB, FlashRound, FlashRoundAnswers } from '../../../models/db';
import RoundAnswer from './RoundAnswer';

const FlashRoundAdmin = () => {

    const [newChange, setNewChange] = useState(false);
    const [answers1, setAnswers1] = useState<FlashRoundAnswers[]>();
    const [answers2, setAnswers2] = useState<FlashRoundAnswers[]>();

    const [dbValue] = useObjectVal<DB>(ref(db, '/'));

    useEffect(() => {
        if (dbValue) {
            setAnswers1(dbValue.flash.answers1);
            setAnswers2(dbValue.flash.answers2);
        }
    }, [dbValue]);

    const updateTextFields = (round: number, questionIndex: number, newObject: FlashRoundAnswers) => {
        if (round == 1 && answers1 !== undefined) {
            answers1[questionIndex] = newObject;
        }
        if (round === 2 && answers2 !== undefined) {
            answers2[questionIndex] = newObject;
        }
    }

    const renderTextFields = (round: number) => {
        let answersArray = [];
        if (answers1 && answers2) {
            for (let i = 0; i < 4; i ++) {
                if (round === 1) {
                    answersArray.push(<RoundAnswer answer={answers1[i].answer} points={answers1[i].points} updateFields={(newObject: FlashRoundAnswers) => updateTextFields(round, i, newObject)} />)
                }
                else {
                    answersArray.push(<RoundAnswer answer={answers2[i].answer} points={answers2[i].points} updateFields={(newObject: FlashRoundAnswers) => updateTextFields(round, i, newObject)} />)
                }
            }
        }
        return answersArray;
    }


    const saveChanges = (round: number) => {
        update(ref(db, '/flash'), {answers1, answers2});
    }

    return (
        <Container>
            {renderTextFields(1).map(field => {
                return (
                    <div>
                        {field}
                    </div>
                )
            })}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => saveChanges(1)}
              >
                Salveaza prima runda
              </Button>
            </Grid>

            {renderTextFields(1).map(field => {
                return (
                    <div>
                        {field}
                    </div>
                )
            })}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => saveChanges(2)}
              >
                Salveaza a doua runda
              </Button>
            </Grid>
        </Container>
    )
}

export default FlashRoundAdmin;
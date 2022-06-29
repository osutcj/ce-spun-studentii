import React, { useEffect, useState } from 'react';
import { Container, Grid, Button, InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import { EmptyFlashRoundAnswer, FlashRound } from '../../../models/flash-round';
import { FlashRoundAnswers } from '../../../models/flash-round';
import RoundAnswer from './RoundAnswer';
import useFlashRound from '../../../../hooks/useFlashRound';
import FlashRoundService from '../../../../services/flash.service';

const FlashRoundAdmin = () => {

    const [game, selectGame] = useState<string>("");
    const [flashRounds, setFlashRounds] = useState<FlashRound[]>();
    const [answers1, setAnswers1] = useState<FlashRoundAnswers[]>([]);
    const [answers2, setAnswers2] = useState<FlashRoundAnswers[]>([]);
    const flash = useFlashRound(game);


    useEffect(() => {
        FlashRoundService.get()
            .then(response => {
                setFlashRounds(response);
            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    useEffect(() => {
        if (flash) {
            console.log(flash);
            if (flash.answers1) {
                console.log(flash.answers1);
                setAnswers1(flash.answers1);
            }
            else {
                setAnswers1(createEmptyTextFields());
            }
            if (flash.answers2) {
                setAnswers2(flash.answers2);
            }
            else {
                setAnswers2(createEmptyTextFields());
            }
        }
    }, [flash])

    const updateTextFields = (round: number, questionIndex: number, newObject: FlashRoundAnswers) => {
        if (round == 1 && answers1 !== undefined) {
            answers1[questionIndex] = newObject;
            setAnswers1(answers1);
        }
        if (round === 2 && answers2 !== undefined) {
            answers2[questionIndex] = newObject;
            setAnswers2(answers2);
        }
    }

    const renderTextFields = (round: number) => {
        let answersArray = [];
        console.log(answers1);
        if (answers1.length > 0 && answers2.length > 0) {
            for (let i = 0; i < 4; i++) {
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


    const saveChanges = () => {
        console.log(answers1);
        console.log(answers2);
        FlashRoundService.update(game, {
            id: game,
            answers1,
            answers2,
            type: 2,
            currentRound: 1,
        })
            .catch(error => console.error(error));
    }

    const createEmptyTextFields = () => {
        const fields: FlashRoundAnswers[] = [];
        for (let i = 0; i < 4; i++) {
            fields.push({
                points: 0,
                answer: ""
            });
        }
        return fields;
    }

    return (
        <Container>
            {game && <p style={{ color: 'black' }}>Link-ul pentru accesarea rundei flash:&nbsp;
                <a href={`${window.location.origin}/flash/${game}`} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                    {`${window.location.origin}/flash/${game}`}
                </a>
            </p>}
            <FormControl fullWidth margin="normal">
                <InputLabel id="game-select-label">Alege runda</InputLabel>
                <Select
                    labelId="game-select-label"
                    id="game-select"
                    value={game}
                    label="Joc curent"
                    onChange={(event) => selectGame(event.target.value)}
                >
                    {flashRounds && flashRounds.map((flashOption, index) => (
                        <MenuItem key={index} value={flashOption.id}>{flashOption.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {game && renderTextFields(1).map(field => {
                return (
                    <div>
                        {field}
                    </div>
                )
            })}
            {game && (
                <>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => saveChanges()}
                        >
                            Salveaza prima runda
                        </Button>
                    </Grid>

                    {renderTextFields(2).map(field => {
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
                            onClick={() => saveChanges()}
                        >
                            Salveaza a doua runda
                        </Button>
                    </Grid>
                </>
            )}
        </Container>
    )
}

export default FlashRoundAdmin;
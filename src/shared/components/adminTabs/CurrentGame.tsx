import { Button, FormControl, FormControlLabel, Grid, InputLabel, Menu, MenuItem, Paper, Select, Switch } from '@mui/material';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Question } from '../../models/question';
import { db } from '../../../utils/firebase/firebase';
import { useObjectVal } from 'react-firebase-hooks/database';

import QuestionsService from '../../../services/questions.service';
import { DBAnswer, DBQuestion } from '../../models/questions';

import useGame from '../../../hooks/useGame';
import GamesService from '../../../services/games.service';
import { NormalGame } from '../../models/game';

const CurrentGame = (props: any) => {

    const [questions, setQuestions] = useState<DBQuestion[]>([]);
    const [revealed, setRevealed] = useState(false)
    const [selected, setSelected] = useState<any>(-1);
    const [selectedGame, setSelectedGame] = useState("");

    const [doublePoints, setDoublePoints] = useState(false);
    const [triplePoints, setTriplePoints] = useState(false);

    const [gamesList, setGamesList] = useState<NormalGame[]>([]);

    const game: NormalGame = useGame(selectedGame || "");

    useEffect(() => {
        QuestionsService.get()
            .then(response => {
                setQuestions(response);
            })
            .catch(error => console.error(error));

        GamesService.get()
            .then(response => {
                setGamesList(response);
            })
            .catch(error => console.error(error));
    }, [])

    const resetDbValues = (newQuestion: string) => {
        GamesService.update(selectedGame, {
            ...game,
            currentQuestion: newQuestion,
            questionRevealed: false,
            revealedAnswers: [],
            wrongAnswer: 0,
        });
    }

    const resetStates = () => {
        setSelected(undefined);
        setDoublePoints(false);
        setTriplePoints(false);
        setRevealed(false);
        resetDbValues("");
    }

    const handleChange = (event: any) => {
        resetDbValues(questions[event.target.value].text);
        setSelected(event.target.value);
        setRevealed(false);
    }

    const handleGameChange = (event: any) => {
        setSelectedGame(event.target.value);
        resetStates();
    }

    const handleRevealedChange = (event: any) => {
        setRevealed(event.target.checked);
        GamesService.update(selectedGame, {
            ...game,
            questionRevealed: event.target.checked
        });

    }

    const handleRevealAnswer = (event: any, index: number) => {
        const revealedAnswers = game.revealedAnswers;
        if (event.target.checked) {
            revealedAnswers.push(index);
        }
        else {
            revealedAnswers.splice(revealedAnswers.indexOf(index), 1);
        }

        GamesService.update(selectedGame, {
            ...game,
            revealedAnswers
        });
    }

    const addPointsToTeam = (teamNumber: number) => {

        let points = 0;
        questions[selected].answers.map((answer, index) => {
            if (game.revealedAnswers.find((revealedAnswer: number) => revealedAnswer === index) !== undefined) {
                points += answer.points;
            }
        })

        if (doublePoints) {
            points *= 2;
        }
        if (triplePoints) {
            points *= 3;
        }

        if (teamNumber === 1) {
            points += game.team1.points;
            GamesService.update(selectedGame, {
                ...game,
                revealedAnswers: [],
                currentQuestion: "",
                team1: {
                    name: game.team1.name,
                    points
                }
            });
        }
        if (teamNumber === 2) {
            points += game.team2.points;
            GamesService.update(selectedGame, {
                ...game,
                revealedAnswers: [],
                currentQuestion: "",
                team2: {
                    name: game.team2.name,
                    points
                }
            })
        }

        setSelected(undefined);
        setDoublePoints(false);
        setTriplePoints(false);
        setRevealed(false);
    }


    const handlePointsMultiplier = (event: any, type: number) => {
        const checkedValue = event.target.checked;
        if (type === 1) {
            setDoublePoints(checkedValue);
            setTriplePoints(false);
            GamesService.update(selectedGame, {
                ...game,
                pointsMultiplier: checkedValue ? 2 : 1
            })
        }
        else {
            setDoublePoints(false);
            setTriplePoints(checkedValue);
            GamesService.update(selectedGame, {
                ...game,
                pointsMultiplier: checkedValue ? 3 : 1
            })
        }
    }

    const isAnswerRevealed = (answerIndex: number) => {
        return game.revealedAnswers.find((answer: number) => {
            return answerIndex === answer;
        }) !== undefined;
    }

    const wrongAnswer = () => {
        GamesService.update(selectedGame, {
            ...game,
            wrongAnswer: game.wrongAnswer + 1
        });
    }


    return (
        <Grid container spacing={2} sx={{ width: 1 / 2 }}>
            <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="game-select-label">Joc curent</InputLabel>
                    <Select
                        labelId="game-select-label"
                        id="game-select"
                        value={selectedGame}
                        label="Joc curent"
                        onChange={handleGameChange}
                    >
                        {gamesList.map((gameOption, index) => (
                            <MenuItem key={index} value={gameOption.id}>{gameOption.name}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
                {selectedGame ? (
                    <>
                        <p style={{ color: 'black' }}>Link-ul pentru jocul curent: &nbsp;
                            <a style={{ color: 'blue', textDecoration: 'underline' }} href={`${window.location.origin}/${selectedGame}`}>
                                {`${window.location.origin}/${selectedGame}`}
                            </a>
                        </p>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">Intrebare</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selected}
                                label="Numar Intrebare"
                                onChange={handleChange}
                            >
                                {questions.map((q: DBQuestion, index) => {
                                    return (
                                        <MenuItem key={index} value={index}>{q.text}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </>
                ) : null}
            </Grid>

            {
                selectedGame && selected !== undefined ? (
                    <Grid item xs={12}>
                        <FormControl component="fieldset" variant="standard">
                            <FormControlLabel
                                control={
                                    <Switch checked={revealed} onChange={handleRevealedChange} name="revealed" />
                                }
                                label="Afiseaza intrebarea"
                            />
                        </FormControl>
                    </Grid>
                ) : null
            }

            {
                questions[selected] && selectedGame ? questions[selected].answers.map((answer, index) => {
                    return (
                        <Grid container spacing={2} key={index}>
                            <Grid item xs={8}>
                                <Paper style={{ backgroundColor: '#ededed', padding: 10, margin: 5 }}>
                                    <p style={{ textAlign: 'left' }}>{answer.answer}</p>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl component="fieldset" variant="standard">
                                    <FormControlLabel
                                        control={
                                            <Switch checked={isAnswerRevealed(index)} onChange={(event) => handleRevealAnswer(event, index)} name="revealed" />
                                        }
                                        label="Revealed"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    )
                }) : null
            }

            {
                selectedGame && selected !== undefined ? (
                    <>
                        <FormControl component="fieldset" variant="standard">
                            <FormControlLabel
                                control={
                                    <Switch checked={doublePoints} onChange={(event) => { handlePointsMultiplier(event, 1) }} name="revealed" />
                                }
                                label="Puncte duble"
                            />
                        </FormControl>

                        <FormControl component="fieldset" variant="standard">
                            <FormControlLabel
                                control={
                                    <Switch checked={triplePoints} onChange={(event) => { handlePointsMultiplier(event, 2) }} name="revealed" />
                                }
                                label="Puncte triple"
                            />
                        </FormControl>

                        <div style={{ marginTop: 10, width: '100%' }}>
                            <Button color='error' variant='outlined' onClick={wrongAnswer}>Raspuns gresit</Button>
                        </div>

                        <div style={{ marginTop: 10, width: '100%' }}>
                            <h2>Adauga puncte la:</h2>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button variant="outlined" onClick={() => addPointsToTeam(1)}>{game?.team1.name}</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="outlined" onClick={() => addPointsToTeam(2)}>{game?.team2.name}</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </>
                ) : null
            }

        </Grid >
    )
}

export default CurrentGame;
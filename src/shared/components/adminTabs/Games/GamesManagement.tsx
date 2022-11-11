import { Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import GamesService from "../../../../services/games.service";
import { EmptyGame, NormalGame } from "../../../models/game";
import GameField from "./GameField";

function GamesManagement() {

    const [games, setGames] = useState<NormalGame[]>([]);
    const [newChange, setNewChange] = useState<boolean>(false);

    useEffect(() => {
        getAllGames();
    }, []);

    const getAllGames = () => {
        GamesService.get()
            .then(response => {
                setGames(response)
            })
            .catch(error => console.error(error));
    }

    const addNewGame = () => {
        GamesService.insert(EmptyGame)
            .then((response) => {
                setGames([...games, {
                    ...EmptyGame,
                    id: response.id,
                }]);
            })
            .catch(error => console.error(error));
    }

    const deleteGame = (item: NormalGame) => {
        setGames([...games.filter(game => game !== item)]);
        GamesService.remove(item.id)
            .then(() => {
                getAllGames();
            })
            .catch(error => console.error(error));
    }

    const handleFieldChange = (newText: string, item: NormalGame) => {
        setGames([...games.map(game => {
            if (game === item) {
                return {
                    ...game,
                    name: newText,
                }
            }
            return game;
        })])
    }

    function areDistinct(arr)
    {
        let n = arr.length;
    
        // Put all array elements in a map
        let s = new Set();
        for (let i = 0; i < n; i++) {
            s.add(arr[i]);
        }
    
        // If all elements are distinct, size of
        // set should be same array.
        return (s.size == arr.length);
    }

    const handleGameUpdate = () => {
        games.map(game => {
            console.log(game.name)
            if (game.name == ""){
                GamesService.remove(game.id)
            }
        })
        let names = [];
        let k = 0;
        for (let game of games){
            names[k] = game.name;
            k++;
        }
        if (areDistinct(names)){
            games.map(game => {
                GamesService.update(game.id, game)
                    .catch(error => console.error(error));
            })  
        } else {
            alert("Numele se repeta!");
        }

    }

    return (
        <Container>
            <Grid container spacing={2} sx={{ width: 1 / 2 }}>
                {games.length > 0 && games.map(game => (
                    <>
                        <GameField name={game.name} changeText={(text: string) => handleFieldChange(text, game)} onDelete={() => deleteGame(game)} />
                    </>
                ))}
                <Grid item xs={8}>
                    <Button variant="outlined" onClick={() => addNewGame()}>Adauga un joc nou</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="outlined" onClick={() => handleGameUpdate()}>Salveaza</Button>
                </Grid>
            </Grid>

        </Container>
    )
}

export default GamesManagement;
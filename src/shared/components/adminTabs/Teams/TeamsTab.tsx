import { Button, FormControl, FormControlLabel, Grid, InputLabel, Menu, MenuItem, Paper, Select, Switch, Container, TextField } from '@mui/material';
import { ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useObjectVal } from 'react-firebase-hooks/database';
import GamesService from '../../../../services/games.service';
import { db } from '../../../../utils/firebase/firebase';
import { DB } from '../../../models/db';
import { EmptyGame, NormalGame } from '../../../models/game';

const Teams = () => {

  const [games, setGames] = useState<NormalGame[]>([]);
  const [team1Name, setTeam1Name] = useState<string>("");
  const [team2Name, setTeam2Name] = useState<string>("");
  const [currentGame, setCurrentGame] = useState<string>("");

  const [team1Points, setTeam1Points] = useState<number>(0);
  const [team2Points, setTeam2Points] = useState<number>(0);


  useEffect(() => {
    updateGamesList();
  }, []);

  useEffect(() => {
    const currentGameItem = games.find(item => item.id === currentGame) || EmptyGame;
    setTeam1Name(currentGameItem.team1.name);
    setTeam1Points(currentGameItem.team1.points);
    setTeam2Name(currentGameItem.team2.name);
    setTeam2Points(currentGameItem.team2.points);
  }, [currentGame]);

  const updateGamesList = () => {
    GamesService.get()
      .then(response => {
        setGames(response);
      })
      .catch(error => console.error(error));
  }

  const saveChanges = () => {
    const currentGameItem = games.find(item => item.id === currentGame);

    if (team1Name.length > 1 && team1Name.length < 40 && team1Points >= 0 && team1Points < 3000 && team2Name.length > 1 && team2Name.length < 40 && team2Points >= 0 && team2Points < 3000) {
      GamesService.update(currentGame, {
        ...currentGameItem,
        team1: {
          name: team1Name,
          points: team1Points
        },
        team2: {
          name: team2Name,
          points: team2Points
        }
      })
        .then(() => updateGamesList())
        .catch(error => console.error(error));

      alert("Succes!")
    } else {
      alert("Nume sau puncte invalide!")
    }

  }


  const handleGameChange = (event: any) => {
    setCurrentGame(event.target.value);
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">Selecteaza Jocul</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentGame}
              label="Selectare joc"
              onChange={handleGameChange}
            >
              {games.length > 0 && games.map(game => (
                <MenuItem key={game.id} value={game.id}>{game.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Numele echipei 1"
            variant="standard"
            value={team1Name}
            onChange={(e) => setTeam1Name(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Punctele echipei 1"
            variant="standard"
            value={team1Points}
            onChange={(e) => setTeam1Points(e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Numele echipei 2"
            variant="standard"
            value={team2Name}
            onChange={(e) => setTeam2Name(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Punctele echipei 2"
            variant="standard"
            value={team2Points}
            onChange={(e) => setTeam2Points(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={saveChanges}
          >
            Salveaza
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Teams;
import { Button, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GamesService from '../../../../services/games.service';
import { NormalGame } from '../../../types/game';
import GameField from './GameField';
import { EmptyGame } from '../../../models/game';

function GamesManagement() {
  const [games, setGames] = useState<NormalGame[]>([]);
  const [localChanges, setLocalChanges] = useState<Record<string, any>>({});

  useEffect(() => {
    getAllGames();
  }, []);

  const getAllGames = () => {
    GamesService.get()
      .then((response) => {
        setGames(response);
      })
      .catch((error) => console.error(error));
  };

  const addNewGame = () => {
    GamesService.insert(EmptyGame)
      .then((response) => {
        setGames([
          ...games,
          {
            ...EmptyGame,
            id: response.id
          }
        ]);
      })
      .catch((error) => console.error(error));
  };

  const deleteGame = (item: NormalGame) => {
    setGames([...games.filter((game) => game !== item)]);
    GamesService.remove(item.id)
      .then(() => {
        getAllGames();
      })
      .catch((error) => console.error(error));
  };

  const handleFieldChange = (newText: string, item: NormalGame, fieldName: string) => {
    setLocalChanges({
      ...localChanges,
      [item.id]: {
        ...localChanges[item.id],
        [fieldName]: newText === '' ? null : newText
      }
    });
  };

  const handleGameQuestionsCapacityChange = (newValue: string, item: NormalGame) => {
    setLocalChanges({
      ...localChanges,
      [item.id]: {
        ...localChanges[item.id],
        questionsCapacity: newValue === '' ? null : newValue
      }
    });
  };

  const handleGameUpdate = () => {
    const promises = [];

    for (const gameId in localChanges) {
      const changedFields = localChanges[gameId];
      const game = games.find((g) => g.id === gameId);
      if (game && Object.keys(changedFields).length > 0) {
        const updatedGame = { ...game, ...changedFields };
        promises.push(GamesService.update(gameId, updatedGame));
      }
    }

    Promise.all(promises)
      .then(() => {
        setLocalChanges({});
        getAllGames();
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <Grid container spacing={2} sx={{ width: 1 / 2 }}>
        <Typography variant="body2" color="textSecondary">
          You can't delete some field values. This constraint arises from the legacy codebase, which
          restricts the ability to delete field values. Instead, you can only overwrite them by
          selecting the existing content (Ctrl + A) and then making changes
        </Typography>
        {games.length > 0 &&
          games.map((game) => (
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '30px' }}>
              <GameField
                name={localChanges[game.id]?.name ?? game.name ?? ''}
                changeText={(text: string) => handleFieldChange(text, game, 'name')}
                label={'Nume joc'}
              />
              <GameField
                name={localChanges[game.id]?.questionsCapacity ?? game.questionsCapacity ?? ''}
                changeText={(text: string) => handleGameQuestionsCapacityChange(text, game)}
                label={'Capacitate joc'}
              />
              <Grid item xs={4} sx={{ width: 1 }}>
                <Button variant="outlined" color="error" onClick={() => deleteGame(game)}>
                  Delete
                </Button>
              </Grid>
            </div>
          ))}
        <Grid item xs={8}>
          <Button variant="outlined" onClick={() => addNewGame()}>
            Adauga un joc nou
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" onClick={() => handleGameUpdate()}>
            Salveaza
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GamesManagement;

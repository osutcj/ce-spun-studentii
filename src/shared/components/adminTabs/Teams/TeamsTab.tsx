import { Container, Grid, TextField, Button } from '@mui/material';
import { ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useObjectVal } from 'react-firebase-hooks/database';
import { db } from '../../../../utils/firebase/firebase';
import { DB } from '../../../models/db';

const Teams = () => {

    const [team1Name, setTeam1Name] = useState("");
    const [team2Name, setTeam2Name] = useState("");

    const [team1Points, setTeam1Points] = useState(0);
    const [team2Points, setTeam2Points] = useState(0);


    const [dbValue] = useObjectVal<DB>(ref(db, "/"));

    useEffect(() => {
      if (dbValue) {
        if (dbValue.team1) {
          setTeam1Name(dbValue.team1.name);
          setTeam1Points(dbValue.team1.points)
        }
        if (dbValue.team2) {
          setTeam2Name(dbValue.team2.name);
          setTeam2Points(dbValue.team2.points);
        }
      }
    }, [dbValue])
    

    const saveChanges = () => {
      update(ref(db, '/') , {
        team1: {
          name: team1Name,
          points: team1Points,
        },
        team2: {
          name: team2Name,
          points: team2Points,
        }
      })
    }


    return (
        <Container>
            <Grid container spacing={3}>
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
                onChange={(e) => setTeam1Points(+e.target.value)}
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
                onChange={(e) => setTeam2Points(+e.target.value)}
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
import { Container, Grid, TextField, FormControlLabel, Switch } from '@mui/material';
import React, { useState, useEffect } from 'react';

const RoundAnswer = (props: any) => {
  const { updateFields } = props;
  const [answer, setAnswer] = useState<string>('');
  const [points, setPoints] = useState<number>();
  const [showPoints, setShowPoints] = useState<boolean>(props.answer.showPoints || false);

  useEffect(() => {
    if (props.answer) {
      setAnswer(props.answer);
    }
    if (props.points && !isNaN(parseInt(props.points))) {
      setPoints(props.points);
    }
  }, []);

  useEffect(() => {
    if (props.reset) {
      setAnswer('');
      setPoints(0);
    }
  }, [[props.reset]]);

  const handleShowPointsToggle = () => {
    setShowPoints(!showPoints);
    updateFields({ answer: answer, points: points, showPoints: !showPoints });
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Raspuns"
            variant="standard"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              updateFields({ answer: e.target.value, points: points, showPoints: showPoints });
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Puncte"
            variant="standard"
            value={points}
            onChange={(e) => {
              if (!isNaN(parseInt(e.target.value))) {
                setPoints(parseInt(e.target.value));
                updateFields({
                  answer: answer,
                  points: parseInt(e.target.value),
                  showPoints: showPoints
                });
              }
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Switch checked={showPoints} onChange={handleShowPointsToggle} color="primary" />
            }
            label="Show Points"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default RoundAnswer;

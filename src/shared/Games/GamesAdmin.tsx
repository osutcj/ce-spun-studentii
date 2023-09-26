import React from 'react';
import { Grid, TextField, Button } from '@mui/material';

function GamesAdmin(props: any) {
  const { name, changeText, label } = props;

  return (
    <div style={{ marginLeft: '10px', marginRight: '10px' }}>
      <Grid item xs={12}>
        <TextField
          id="outlined-basic"
          label={label}
          variant="outlined"
          value={name}
          onChange={(event) => {
            changeText(event.target.value);
          }}
          fullWidth
          sx={{ marginBottom: '10px' }}
        />
      </Grid>
    </div>
  );
}

export default GamesAdmin;

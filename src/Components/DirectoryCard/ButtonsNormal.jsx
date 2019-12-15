import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'


export default function ButtonsNormal(props) {

  return (
    <div>
      <Box p={props.space} />
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={0}
      >
        <Grid item xs={5}></Grid>
        <Grid item xs={5}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={props.handleClickAccept}
          >
            {props.buttonName}
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
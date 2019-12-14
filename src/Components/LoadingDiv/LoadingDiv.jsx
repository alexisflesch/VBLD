import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

export default function LoadingDiv() {
  //Élément à afficher en cas de chargement
  return (
    <Container maxWidth="xs">
      <Grid container justify="center">
        <CircularProgress size={40} />
      </Grid>
    </Container>
  )
}
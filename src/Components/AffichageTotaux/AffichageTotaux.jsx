import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
// import blueGrey from '@material-ui/core/colors/blueGrey';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  avatarOui: {
    backgroundColor: "#8ad5fb", //"#8fd0ff",
    color: "black",
    width: 30,
    height: 30,
  },
  avatarNonRepondu: {
    backgroundColor: "#E9F1F7", //blueGrey[50],
    color: "black",
    width: 30,
    height: 30,
  },
  avatarSiBesoin: {
    backgroundColor: "#f5b829",//"#ffd746",
    color: "black",
    width: 30,
    height: 30,
  },
  avatarAbsent: {
    backgroundColor: "#bcd4de", //blueGrey[200],
    color: "black",
    width: 30,
    height: 30,
  },
  avatarMatch: {
    backgroundColor: "#ff7bdb", //blueGrey[200],
    color: "black",
    width: 30,
    height: 30,
  },
}));

export default function AffichageTotaux(props) {
  const classes = useStyles();
  var { totaux } = props;

  if (!totaux) {
    totaux = {
      'Oui': 0, 'Présent(e)': 0,
      'Non': 0, 'Absent(e)': 0,
      'Si besoin': 0, 'Provisoire': 0,
      'Non renseigné': 0
    }
  }

  const Presents = (
    <Avatar className={classes.avatarOui} >
      <Typography>
        {totaux['Oui'] + totaux['Présent(e)']}
      </Typography>
    </ Avatar>
  )
  const Provisoire = (
    <Avatar className={classes.avatarSiBesoin} >
      <Typography>
        {totaux['Provisoire'] + totaux['Si besoin']}
      </Typography>
    </ Avatar>
  )
  const NonRepondu = (
    <Avatar className={classes.avatarNonRepondu} >
      <Typography>
        {totaux['Non renseigné']}
      </Typography>
    </ Avatar>
  )
  const Absents = (
    <Avatar className={classes.avatarAbsent} >
      <Typography>
        {totaux['Non'] + totaux['Absent(e)']}
      </Typography>
    </ Avatar>
  )
  let Matchs
  if (totaux['Match']) {
    Matchs = (
      <Grid item>
        <Avatar className={classes.avatarMatch} >
          <Typography>
            {totaux['Match']}
          </Typography>
        </ Avatar>
      </Grid>
    )
  }

  return (
    <Container maxWidth="xs" >
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        <Grid item>{Presents}</Grid>
        <Grid item>{Provisoire}</Grid>
        <Grid item>{NonRepondu}</Grid>
        <Grid item>{Absents}</Grid>
        {Matchs}
      </Grid>
    </Container>
  )
}
import React from 'react';
import { Typography } from '@material-ui/core';
import LogoVBLD from '../../images/volley.png'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'

const useStyles = makeStyles(theme => ({
  margins: {
    padding: theme.spacing(2),
  },
}));


export default function News() {
  const classes = useStyles()


  var welcome = (
    <Typography align='justify'>
      Vous pouvez installer cette application
      sur votre téléphone portable en cherchant "Ajouter à l'écran
      d'accueil" dans les paramètres de votre navigateur.
      <br /><br />
      <span>Pour vous rendre sur le blog de Danjoutin, </span>
      <Link href='http://vbld.blogspot.com'
        target='_blank' rel="noopener noreferrer">
        cliquez ici
      </Link>.
      <br /><br />
      Quelques nouveautés ont été ajoutées : allez faire un tour dans
      l'onglet "Paramètres" pour renseigner votre pseudo et choisir
      l'onglet à afficher à l'ouverture de l'application. Allez aussi
      faire un tour dans l'onglet "Résultats" pour savoir où nous en
      sommes dans le championnat !
    </Typography>
  )

  return (
    <div className={classes.margins}>
      <Box p={1} />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Hidden mdUp>
          <img src={LogoVBLD} alt='' width='300' />
        </Hidden>
        <Hidden smDown>
          <img src={LogoVBLD} alt='' width='500' />
        </Hidden>
      </Grid>
      <Box p={2} />
      <Typography variant='h6'>Bienvenue !</Typography>
      <Box p={.5} />
      {welcome}
    </div>
  )
}
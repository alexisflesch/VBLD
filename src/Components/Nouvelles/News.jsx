import React from 'react';
import { Typography } from '@material-ui/core';
import LogoVBLD from '../../images/logoVBLD.png';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  margins: {
    padding: theme.spacing(2),
  },
}));


export default function News() {
  const classes = useStyles()


  var welcome = (
    <Typography align='justify'>
      Vous pouvez ajouter une icône sur votre téléphone en cherchant "Ajouter à l'écran
      d'accueil" dans les paramètres de votre navigateur.
      <br /><br />
      <span>Pour vous rendre sur le blog de Danjoutin, </span>
      <Link href='http://vbld.blogspot.com'
        target='_blank' rel="noopener noreferrer">
        cliquez ici
      </Link>.
    </Typography>
  )

  return (
    <div className={classes.margins}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <img src={LogoVBLD} alt='' width='150' />
      </Grid>
      <Typography variant='h6'>Bienvenue !</Typography>
      <Box p={.5} />
      {welcome}
    </div>
  )
}
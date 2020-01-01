import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  margins: {
    padding: theme.spacing(2),
  },
}));

export default function Error() {
  const classes = useStyles()

  return (
    <div className={classes.margins}>
      <Typography variant='h6'>Erreur</Typography>
      <Box p={.5} />
      <Typography align='justify'>
        Une erreur est survenue. Votre compte a-t-il bien été validé ?
        Si ce n'est pas (encore) le cas, merci de vérifier que vous avez
        bien renseigné vos noms/prénoms dans les paramètres.
        Sinon, il est possible que votre connexion internet soit mauvaise,
        patientez un peu ou rechargez la page.
      </Typography>
    </div>
  )
}
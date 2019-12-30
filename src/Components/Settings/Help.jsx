import React from 'react'
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid'
import PhoneIcon from '@material-ui/icons/Phone';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import AccessibilityIcon from '@material-ui/icons/Accessibility';


export default function Help(props) {

  const { open, setOpen, content } = props;

  let mainContent, MyIcon, titre
  if (content === 'pseudo') {
    titre = 'Pseudo'
    MyIcon = ChildCareIcon
    mainContent = (
      <Typography variant='subtitle1' align='justify'>
        Pour basculer entre l'affichage "Nom Prénom" et l'affichage
        du pseudo, utilisez l'icône adéquate dans les différents onglets.
        </Typography>
    )
  }
  else if (content === 'email') {
    titre = 'Email'
    MyIcon = MailIcon
    mainContent = (
      <Typography variant='subtitle1' align='justify'>
        Votre adresse email ne sera visible que des membres du club.
        </Typography>
    )
  }
  else if (content === 'telephone') {
    titre = 'Téléphone'
    MyIcon = PhoneIcon
    mainContent = (
      <Typography variant='subtitle1' align='justify'>
        Votre numéro de téléphone ne sera visible que des membres du club.
        </Typography>
    )
  }
  else if (content === 'tri') {
    titre = 'Tri par présence'
    MyIcon = SortByAlphaIcon
    mainContent = (
      <Typography variant='subtitle1' align='justify'>
        Si vous activez le tri par présence, les personnes présentes
        apparaîtront en premier, suivies des "provisoires", etc...
        Vous pouvez à tout moment rebasculer vers un tri par ordre
        alphabétique en appuyant sur l'icône adéquate.
        </Typography>
    )
  }
  else {
    titre = "Moi d'abord"
    MyIcon = AccessibilityIcon
    mainContent = (
      <Typography variant='subtitle1' align='justify'>
        Si vous activez cette option, votre nom apparaîtra toujours
        en haut des listes, quel que soit le tri que vous
        choisissez.
      </Typography>
    )
  }



  function handleOk() {
    setOpen(false)
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="Attention"
      open={open}
      fullWidth
    >
      <DialogContent>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-end"
          spacing={2}
        >
          <Grid item><MyIcon /></Grid>
          <Grid item>
            <Typography variant='h6'>
              {titre}
            </Typography>
          </Grid>
        </Grid>

        <Box p={.5} />

        {mainContent}

        <Box p={1} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOk} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
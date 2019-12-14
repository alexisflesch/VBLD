import React from 'react'
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';


export default function AlertInfo(props) {

  const { events } = props;

  //Dialog d'alerte : est-il ouvert ?
  const [open, setOpen] = React.useState(false)

  function openDialog() {
    setOpen(true)
  }

  return (
    <div>
      <IconButton color='primary' onClick={openDialog} >
        <WarningRoundedIcon />
      </IconButton>
      {PopUpDialog(open, setOpen, events)}
    </div>
  )
}



function PopUpDialog(open, setOpen, events) {

  function handleOk() {
    setOpen(false)
  }

  let Content
  if (events.length === 2) {
    Content = (
      <Typography variant='subtitle1' align='justify'>
        Un match ainsi qu'un pot sont prévus à cette date. Pensez à renseigner
        vos disponibilités dans les onglets correspondants !
      </Typography>
    )
  }
  else if (events.length === 1 && events[0]["branchName"] === 'pots') {
    Content = (
      <Typography variant='subtitle1' align='justify'>
        Un pot est aussi prévu à cette date ! Pensez à renseigner votre
        disponibilité dans l'onglet "Pots" et à y inscrire ce que vous
        comptez apporter le cas échéant.
      </Typography>
    )
  }
  else if (events.length === 1 && events[0]["branchName"] === 'matchs') {
    Content = (
      <Typography variant='subtitle1' align='justify'>
        Un match a lieu en même temps que l'entraînement à cette date.
        N'oubliez pas de renseigner votre disponibilité dans l'onglet correspondant !
      </Typography>
    )
  }
  else {
    Content = (
      <Typography variant='subtitle1' align='justify'>
        Ce panneau n'aurait pas dû s'afficher... Merci de contacter Alexas.
      </Typography>
    )
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
        <Typography variant='h6'>
          Attention
        </Typography>
        <Box p={.5} />

        {Content}

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
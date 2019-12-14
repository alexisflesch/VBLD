import React from 'react'
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import ListItemText from '@material-ui/core/ListItemText'
import Container from '@material-ui/core/Container'

function PopUpDialog(open, setOpen, summary) {

  function handleOk() {
    setOpen(false)
  }

  //Nettoyage des lignes vides :
  //le constructeur 'Boolean' agit comme dans if (summary[key]){ ... }
  //il supprime donc les chaînes vides et les "undefined"
  const keys = Object.keys(summary)
  for (const key of keys) {
    summary[key] = summary[key].filter(Boolean)
  }

  return (
    <Dialog
      // disableBackdropClick
      // disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="Résumé du pot"
      open={open}
      fullWidth
    >
      <DialogContent>
        <Typography variant='h6'>
          Résumé du pot
          </Typography>
        <Box p={.5} />

        <Typography variant='subtitle1' align='justify'>
          Boissons
        </Typography>
        <List dense={true}>
          {summary['boissons'].map(function (b, index) {
            return (
              <ListItem key={index}>
                <ListItemIcon>
                  <LabelOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={b}
                />
              </ListItem>
            )
          })}
        </List>

        <Box p={.5} />
        <Typography variant='subtitle1' align='justify'>
          Salé
        </Typography>
        <List dense={true}>
          {summary['sale'].map(function (s, index) {
            return (
              <ListItem key={index}>
                <ListItemIcon>
                  <LabelOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={s}
                />
              </ListItem>
            )
          })}
        </List>

        <Box p={.5} />
        <Typography variant='subtitle1' align='justify'>
          Sucré
        </Typography>
        <List dense={true}>
          {summary['sucre'].map(function (s, index) {
            return (
              <ListItem key={index}>
                <ListItemIcon>
                  <LabelOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={s}
                />
              </ListItem>
            )
          })}
        </List>

        <Box p={.5} />
        <Typography variant='subtitle1' align='justify'>
          Autres
        </Typography>
        <List dense={true}>
          {summary['autres'].map(function (a, index) {
            return (
              <ListItem key={index}>
                <ListItemIcon>
                  <LabelOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={a}
                />
              </ListItem>
            )
          })}
        </List>

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

export default function Summary(props) {

  const { summary } = props;

  //Dialog d'info : est-il ouvert ?
  const [open, setOpen] = React.useState(false)

  function openDialog() {
    setOpen(true)
  }

  return (
    <Container maxWidth="xs" >
      <Button variant="contained" size="small" color="primary" onClick={openDialog}>
        Résumé du pot
        </Button>
      {PopUpDialog(open, setOpen, summary)}
    </Container>
  )
}


function SummaryInfo(props) {

  const { summary } = props;

  //Dialog d'info : est-il ouvert ?
  const [open, setOpen] = React.useState(false)

  function openDialog() {
    setOpen(true)
  }

  return (
    <div>
      <IconButton color='primary' onClick={openDialog} >
        <InfoIcon />
      </IconButton>
      {PopUpDialog(open, setOpen, summary)}
    </div>
  )
}


export { PopUpDialog, SummaryInfo }
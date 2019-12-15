import React from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';
import 'date-fns';
import frLocale from "date-fns/locale/fr";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import AlertAlreadyExists from '../Administration/AlertAlreadyExists'
import InputAdornment from '@material-ui/core/InputAdornment';
import EventIcon from '@material-ui/icons/Event';

import firebase from '../Firebase/firebase'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

export default function AddButton(props) {
  const classes = useStyles()

  const { branchName, datesAndMore, userId } = props

  //Dialog d'info : est-il ouvert ?
  const [open, setOpen] = React.useState(false)


  return (
    <div>
      <Fab color="primary"
        aria-label="add"
        size='medium'
        className={classes.fab}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
      {PopUpDialog(open, setOpen, branchName, datesAndMore, userId)}
    </div>
  )
}

function PopUpDialog(open, setOpen, branchName, datesAndMore, userId) {


  const [date, setDate] = React.useState(new Date())
  const [location, setLocation] = React.useState('Danjoutin')
  const [domicile, setDomicile] = React.useState('')
  const [exterieur, setExterieur] = React.useState('')
  const [openAlert, setOpenAlert] = React.useState(false)

  let typeOfEvent, inputFields
  if (branchName === 'pots') {
    typeOfEvent = 'pot'
    inputFields = (
      <TextField id="standard-basic"
        label="Lieu"
        multiline
        value={location}
        onChange={handleChangeLocation}
        fullWidth
      />
    )
  }
  else if (branchName === 'matchs') {
    typeOfEvent = 'match'
    inputFields = (
      <div>
        <TextField id="standard-basic"
          label="Équipe qui joue à domicile"
          multiline
          value={domicile}
          onChange={handleChangeDomicile}
          fullWidth
        />
        {/* <Box p={1} /> */}
        <TextField id="standard-basic"
          label="Équipe extérieure"
          multiline
          value={exterieur}
          onChange={handleChangeExterieur}
          fullWidth
        />
      </div>
    )
  }

  function handleChangeLocation(event) {
    setLocation(event.target.value)
  }

  function handleChangeDomicile(event) {
    setDomicile(event.target.value)
  }

  function handleChangeExterieur(event) {
    setExterieur(event.target.value)
  }


  function handleOk() {
    //Check if date is available
    for (const dam of datesAndMore) {
      if (dam['date'].toDateString() === date.toDateString()) {
        setOpenAlert(true)
        return
      }
    }
    //Save everything
    var myRef = firebase.database().ref('/evenements/' + branchName)
    var newStuff = myRef.push()
    let sep
    if (date.getMinutes().toString().length === 1) {
      sep = 'h0'
    }
    else {
      sep = 'h'
    }
    var readableTime = date.getHours() + sep + date.getMinutes()
    var readableDate = date.toDateString()
    var numericalDate = date.valueOf()

    if (branchName === 'pots') {
      newStuff.set({
        lieu: location,
        numericalDate,
        pushedBy: userId,
        readableDate,
        readableTime,
      })
    }
    else if (branchName === 'matchs') {
      newStuff.set({
        EquipeDomicile: domicile,
        EquipeExterieur: exterieur,
        numericalDate,
        pushedBy: userId,
        readableDate,
        readableTime
      })
    }
    setOpen(false)
  }

  function handleCancel() {
    setOpen(false)
  }

  return (
    <div>
      <AlertAlreadyExists open={openAlert} setOpen={setOpenAlert} typeOfEvent={typeOfEvent} />
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="Ajouter un événement"
        open={open}
        fullWidth
      >
        <DialogContent>
          <Typography variant='h6'>
            Ajouter un {typeOfEvent}
          </Typography>
          <Box p={1.5} />
          <Typography>
            Merci de renseigner les champs ci-dessous.
        </Typography>
          <Box p={1} />
          {inputFields}
          <Box p={1} />
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
            <DateTimePicker
              label="Date"
              format="d MMM yyyy à HH:mm"
              value={date}
              onChange={setDate}
              ampm={false}
              cancelLabel="annuler"
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <EventIcon color='action' />
                </InputAdornment>,
              }}
            />
          </MuiPickersUtilsProvider>
          <Box p={1} />
        </DialogContent>
        <DialogActions>

          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Button onClick={handleCancel} color="primary">
                Annuler
            </Button>
            </Grid>
            <Grid item>
              <Button onClick={handleOk} color="primary">
                Sauvegarder
            </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit';

import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField'
import 'date-fns';
import frLocale from "date-fns/locale/fr";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid'
import AlertConfirm from '../Administration/AlertConfirm'


import firebase from '../Firebase/firebase'


export default function DialogEdit(props) {
  const { editable, path, deletable } = props;

  //Dialog d'info : est-il ouvert ?
  const [open, setOpen] = React.useState(false)

  function openDialog() {
    setOpen(true)
  }

  return (
    <div>
      <IconButton color='primary' onClick={openDialog} >
        <EditIcon />
      </IconButton>
      {PopUpDialog(open, setOpen, editable, deletable, path)}
    </div>
  )
}


function PopUpDialog(open, setOpen, editable, deletable, path) {

  //State to force refresh on change
  const [foo, setFoo] = React.useState(false)

  //State to open an alert dialog when deleting an event
  const [openDelete, setOpenDelete] = React.useState(false)


  function handleDelete() {
    var myRef = firebase.database().ref(path)
    myRef.remove()
    setOpen(false)
  }

  function handleOk() {
    //Save everything
    let myRef
    //Résultat de la rencontre
    if (editable['resultat'] !== undefined) {
      myRef = firebase.database().ref(path + '/resultat')
      myRef.set(editable['resultat'])
    }
    //Lieu de la rencontre
    if (editable['lieu'] !== undefined) {
      myRef = firebase.database().ref(path + '/lieu')
      myRef.set(editable['lieu'])
    }
    //Équipe qui joue à domicile
    if (editable['domicile'] !== undefined) {
      myRef = firebase.database().ref(path + '/EquipeDomicile')
      myRef.set(editable['domicile'])
    }
    //Équipe qui joue à l'exterieur
    if (editable['exterieur'] !== undefined) {
      myRef = firebase.database().ref(path + '/EquipeExterieur')
      myRef.set(editable['exterieur'])
    }
    if (editable['date'] !== undefined) {
      var d = new Date(editable['date'])
      let sep
      if (d.getMinutes().toString().length === 1) {
        sep = 'h0'
      }
      else {
        sep = 'h'
      }
      var readableTime = d.getHours() + sep + d.getMinutes()
      myRef = firebase.database().ref(path + '/numericalDate')
      myRef.set(editable['date'])
      myRef = firebase.database().ref(path + '/readableDate')
      myRef.set(d.toDateString())
      myRef = firebase.database().ref(path + '/readableTime')
      myRef.set(readableTime)
    }
    setOpen(false)
  }

  function handleCancel() {
    setOpen(false)
  }

  function handleChangeResult(event) {
    editable['resultat'] = event.target.value
    setFoo(!foo)
  }

  function handleDateChange(d) {
    editable['date'] = d.valueOf()
    setFoo(!foo)
  }

  function handleChangeLieu(event) {
    editable['lieu'] = event.target.value
    setFoo(!foo)
  }

  function handleChangeDomicile(event) {
    editable['domicile'] = event.target.value
    setFoo(!foo)
  }

  function handleChangeExterieur(event) {
    editable['exterieur'] = event.target.value
    setFoo(!foo)
  }

  let changeResult, changeDate, deleteButton, changeLieu, changeDomicile, changeExterieur


  if (editable['lieu'] !== undefined) {
    changeLieu = (
      <div>
        <Box p={1} />
        <TextField id="standard-basic"
          label="Lieu"
          multiline
          value={editable['lieu']}
          onChange={handleChangeLieu}
          fullWidth
        />
      </div>
    )
  }

  if (editable['domicile'] !== undefined) {
    changeDomicile = (
      <div>
        <Box p={1} />
        <TextField id="standard-basic"
          label="Équipe qui joue à domicile"
          multiline
          value={editable['domicile']}
          onChange={handleChangeDomicile}
          fullWidth
        />
      </div>
    )
  }

  if (editable['exterieur'] !== undefined) {
    changeExterieur = (
      <div>
        <Box p={1} />
        <TextField id="standard-basic"
          label="Équipe extérieure"
          multiline
          value={editable['exterieur']}
          onChange={handleChangeExterieur}
          fullWidth
        />
      </div>
    )
  }


  if (editable['resultat'] !== undefined) {
    changeResult = (
      <div>
        <Box p={1} />
        <TextField id="standard-basic"
          label="Score du match (exemple 3-1)"
          multiline
          value={editable['resultat']}
          onChange={handleChangeResult}
          fullWidth
        />
      </div>
    )
  }

  if (editable['date'] !== undefined) {
    const date = new Date(editable['date'])
    changeDate = (
      <div>
        <Box p={1} />
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
          <KeyboardDateTimePicker
            label="Date"
            format="d MMM yyyy à HH:mm"
            value={date}
            onChange={handleDateChange}
            cancelLabel="annuler"
            fullWidth
            ampm={false}
          />
        </MuiPickersUtilsProvider>
      </div>
    )
  }

  if (deletable) {
    deleteButton = (
      <div>
        <Box p={2} />
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Button onClick={() => setOpenDelete(true)} variant="contained" color="secondary">
              Supprimer l'événement
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }

  return (
    <div>
      <AlertConfirm
        open={openDelete}
        setOpen={setOpenDelete}
        handleDelete={handleDelete}
      />
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="Modification de l'événement"
        open={open}
        fullWidth
      >
        <DialogContent>
          <Typography variant='h6'>
            Modifier l'événement
          </Typography>
          <Box p={.5} />
          {changeLieu}
          {changeDomicile}
          {changeExterieur}
          {changeResult}
          {changeDate}
          {deleteButton}
        </DialogContent>
        <DialogActions>
          <Box p={1} />
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
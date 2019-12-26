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
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid'
import AlertConfirm from '../Administration/AlertConfirm'
import InputAdornment from '@material-ui/core/InputAdornment';
import EventIcon from '@material-ui/icons/Event';

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
    if (editable['score'] !== undefined) {
      var dom = parseInt(editable['score']['dom'])
      var ext = parseInt(editable['score']['ext'])
      myRef = firebase.database().ref(path + '/score')
      myRef.set({ dom, ext })
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

  function handleChangeScoreDom(event) {
    var reg = new RegExp('^$|^[0-3]$')
    if (reg.test(event.target.value)) {
      editable['score']['dom'] = event.target.value
      setFoo(!foo)
    }
  }

  function handleChangeScoreExt(event) {
    var reg = new RegExp('^$|^[0-3]$')
    if (reg.test(event.target.value)) {
      editable['score']['ext'] = event.target.value
      setFoo(!foo)
    }
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

  let changeScore, changeDate, deleteButton, changeLieu, changeDomicile, changeExterieur


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


  if (editable['score'] !== undefined) {
    changeScore = (
      <div>
        <Box p={1} />
        <Typography>
          Résultat du match
        </Typography>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={5}>
            <TextField id="standard-basic"
              label="Domicile"
              multiline
              value={editable['score']['dom'].toString()}
              onChange={handleChangeScoreDom}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField id="standard-basic"
              label="Exterieur"
              multiline
              value={editable['score']['ext'].toString()}
              onChange={handleChangeScoreExt}
            />
          </Grid>
        </Grid>
      </div>
    )
  }

  if (editable['date'] !== undefined) {
    const date = new Date(editable['date'])
    changeDate = (
      <div>
        <Box p={1} />
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
          <DateTimePicker
            label="Date"
            format="d MMM yyyy à HH:mm"
            value={date}
            onChange={handleDateChange}
            cancelLabel="annuler"
            fullWidth
            ampm={false}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <EventIcon color='action' />
              </InputAdornment>,
            }}
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
          {changeScore}
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
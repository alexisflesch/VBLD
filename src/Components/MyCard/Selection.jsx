import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import ButtonsNormal from '../DirectoryCard/ButtonsNormal'
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  margins: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
}));

export default function Selection(props) {
  const classes = useStyles();
  const { sportif, handleSave } = props;

  //State pour être dans l'équipe
  const [selectionne, setSelectionne] = React.useState(sportif['selectionne']['selectionne']);

  //Poste(s) occupé sur le terrain
  const [passe, setPasse] = React.useState(sportif['selectionne']['passe'])
  const [centre, setCentre] = React.useState(sportif['selectionne']['centre'])
  const [quatre, setQuatre] = React.useState(sportif['selectionne']['quatre'])

  function handleChangePasse(event) {
    setPasse(event.target.checked)
    sportif['selectionne']['passe'] = event.target.checked
  }

  function handleChangeCentre(event) {
    setCentre(event.target.checked)
    sportif['selectionne']['centre'] = event.target.checked
  }

  function handleChangeQuatre(event) {
    setQuatre(event.target.checked)
    sportif['selectionne']['quatre'] = event.target.checked
  }

  function handleChangeSelectionne(event) {
    setSelectionne(event.target.checked)
    sportif['selectionne']['selectionne'] = event.target.checked
  }

  return (
    <div>
      <Box p={1.5} />
      <Divider />
      <div className={classes.margins}>
        <Box p={1} />
        <Typography>
          Nombre de sélections antérieures : {sportif['nbSelections']}
        </Typography>
        <Box p={1} />
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={10}>
            <Typography>
              Sélectionner
      </Typography>
          </Grid>
          <Grid item xs={2}>
            <Switch checked={selectionne}
              color='primary'
              onChange={handleChangeSelectionne}
              value="selectionne" />
          </Grid>
        </Grid>

        <Box p={1} />
        <Typography >Choisissez un ou plusieurs postes</Typography>
        <Box p={.5} />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox color='primary'
              checked={passe}
              onChange={handleChangePasse}
              value="passe" />}
            label="Passe"
          />
          <FormControlLabel
            control={<Checkbox color='primary'
              checked={centre}
              onChange={handleChangeCentre}
              value="centre" />}
            label="Centre"
          />
          <FormControlLabel
            control={<Checkbox color="primary"
              checked={quatre}
              onChange={handleChangeQuatre}
              value="poste 4" />}
            label="Poste 4"
          />
        </FormGroup>

        <Box p={2} />
        <ButtonsNormal
          buttonName="Sauvegarder"
          handleClickAccept={() => handleSave()}
        />
      </div>
    </div>
  )
}
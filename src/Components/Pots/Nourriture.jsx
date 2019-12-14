import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import ButtonsNormal from '../DirectoryCard/ButtonsNormal'

const useStyles = makeStyles(theme => ({
  margins: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  inputField: {
    // margin: -theme.spacing(1),
    // padding: -theme.spacing(1),
  },
}));


export default function Nourriture(props) {
  const classes = useStyles();
  const { sportif, handleSave } = props;

  const boissons = sportif['boissons']
  const sucre = sportif['sucre']
  const sale = sportif['sale']
  const autres = sportif['autres']

  const [boissonsT, setBoissonsT] = React.useState(boissons)
  const [sucreT, setSucreT] = React.useState(sucre)
  const [saleT, setSaleT] = React.useState(sale)
  const [autresT, setAutresT] = React.useState(autres)

  function handleChange(event, categorie) {
    if (categorie === 'boissons') {
      setBoissonsT(event.target.value)
    }
    else if (categorie === 'sucre') {
      setSucreT(event.target.value)
    }
    else if (categorie === 'sale') {
      setSaleT(event.target.value)
    }
    else if (categorie === 'autres') {
      setAutresT(event.target.value)
    }
  }


  function handleSavePot() {
    boissonsT ? sportif['boissons'] = boissonsT : sportif['boissons'] = ''
    sucreT ? sportif['sucre'] = sucreT : sportif['sucre'] = ''
    saleT ? sportif['sale'] = saleT : sportif['sale'] = ''
    autresT ? sportif['autres'] = autresT : sportif['autres'] = ''
    handleSave(sportif)
  }

  return (
    <div>
      <Box p={1.5} />
      <Divider />
      <div className={classes.margins}>
        <Box p={1.5} />
        <Typography>
          Que comptez-vous amener ?
        </Typography>
        <Box p={1} />
        <TextField id="standard-basic"
          label="Boissons"
          multiline
          className={classes.inputField}
          value={boissonsT}
          onChange={(event) => handleChange(event, 'boissons')}
          fullWidth
        />
        <TextField id="standard-basic"
          label="Salé"
          multiline
          className={classes.inputField}
          value={saleT}
          onChange={(event) => handleChange(event, 'sale')}
          fullWidth
        />
        <TextField id="standard-basic"
          label="Sucré"
          multiline
          className={classes.inputField}
          value={sucreT}
          onChange={(event) => handleChange(event, 'sucre')}
          fullWidth
        />
        <TextField id="standard-basic"
          label="Autre"
          multiline
          className={classes.inputField}
          value={autresT}
          onChange={(event) => handleChange(event, 'autres')}
          fullWidth
        />
      </div>
      <Box p={3} />
      <ButtonsNormal handleClickAccept={handleSavePot} buttonName='Sauvegarder' />
    </div>
  )
}
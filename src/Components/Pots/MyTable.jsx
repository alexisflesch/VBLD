import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  inputField: {
    // margin: -theme.spacing(1),
    // padding: -theme.spacing(1),
  },
  nameCell: {
    minWidth: 120,
  },
  header: {
    backgroundColor: theme.palette.grey['200']
  },
  row: {
    backgroundColor: "#8ad5fb",
    '&:hover': {
      transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.short,
      }),
      opacity: theme.palette.action.hoverOpacity,
    },
  },
  row3: {
    backgroundColor: "#8ad5fb",
    '&:hover': {
      transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.short,
      }),
      brightness: 0,
    },
  },
  row2: {
    backgroundColor: "#8ad5fb",
    '&:hover $focusHighlight': {
      opacity: theme.palette.action.hoverOpacity,
    },
  },
  focusHighlight: {
    // overflow: 'hidden',
    pointerEvents: 'none',
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // bottom: 0,
    // left: 0,
    borderRadius: 'inherit',
    opacity: 0.5,
    backgroundColor: '#8ad5fb',
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.short,
    }),
  },
}));


const sportifs = [
  { uid: 'id1', nom: 'Flesch', prenom: 'Alexis', boissons: 'coca', autres: 'barbecue', editable: true },
  // { uid: 'id2', nom: 'Fourny', prenom: 'Maxime', sale: 'saucisson cacahuètes pain fromage', editable: false },
  // { uid: 'id3', nom: 'Oudot', prenom: 'Damien', boissons: 'bière', editable: false },
  // { uid: 'id4', nom: 'Eugène', prenom: 'Isaline', boissons: 'coca', editable: true },
  // { uid: 'id5', nom: 'Daucourt', prenom: 'Cléo', boissons: 'coca', editable: false },
  // { uid: 'id6', nom: 'Duchanois', prenom: 'Sophie', boissons: 'coca', autres: 'charbon', editable: false },
];

const sportifs2 = [
  { uid: 'id1', nom: 'Flesch', prenom: 'Alexis', boissons: 'coca', autres: 'barbecue', editable: true },
  { uid: 'id2', nom: 'Fourny', prenom: 'Maxime', sale: 'saucisson cacahuètes pain fromage', editable: false },
  { uid: 'id3', nom: 'Oudot', prenom: 'Damien', boissons: 'bière', editable: false },
  { uid: 'id4', nom: 'Eugène', prenom: 'Isaline', boissons: 'coca', editable: true },
  { uid: 'id5', nom: 'Daucourt', prenom: 'Cléo', boissons: 'coca', editable: false },
  { uid: 'id6', nom: 'Duchanois', prenom: 'Sophie', boissons: 'coca', autres: 'charbon', editable: false },
];

function dummyList(classes) {
  var res = []
  console.log('dummy')
  for (const sportif of sportifs2) {
    res.push(
      <TableRow
        onClick={() => console.log(sportif.nom)}
        className={classes.row3}
      >
        <CardActionArea key={sportif.uid}>
          {/* <span className={classes.focusHighlight}> */}
          <TableCell component="th" scope="row">
            {sportif.nom + ' ' + sportif.prenom}
          </TableCell>
          <TableCell align="left">
            {sportif.boissons}
          </TableCell>
          <TableCell align="left">
            {sportif.sale}
          </TableCell>
          <TableCell align="left">
            {sportif.sucre}
          </TableCell>
          <TableCell align="left">
            {sportif.autres}
          </TableCell>
          {/* </span> */}
        </CardActionArea>
      </TableRow>
    )
  }
  return res
}


function createList(sportifs, classes, handleChange) {
  var res = []
  for (const sportif of sportifs) {
    if (sportif['editable']) {
      res.push(
        <TableRow key={sportif.uid}>
          <TableCell component="th" scope="row">
            {sportif.nom + ' ' + sportif.prenom}
          </TableCell>
          <TableCell align="left">
            <TextField id="standard-basic"
              label="Boisson"
              multiline
              className={classes.inputField}
              value={sportif.boissons}
              onChange={(event) => handleChange(event, sportif, 'boissons')}
            />
          </TableCell>
          <TableCell align="left">
            <TextField id="standard-basic"
              label="Salé"
              multiline
              className={classes.inputField}
              value={sportif.sale}
            />
          </TableCell>
          <TableCell align="left">
            <TextField id="standard-basic"
              label="Sucré"
              multiline
              className={classes.inputField}
              value={sportif.sucre}
            />
          </TableCell>
          <TableCell align="left">
            <TextField id="standard-basic"
              label="Autres"
              multiline
              className={classes.inputField}
              value={sportif.autres}
            />
          </TableCell>
        </TableRow>
      )
    }
    else {
      res.push(
        <TableRow key={sportif.uid}>
          <TableCell component="th" scope="row">
            {sportif.nom + ' ' + sportif.prenom}
          </TableCell>
          <TableCell align="left">
            {sportif.boissons}
          </TableCell>
          <TableCell align="left">
            {sportif.sale}
          </TableCell>
          <TableCell align="left">
            {sportif.sucre}
          </TableCell>
          <TableCell align="left">
            {sportif.autres}
          </TableCell>
        </TableRow>
      )
    }
  }
  return res
}

export default function MyTable() {

  function handleChange(event, sportif, categorie) {
    for (const s of sportifs) {
      if (sportif['uid'] === s['uid']) {
        s[categorie] = event.target.value
        break
      }
    }
    setData(createList(sportifs, classes, handleChange))
  }

  const classes = useStyles();
  const initialData = createList(sportifs, classes, handleChange)
  const testData = dummyList(classes)

  const [data, setData] = React.useState(initialData)


  return (
    <Paper className={classes.root}>
      <Table className={classes.table} size="small" aria-label="pot">
        <TableHead className={classes.header}>
          <TableRow>
            <TableCell className={classes.nameCell}>Nom Prénom</TableCell>
            <TableCell align="left">Boisson</TableCell>
            <TableCell align="left">Salé</TableCell>
            <TableCell align="left">Sucré</TableCell>
            <TableCell align="left">Autres</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data}
          {testData}
          {testData}
        </TableBody>
      </Table>
    </Paper>
  );
}
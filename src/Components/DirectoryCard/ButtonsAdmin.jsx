import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  button: {
    // margin: theme.spacing(2),
  },
  card: {
    // backgroundColor: blue[50],
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  titre: {
    marginTop: -14,
    marginBottom: -7,
  }
}));


export default function ButtonsAdmin(props) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      spacing={0}
    >
      <Grid item xs={5}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={props.handleClickBan}
          fullWidth
        >
          Bannir
            </Button>
      </Grid>
      <Grid item xs={5}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          fullWidth
          onClick={props.handleClickAccept}
        >
          Autoriser
            </Button>
      </Grid>
    </Grid>
  )
}
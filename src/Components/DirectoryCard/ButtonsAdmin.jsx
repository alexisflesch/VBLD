import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
import Box from '@material-ui/core/Box'


const useStyles = makeStyles(theme => ({
  margins: {
    margin: theme.spacing(2),
  },
}));


export default function ButtonsAdmin(props) {
  const classes = useStyles();

  const { sportif } = props;

  const [checkedWhiteList, setCheckedWhiteList] = React.useState(sportif['onWhiteList']);
  const [checkedMiniAdmin, setCheckedMiniAdmin] = React.useState(sportif['miniAdmin']);

  function handleChangeWhiteList(event) {
    setCheckedWhiteList(event.target.checked)
  }

  function handleChangeMiniAdmin(event) {
    setCheckedMiniAdmin(event.target.checked)
  }

  return (
    <div className={classes.margins}>
      <Box p={1.5} />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={10}>
          <Typography>
            Utilisateur autorisé
      </Typography>
        </Grid>
        <Grid item xs={2}>
          <Switch checked={checkedWhiteList} color='primary' onChange={handleChangeWhiteList} value="checkedTri" />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={10}>
          <Typography>
            Mini administrateur
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Switch checked={checkedMiniAdmin} color='primary' onChange={handleChangeMiniAdmin} value="checkedMeFirst" />
        </Grid>
      </Grid>

      <Box p={2} />
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        <Grid item xs={5}>
          <Button
            color="primary"
            className={classes.button}
            onClick={props.handleCancel}
            fullWidth
          >
            Annuler
            </Button>
        </Grid>
        <Grid item xs={5}>
          <Button
            color="primary"
            className={classes.button}
            fullWidth
            onClick={() => props.handleClickAccept(sportif, checkedWhiteList, checkedMiniAdmin)}
          >
            Sauvegarder
            </Button>
        </Grid>
      </Grid>
    </div>
  )
}
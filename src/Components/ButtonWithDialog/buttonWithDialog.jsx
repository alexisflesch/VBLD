import React, { Fragment } from 'react';

import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SportsVolleyballIcon from '@material-ui/icons/SportsVolleyball';
import FlightIcon from '@material-ui/icons/Flight';
import AccessibleIcon from '@material-ui/icons/Accessible';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  align: {
    // margin: theme.spacing(1),
    // textAlign: 'left!',
  },
  button: {
    textTransform: 'none',
  }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  var pres = props.present;
  var sportif = props.sportif;

  function getIconColor(pres) {
    if (pres === 'present') {
      var newIcon = <CheckIcon color="primary" />;
      var newColor = 'default';
    }
    else if (pres === 'absent') {
      var newIcon = <ClearIcon color="secondary" />;
      var newColor = 'default';
    }
    else if (pres === 'si besoin') {
      var newIcon = <AccessibleIcon color="secondary" />;
      var newColor = 'default';
    }
    else if (pres === '?') {
      var NewIcon = '';
      var newColor = 'default';
    }
    return [newIcon, newColor];
  }

  const [starticon, startcolor] = getIconColor(pres);
  const [icon, setIcon] = React.useState(starticon);
  const [color, setColor] = React.useState(startcolor);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  function setPresence(pres) {
    const [newIcon, newColor] = getIconColor(pres);
    setIcon(newIcon);
    setColor(newColor);
    handleClose();
  }


  return (
    <Fragment>
      <Container maxWidth="xs">
        <Box m={.5} />
        <Button variant="contained"
          color={color}
          onClick={handleClickOpen}
          className={classes.button}
          fullWidth>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={10}>
              {sportif}
            </Grid>
            <Grid item xs={2}>
              {icon}
            </Grid>
          </Grid>
        </Button>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {sportif}
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button onClick={() => setPresence("present")}>
              <ListItemIcon>
                <SportsVolleyballIcon />
              </ListItemIcon>
              <ListItemText primary="Présent" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => setPresence("absent")}>
              <ListItemIcon>
                <FlightIcon />
              </ListItemIcon>
              <ListItemText primary="Absent" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => setPresence("si besoin")}>
              <ListItemIcon>
                <AccessibleIcon />
              </ListItemIcon>
              <ListItemText primary="Si besoin" />
            </ListItem>
          </List>
        </Dialog>
      </Container>
    </Fragment>
  );
}


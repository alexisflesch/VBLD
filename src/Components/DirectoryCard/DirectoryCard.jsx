import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import UserInfo from './UserInfo2';
import ButtonsAdmin from './ButtonsAdmin';
import ButtonsNormal from './ButtonsNormal';


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    marginBottom: 0,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  action: {
    margin: theme.spacing(1),
    padding: 0,
  },
  avatar: {
    marginTop: -11,
    // marginBottom: -7,
    padding: 0,
    marginRight: theme.spacing(2),
  },
  card: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    height: 50,
    backgroundColor: "#E9F1F7",
  },
  titre: {
    marginTop: -14,
    marginBottom: -7,
  },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function getBackgroundColor(theme, authorized) {
  let backgroundColor;
  if (authorized) {
    backgroundColor = theme.palette.primary.main;
  }
  else {
    backgroundColor = blueGrey[400];
  }
  return backgroundColor
}



export default function MyCard(props) {
  const classes = useStyles();
  const { sportif, boutons, authorized, handleClickAccept, handleClickBan } = props;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  let Buttons
  if (boutons === 'normal') {
    Buttons = <ButtonsNormal handleClickAccept={handleClose} buttonName="Fermer" />
  }
  else if (boutons === 'admin') {
    Buttons = <ButtonsAdmin
      handleClickAccept={() => { handleClickAccept(); handleClose() }}
      handleClickBan={() => { handleClickBan(); handleClose() }}
    />
  }

  return (
    <Container maxWidth="xs" >

      <Card className={classes.card} elevation={4} onClick={handleClickOpen}>
        <CardActionArea >
          <CardContent>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <Avatar className={classes.avatar}
                  style={{ backgroundColor: getBackgroundColor(theme, authorized) }} >
                  {sportif['nom'].substring(0, 1)}
                </ Avatar>
              </Grid>
              <Grid item>
                <Typography className={classes.titre} variant="subtitle1">
                  {sportif['nom'] + ' ' + sportif['prenom']}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {sportif['email']}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>


      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>

        <UserInfo
          nom={sportif['nom']}
          prenom={sportif['prenom']}
          email={sportif['email']}
          telephone={sportif['telephone']}
          civilite={sportif['civilite']}
        />

        <Box p={8} />
        {Buttons}

      </Dialog>
    </Container >
  );
}
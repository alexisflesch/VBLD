import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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
import PseudoNomPrenom from '../UtilityScripts/PseudoNomPrenom'


const useStyles = makeStyles(theme => ({
  avatar: {
    marginTop: -11,
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
  const { sportif, boutons, handleClickAccept, affichagePseudos } = props;
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
    Buttons = <ButtonsNormal handleClickAccept={handleClose} buttonName="Fermer" space={8} />
  }
  else if (boutons === 'admin') {
    Buttons = <ButtonsAdmin
      sportif={sportif}
      handleClickAccept={(a, b, c) => { handleClickAccept(a, b, c); handleClose() }}
      handleCancel={() => handleClose()}
    />
  }

  var affichageNomPrenomPseudo = PseudoNomPrenom(sportif, affichagePseudos)


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
                  style={{ backgroundColor: getBackgroundColor(theme, sportif['onWhiteList']) }} >
                  {affichageNomPrenomPseudo.substring(0, 1)}
                </ Avatar>
              </Grid>
              <Grid item>
                <Typography className={classes.titre} variant="subtitle1">
                  {affichageNomPrenomPseudo}
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
          pseudo={sportif['pseudo']}
          email={sportif['email']}
          telephone={sportif['telephone']}
          civilite={sportif['civilite']}
        />

        {Buttons}

      </Dialog>
    </Container >
  );
}
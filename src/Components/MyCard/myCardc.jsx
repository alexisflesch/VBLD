import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar'
import BipBip from '../../images/bipbip2.png'
import Coyotte from '../../images/coyotte2.png'

import Selection from './Selection';
import PresenceCivilite from '../UtilityScripts/PresenceCivilite'
import getBackgroundColor from '../UtilityScripts/Colors'
import generateOptions from '../UtilityScripts/OptionsPresence'

import Nourriture from '../Pots/Nourriture'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  avatar: {
    marginTop: -11,
    padding: 0,
  },
  avatarSelections: {
    width: 20,
    height: 20,
    color: "#000000",
    backgroundColor: "#ffffff",
    marginLeft: -12,
    marginTop: -12,
    paddingLeft: 0,
  },
  card: {
    marginTop: 5,
    marginBottom: 5,
    height: 50,
  },
  superCard: {
    marginTop: 5,
    marginBottom: 5,
    height: 50,
  },
  titre: {
    marginTop: -14,
    marginBottom: -7,
  },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




export default function MyCard(props) {
  const classes = useStyles();
  const { sportif, options, handleUpdateSportif, handleSaveCoach, highlight, coach, updateable, pot, handleUpdatePot } = props;
  const [open, setOpen] = React.useState(false);
  var backgroundColor = getBackgroundColor(sportif)

  //Should we ever show the user's card differently
  if (highlight) {
    classes.myCard = classes.superCard
  }
  else {
    classes.myCard = classes.card
  }


  //Que faire quand on définit sa présence ?
  function setPresence(pres) {
    // Si on est sélectionné pour le match et qu'il
    // s'agit de l'affichage de l'entraînement, on ne change rien
    // (purement cosmétique, le joueur apparaissant en rose, cela permet
    // d'éviter un bug d'affichage)
    // S'il s'agit du coach ou d'un pot, on ne ferme pas
    sportif['present'] = pres
    if (sportif['present'] !== 'Match') {
      handleUpdateSportif(sportif)
    }
    if (!coach && !pot) {
      handleClose()
    }
  }

  //Options de présence (à modifier pour le coach)
  var dialogOptions = generateOptions(options, sportif, setPresence, coach, highlight, updateable)


  //Sauvegarde depuis l'interface coach
  function handleSave() {
    handleSaveCoach(sportif)
    handleClose()
  }

  //Sauvegarde depuis l'interface pot
  function handleSavePot() {
    handleUpdatePot(sportif)
    handleClose()
  }

  //On peut cliquer sur un sportif dans tous les cas suivants :
  // - Il s'agit de nous-même
  // - On est coach
  // - On fait partie des "trustedUsers" du sportif
  const handleClickOpen = () => {
    if (highlight || coach || updateable) {
      setOpen(true);
    }
  };

  //Fermeture du tiroir
  const handleClose = () => {
    setOpen(false);
  };

  //Affichage de Présent ou Présente en fonction de la civilité
  let presentCiv
  if (!pot) {
    presentCiv = PresenceCivilite(sportif, sportif['present'])
  }
  else {
    var nourriture = []
    if (sportif['boissons']) {
      nourriture.push(sportif['boissons'])
    }
    if (sportif['sucre']) {
      nourriture.push(sportif['sucre'])
    }
    if (sportif['sale']) {
      nourriture.push(sportif['sale'])
    }
    if (sportif['autres']) {
      nourriture.push(sportif['autres'])
    }
    if (nourriture.length === 0) {
      presentCiv = <div>&nbsp;</div>
    }
    else {
      presentCiv = nourriture.join(' - ')
    }
  }


  //S'agit-il du coach ?
  let coachStuff, nbSelections
  if (coach) {
    coachStuff = <Selection sportif={sportif} handleSave={handleSave} />
    nbSelections = (
      <Grid item xs={1}>
        <Avatar variant="rounded" className={classes.avatarSelections}>
          <Typography variant='caption'>
            {sportif['nbSelections']}
          </Typography>
        </Avatar>
      </Grid>
    )
  }

  //S'agit-il d'un pot ?
  let potStuff
  if (pot) {
    potStuff = <Nourriture
      sportif={sportif}
      handleSave={handleSavePot} />
  }


  //S'agit-il d'un joueur sélectionné ?
  if (sportif['selectionne'] && sportif['selectionne']['selectionne']) {
    //Choix de l'avatar
    let photo
    if (sportif['civilite'] === 'bipbip') {
      photo = BipBip
    }
    else {
      photo = Coyotte
    }
    var avatar = (
      <Avatar alt="X" src={photo} className={classes.avatar} />
    )
    //Renseignement du ou des postes
    var postes = []
    if (sportif['selectionne']['passe']) {
      postes.push('Passe')
    }
    if (sportif['selectionne']['centre']) {
      postes.push('Centre')
    }
    if (sportif['selectionne']['quatre']) {
      postes.push('Poste 4')
    }
    if (postes.length === 0) {
      presentCiv = 'Complet'
    }
    else {
      presentCiv = postes.join('/')
    }
  }


  return (
    <Container maxWidth="xs" >
      <Card className={classes.myCard} elevation={4}
        style={{ backgroundColor }} onClick={handleClickOpen}
      >
        <CardActionArea >
          <CardContent>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              {nbSelections}
              <Grid item xs>

                <Typography className={classes.titre} variant="subtitle1">
                  {sportif['nom'] + ' ' + sportif['prenom']}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {presentCiv}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                {avatar}
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>


      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {sportif['nom'] + ' ' + sportif['prenom']}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {dialogOptions}
        </List>
        {coachStuff}
        {potStuff}
      </Dialog>
    </Container >
  );
}
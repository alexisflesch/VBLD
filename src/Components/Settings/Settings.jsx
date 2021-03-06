import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ButtonsNormal from '../DirectoryCard/ButtonsNormal';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PopUpDialog from './PopUpDialog'
import HelpIcon from '@material-ui/icons/Help';
import Help from './Help'

import GetUserData, { getSportifs } from '../UtilityScripts/FindStuff';
import FirebaseContext from '../Firebase/FirebaseContext'
import firebase from '../Firebase/firebase';

import UserInfo from '../DirectoryCard/UserInfo';
import LoadingDiv from '../LoadingDiv/LoadingDiv'
import TabMenu from './TabMenu'


const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
  icon: {
    fontSize: 20,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

//Function to verify that an email adress is valid
function validateEmail(email) {
  var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function Settings() {
  const classes = useStyles();

  //Firebase stuff
  const { trees, loadings, errors, user, setTriPresence, affichagePseudos } = useContext(FirebaseContext)
  const treeP = trees['treeP']
  const loadingP = loadings['loadingP']
  const errorP = errors['errorP']
  const userId = user['uid']
  const userDataInit = GetUserData(treeP, loadingP, errorP)

  const sportifs = getSportifs(trees['treeW'], loadings['loadingW'], errors['errorW'],
    trees['treeU'], loadings['loadingU'], errors['errorU'], userId)


  const [checkedTri, setCheckedTri] = React.useState(userDataInit['triPresence']);
  const [checkedMeFirst, setCheckedMeFirst] = React.useState(userDataInit['meFirst']);
  const [nom, setNom] = React.useState(userDataInit['nom']);
  const [prenom, setPrenom] = React.useState(userDataInit['prenom']);
  const [pseudo, setPseudo] = React.useState(userDataInit['pseudo']);
  const [email, setEmail] = React.useState(
    userDataInit['email']
      ? userDataInit['email']
      : 'Chargement...');
  const [telephone, setTelephone] = React.useState(userDataInit['telephone']);
  const [civilite, setCivilite] = React.useState(userDataInit['civilite']);
  const [trustedUsers, setTrustedUsers] = React.useState(userDataInit['trustedUsers'])
  const [homePage, setHomePage] = React.useState(
    userDataInit['homePage']
      ? userDataInit['homePage']
      : 'news'
  )

  //SnackBar
  const [openBar, setOpenBar] = React.useState(false);
  const [message, setMessage] = React.useState('')

  //Utilisateurs de confiance : state pour le dialog
  const [openConf, setOpenConf] = React.useState(false);

  //Boîtes de dialogue d'aide
  const [openHelpTri, setOpenHelpTri] = React.useState(false)
  const [openHelpMeFirst, setOpenHelpMeFirst] = React.useState(false)


  //Chargement
  if (loadingP || !userDataInit) {
    return <LoadingDiv />
  }

  //If user has been validated, he can't change name/firstname
  var disabled = false
  if (userDataInit['registred']) {
    disabled = true
  }

  function handleSave(event) {
    //Checking that phone number and email are correct
    if (telephone && telephone.length !== 10 && telephone.length !== 0) {
      setMessage('Téléphone incorrect')
      setOpenBar(true)
      return
    }
    else if (email && !validateEmail(email)) {
      setMessage('Adresse email incorrecte')
      setOpenBar(true)
      return
    }
    //Setting stuff that can always be changed
    var myRef = firebase.database().ref('/users/' + userId + '/readWrite')
    const pseudoT = pseudo ? pseudo : ''
    const emailT = email ? email : ''
    const telephoneT = telephone ? telephone : ''
    const triPresence = checkedTri
    const meFirst = checkedMeFirst
    const trustedUsersT = trustedUsers ? trustedUsers : {}
    myRef.set({
      pseudo: pseudoT,
      email: emailT,
      telephone: telephoneT,
      triPresence,
      meFirst,
      civilite,
      trustedUsers: trustedUsersT,
      affichagePseudos,
      homePage: homePage,
    })
    //Setting stuff that can be changed at the begining of the
    //registration process only
    if (!userDataInit['registred']) {
      myRef = firebase.database().ref('/users/' + userId + '/readOnly')
      const nomT = nom ? nom : ''
      const prenomT = prenom ? prenom : ''
      myRef.set({
        nom: nomT,
        prenom: prenomT,
      })
    }
    //Setting up the app according
    //in case we are offline
    if (checkedTri) {
      setTriPresence(true)
    }
    else {
      setTriPresence(false)
    }
    setMessage('Paramètres sauvegardés')
    setOpenBar(true)
  }

  function handleCloseBar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpenBar(false);
  };


  function handleChangeCivilite(event) {
    setCivilite(event.target.value)
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value)
  }

  function handleChangePseudo(event) {
    if (event.target.value.length < 20) {
      setPseudo(event.target.value)
    }
  }

  function handleChangeTelephone(event) {
    //Only accept valid phone numbers or no phone number
    if (event.target.value.length === 0) {
      setTelephone(event.target.value)
      return
    }
    var reg = /^\d+$/;
    if (!reg.test(event.target.value) || event.target.value.length > 10) {
      return
    }
    setTelephone(event.target.value)
  }

  function handleChangeNom(event) {
    setNom(event.target.value)
  }

  function handleChangePrenom(event) {
    setPrenom(event.target.value)
  }

  function handleChangeTri(event) {
    setCheckedTri(event.target.checked)
  }

  function handleChangeMeFirst(event) {
    setCheckedMeFirst(event.target.checked)
  }

  function handleClickConfiance() {
    setOpenConf(true)
  }

  function handleClickHelpTri() {
    setOpenHelpTri(true)
  }

  function handleClickHelpMeFirst() {
    setOpenHelpMeFirst(true)
  }

  return (
    <>
      {/* Pop-up d'aide pour le tri et autres*/}
      <Help
        open={openHelpTri}
        setOpen={setOpenHelpTri}
        content='tri'
      />
      <Help
        open={openHelpMeFirst}
        setOpen={setOpenHelpMeFirst}
        content='meFirst'
      />

      <Container maxWidth="xs" >

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={openBar}
          autoHideDuration={6000}
          onClose={handleCloseBar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">
            {message}
          </span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleCloseBar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />

        <Box m={2} />
        <UserInfo
          civilite={civilite} handleChangeCivilite={handleChangeCivilite}
          pseudo={pseudo} handleChangePseudo={handleChangePseudo}
          nom={nom} handleChangeNom={handleChangeNom}
          prenom={prenom} handleChangePrenom={handleChangePrenom}
          email={email} handleChangeEmail={handleChangeEmail}
          telephone={telephone} handleChangeTelephone={handleChangeTelephone}
          disabled={disabled}
        />
        <Box m={2} />
        {/* <Divider /> */}
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={0}
        >
          <Grid item xs={8}>
            <Typography>
              Trier les listes par présence
      </Typography>
          </Grid>
          <Grid item xs={2}>
            <Switch checked={checkedTri} color='primary' onChange={handleChangeTri} value="checkedTri" />
          </Grid>
          <Grid item>
            <IconButton
              aria-label="aide"
              color="primary"
              onClick={handleClickHelpTri}
            >
              <HelpIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={0}
        >
          <Grid item xs={8}>
            <Typography>
              M'afficher en premier
      </Typography>
          </Grid>
          <Grid item xs={2}>
            <Switch checked={checkedMeFirst} color='primary' onChange={handleChangeMeFirst} value="checkedMeFirst" />
          </Grid>
          <Grid item>
            <IconButton
              aria-label="aide"
              color="primary"
              onClick={handleClickHelpMeFirst}
            >
              <HelpIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Box p={1.5} />

        <Button variant="outlined" color="primary" onClick={handleClickConfiance}>
          Utilisateurs de confiance
        </Button>
        <PopUpDialog
          open={openConf}
          setOpen={setOpenConf}
          setTrustedUsers={setTrustedUsers}
          trustedUsers={trustedUsers ? trustedUsers : {}}
          sportifs={sportifs}
        />
        <Box p={.5} />
        <TabMenu homePage={homePage} setHomePage={setHomePage} />
        {/* <Box p={.5} /> */}
        <ButtonsNormal buttonName="Sauvegarder" handleClickAccept={handleSave} space={2.5} />
      </Container>
    </>
  )
}
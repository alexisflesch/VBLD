import React, { Fragment, useContext } from 'react';
import { Typography } from '@material-ui/core';

import FirebaseContext from '../Firebase/FirebaseContext'
import { GetAdminData } from '../UtilityScripts/TreeParsing';
import LoadingDiv from '../LoadingDiv/LoadingDiv';
import DirectoryCard from '../DirectoryCard/DirectoryCard';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'

import ButtonsNormal from '../DirectoryCard/ButtonsNormal';
// import createEntrainements, { createMatchs } from '../UtilityScripts/createStuff';
import firebase from '../Firebase/firebase';


const useStyles = makeStyles(theme => ({
  tabs: {
    marginBottom: theme.spacing(2),
  },
  margins: {
    paddingTop: theme.spacing(1),
    margin: 0,
  }
}));


export default function Administration() {
  const classes = useStyles();

  const { trees, loadings, errors } = useContext(FirebaseContext)

  //Création de la liste si elle existe
  const data = GetAdminData(trees['treeU'], trees['treeW'])
  let annuaire
  if (!data) {
    annuaire = ('Problème')
  }
  else {
    annuaire = (
      data.map(sportif => <DirectoryCard key={sportif['uid']}
        sportif={sportif}
        authorized={sportif['authorized']}
        boutons="admin"
        handleClickAccept={() => handleClickAccept(sportif)}
        handleClickBan={() => handleClickBan(sportif)}
      />)
    )
  }

  const [valueTab, setValueTab] = React.useState(0);
  const [content, setContent] = React.useState(annuaire);

  //Chargement en cours ou utilisateur non autorisé ou erreur Firebase
  if (loadings['loadingTreeU'] || loadings['loadingTreeW']) {
    return <LoadingDiv />
  }
  else if (errors['errorTreeU'] || errors['errorTreeW']) {
    return (
      <Fragment>
        <h3>Erreur</h3>
        <Typography>
          Une erreur est survenue : {errors['errorTreeU']}, {errors['errorTreeW']}
        </Typography>
      </Fragment>
    )
  }


  function handleClickAccept(sportif) {
    console.log("Authorizing user")
    console.log(sportif['uid'])
    var myRef = firebase.database().ref('/whiteList/' + sportif['uid'])
    myRef.set({ admin: false, coach: false })
    myRef = firebase.database().ref('/users/' + sportif['uid'] + '/readOnly/registred')
    myRef.set(true)
  }

  function handleClickBan(sportif) {
    console.log("Removing user from whiteList (provided that he is in it)")
    console.log(sportif['uid'])
    var myRef = firebase.database().ref('/whiteList/' + sportif['uid'])
    myRef.remove()
  }

  function handleClickCreateEntrainements() {
    console.log("Creatings")
    var deb = new Date("2019-09-09")
    var fin = new Date("2020-07-01")
    console.log(deb, fin)
    // createEntrainements(firebase, deb, fin)
  }

  function handleClickCreateMatchs() {
    console.log("Creatings matchs")
    // createMatchs(firebase)
  }

  //Création des fonctionnalités avancées
  //À paufiner par la suite (en particulier si on souhaite ajouter des administrateurs)
  var FabricationEntrainements = (
    <Fragment>
      <Typography>
        Utiliser le bouton ci-dessous pour créer tous les entraînements
      </Typography>
      <Box p={1} />
      <ButtonsNormal buttonName="Créer" handleClickAccept={handleClickCreateEntrainements} />
      <Box p={5} />
      <Typography>
        Utiliser le bouton ci-dessous pour créer tous les matchs
     </Typography>
      <Box p={1} />
      <ButtonsNormal buttonName="Créer" handleClickAccept={handleClickCreateMatchs} />
    </Fragment >
  )



  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
    if (newValue === 1) {
      setContent(FabricationEntrainements)
    }
    else {
      setContent(annuaire)
    }
  };


  return (
    <Fragment>
      <Paper square className={classes.tabs}>
        <Tabs
          value={valueTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChangeTab}
          aria-label="disabled tabs example"
          variant="fullWidth"
        >
          <Tab label="Utilisateurs" />
          <Tab label="Événements" />
        </Tabs>
      </Paper>
      <div className={classes.margins}>
        {content}
      </div>
    </Fragment>
  )
}
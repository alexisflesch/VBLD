import React from 'react';
import News from '../Nouvelles/News';
import ResponsiveDrawer from '../Drawer/MyDrawer';
import firebase from '../Firebase/firebase';

import { FirebaseProvider } from '../Firebase/FirebaseContext';
import { useObjectVal } from 'react-firebase-hooks/database';

import { isAdmin } from '../UtilityScripts/FindStuff';
import { correspondanceMain } from '../UtilityScripts/correspondance'


function MainApp(props) {

  //user
  const { user } = props;

  //Firebase stuff : will be put in FirebaseContext later
  const [treeU, loadingU, errorU] = useObjectVal(firebase.database().ref('/users'));
  const [treeE, loadingE, errorE] = useObjectVal(firebase.database().ref('/evenements'));
  const [treeW, loadingW, errorW] = useObjectVal(firebase.database().ref('/whiteList'));

  //On permission error, the user is new to the App (not on whiteList).
  var newUser = false;
  if (errorU && errorU.code === "PERMISSION_DENIED") {
    newUser = true;
  }

  //This is the only thing a new user has access to (its own personnal data)
  //P stands for "personnal"
  const directory = "/users/" + user['uid']
  const [treeP, loadingP, errorP] = useObjectVal(firebase.database().ref(directory));

  //If the user is not on the whiteList yet, maybe he hasn't set up his
  //own personnal data yet, checking and updating if necessary
  if (newUser && !loadingP && !errorP && !treeP) {
    var nom = user['displayName']
    if (!nom) {
      nom = '?'
    }
    var myRef = firebase.database().ref(directory + '/readOnly')
    myRef.set({ nom })
    myRef = firebase.database().ref(directory + '/readWrite')
    myRef.set({
      email: user['email'],
      civilite: 'bipbip',
      triPresence: true,
      meFirst: true,
      pseudo: '',
      homePage: 'news',
      affichagePseudos: 'Nom Prénom',
    })
  }

  //Is current user admin ? If so, he should be able to access the admin tab
  const admin = isAdmin(treeW, loadingW, errorW, user['uid'])

  //Too many variable names, keeping things clean
  const trees = { treeU, treeE, treeW, treeP };
  const loadings = { loadingU, loadingE, loadingW, loadingP };
  const errors = { errorU, errorE, errorW, errorP };

  //Values to pass to the drawer
  const [mainDiv, setMainDiv] = React.useState(<News />);
  const [pageName, setPageName] = React.useState('Accueil');


  //Icône pour trier les sportifs ('a-z' ou 'presence')
  //On ajoutera dans le contexte principal un booléen qui passera à true quand il faudra trier
  //  - menu : chaîne de caractères affichée dans la bar principale (bouton de tri ou rien)
  //  - tri : le type de tri sur la liste des sportifs
  const [pseudoMenu, setPseudoMenu] = React.useState('')
  const [sortMenu, setSortMenu] = React.useState('');
  const [triPresence, setTriPresence] = React.useState(true)

  // State pour basculer l'affichage nom-prenom-pseudo
  const [affichagePseudos, setAffichagePseudos] = React.useState('Nom Prénom')

  // Mise à jour des states en fonction de firebase
  // Affichage de l'onglet renseigné dans les paramètres le cas échéant
  const [loadingFirstTime, setLoadingFirstTime] = React.useState(true)
  React.useEffect(() => {
    if (!errorP && !loadingP) {
      setTriPresence(treeP['readWrite']['triPresence'])
      if (treeP['readWrite']['affichagePseudos']) {
        setAffichagePseudos(treeP['readWrite']['affichagePseudos'])
      }
      if (loadingFirstTime && treeP['readWrite']['homePage']) {
        handleDivChange(treeP['readWrite']['homePage'])
        setLoadingFirstTime(false)
      }
    }
  }, [errorP, treeP, loadingP, loadingFirstTime]);


  function handleDivChange(newDiv) {
    //Mise à jour de l'affichage
    if (newDiv === "disconnect") {
      firebase.auth().signOut();
    }
    else {
      setPageName(correspondanceMain[newDiv][0]);
      setMainDiv(correspondanceMain[newDiv][1])
      setSortMenu(correspondanceMain[newDiv][2])
      setPseudoMenu(correspondanceMain[newDiv][3])
    }
  }



  return (
    <FirebaseProvider value={{
      user,
      trees,
      loadings,
      errors,
      triPresence, setTriPresence,
      affichagePseudos, setAffichagePseudos,
    }}>
      <div>
        <ResponsiveDrawer
          div={mainDiv}
          pageName={pageName}
          handleChange={handleDivChange}
          sortMenu={sortMenu}
          pseudoMenu={pseudoMenu}
          admin={admin}
          newUser={newUser}
        />
      </div>
    </FirebaseProvider>
  );
}

export default MainApp;
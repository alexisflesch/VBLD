import React from 'react';

import Matchs from '../Matchs/Matchs';
import News from '../Nouvelles/News';
import Pots from '../Pots/Pots'
import Entrainements from '../Entrainements/Entrainements';
import ResponsiveDrawer from '../Drawer/MyDrawer';
import Settings from '../Settings/Settings';
import Annuaire from '../Annuaire/Annuaire';
import Gymnases from '../Gymnases/Gymnases';
import Administration from '../Administration/Administration';
import Resultats from '../Resultats/Resultats'

import firebase from '../Firebase/firebase';
import { FirebaseProvider } from '../Firebase/FirebaseContext';

import { useObjectVal } from 'react-firebase-hooks/database';
import SortMenu from '../SortMenu/SortMenu';
import PseudoMenu from '../SortMenu/PseudoMenu'

import { isAdmin } from '../UtilityScripts/FindStuff';



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
      meFirst: true
    })
  }

  //Is current user admin ? If so, he should be able to access the admin tab
  const admin = isAdmin(treeW, loadingW, errorW, user['uid'])

  //Too many variable names, keeping things clean
  const trees = { treeU, treeE, treeW, treeP };
  const loadings = { loadingU, loadingE, loadingW, loadingP };
  const errors = { errorU, errorE, errorW, errorP };

  //Values to pass to the drawer
  const [mainDiv, setMainDiv] = React.useState(<Entrainements />);
  const [pageName, setPageName] = React.useState('Entraînements');


  //Icône pour trier les sportifs ('a-z' ou 'presence')
  //On ajoutera dans le contexte principal un booléen qui passera à true quand il faudra trier
  //  - menu : chaîne de caractères affichée dans la bar principale (bouton de tri ou rien)
  //  - tri : le type de tri sur la liste des sportifs
  const [pseudoMenu, setPseudoMenu] = React.useState(<PseudoMenu />)
  const [sortMenu, setSortMenu] = React.useState(<SortMenu />);
  const [triPresence, setTriPresence] = React.useState(true)

  // State pour basculer l'affichage nom-prenom-pseudo
  const [affichagePseudos, setAffichagePseudos] = React.useState('Nom Prénom')

  // Mise à jour des states en fonction de firebase
  React.useEffect(() => {
    if (!errorP && !loadingP) {
      setTriPresence(treeP['readWrite']['triPresence'])
      if (treeP['readWrite']['affichagePseudos']) {
        setAffichagePseudos(treeP['readWrite']['affichagePseudos'])
      }
    }
  }, [errorP, treeP, loadingP]);


  function handleDivChange(newDiv) {
    //Mise à jour de l'affichage
    const correspondance = {
      "entrainements": ["Entraînements", <Entrainements />, <SortMenu />, <PseudoMenu />],
      "matchs": ["Matchs", <Matchs />, <SortMenu />, <PseudoMenu />],
      "news": ["Accueil", <News />, "", ""],
      "pots": ["Pots", <Pots />, <SortMenu />, <PseudoMenu />],
      "gymnases": ["Gymnases", <Gymnases />, "", ""],
      "annuaire": ["Annuaire", <Annuaire />, "", <PseudoMenu />],
      "settings": ["Paramètres", <Settings />, "", ""],
      "administration": ["Administration", <Administration />, "", ""],
      "resultats": ["Résultats", <Resultats />, "", ""],
    }
    if (newDiv === "disconnect") {
      firebase.auth().signOut();
    }
    else {
      setPageName(correspondance[newDiv][0]);
      setMainDiv(correspondance[newDiv][1])
      setSortMenu(correspondance[newDiv][2])
      setPseudoMenu(correspondance[newDiv][3])
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
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

import firebase from '../Firebase/firebase';
import { FirebaseProvider } from '../Firebase/FirebaseContext';

import { useObjectVal } from 'react-firebase-hooks/database';
import SortMenu from '../SortMenu/SortMenu';

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
  const [mainDiv, setMainDiv] = React.useState(<News />);
  const [pageName, setPageName] = React.useState('Accueil');

  //Icône pour trier les sportifs ('a-z' ou 'presence')
  //On ajoutera dans le contexte principal un booléen qui passera à true quand il faudra trier
  //  - menu : chaîne de caractères affichée dans la bar principale (bouton de tri ou rien)
  //  - tri : le type de tri sur la liste des sportifs
  const [menu, setMenu] = React.useState('');
  const [triPresence, setTriPresence] = React.useState(true)

  function handleDivChange(newDiv) {
    var futureDiv = "";
    var futureName = "";
    var futureMenu = "";
    if (newDiv === "disconnect") {
      firebase.auth().signOut();
    }
    if (newDiv === "news") {
      futureDiv = <News />
      futureName = "Accueil"
    }
    else if (newDiv === "matchs") {
      futureDiv = <Matchs />
      futureName = "Matchs"
      futureMenu = <SortMenu />
    }
    else if (newDiv === "entrainements") {
      futureDiv = <Entrainements />
      futureName = "Entraînements"
      futureMenu = <SortMenu />
    }
    else if (newDiv === "pots") {
      futureDiv = <Pots />
      futureName = "Pots"
    }
    else if (newDiv === "settings") {
      futureDiv = <Settings />
      futureName = "Paramètres"
    }
    else if (newDiv === "gymnases") {
      futureDiv = <Gymnases />
      futureName = "Gymnases"
    }
    else if (newDiv === "annuaire") {
      futureDiv = <Annuaire />
      futureName = "Annuaire"
    }
    else if (newDiv === "administration") {
      futureDiv = <Administration />
      futureName = "Administration"
    }
    setMainDiv(futureDiv);
    setPageName(futureName);
    setMenu(futureMenu)
  }



  return (
    <FirebaseProvider value={{ user, trees, loadings, errors, triPresence, setTriPresence }}>
      <div>
        <ResponsiveDrawer
          div={mainDiv}
          pageName={pageName}
          handleChange={handleDivChange}
          menu={menu}
          admin={admin}
          newUser={newUser}
        />
      </div>
    </FirebaseProvider>
  );
}

export default MainApp;
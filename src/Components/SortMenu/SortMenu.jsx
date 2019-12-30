import React, { useContext } from 'react'

import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import IconButton from '@material-ui/core/IconButton';

import firebase from '../Firebase/firebase'
import FirebaseContext from '../Firebase/FirebaseContext'

export default function SimpleMenu() {

  //Context de firebase : setTriPresence(...) demande à (re)trier
  const { triPresence, setTriPresence, user } = useContext(FirebaseContext);

  function handleClick(event) {
    var myRef = firebase.database().ref('/users/' + user['uid'] + '/readWrite/triPresence')
    myRef.set(!triPresence)
    setTriPresence(!triPresence)
  };

  return (
    <IconButton
      aria-controls="simple-menu"
      aria-haspopup="true"
      color="inherit"
      onClick={() => handleClick()}
    >
      <SortByAlphaIcon />
    </IconButton>
  );
}
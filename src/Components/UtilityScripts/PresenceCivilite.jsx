// import React from 'react'


export default function PresenceCivilite(sportif, opt) {
  //Affiche présent ou présente en fonction de la civilité
  //Inputs :
  //  - sportif : arbre contenant civilite, nom, prenom, uid...
  //  - opt : option parmi {'Présent(e)', 'Absent(e)', 'Provisoire', etc...}
  var presentCiv = opt;
  if (presentCiv === 'Absent(e)') {
    if (sportif['civilite'] === 'bipbip') {
      presentCiv = 'Absente'
    }
    else {
      presentCiv = 'Absent'
    }
  }
  else if (presentCiv === 'Présent(e)') {
    if (sportif['civilite'] === 'bipbip') {
      presentCiv = 'Présente'
    }
    else {
      presentCiv = 'Présent'
    }
  }
  return presentCiv
}
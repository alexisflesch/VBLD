import React, { useContext } from 'react'
import MyCard from '../MyCard/MyCard'
import Typography from '@material-ui/core/Typography'

import FirebaseContext from '../Firebase/FirebaseContext'
import firebase from '../Firebase/firebase';

import { extractPresence, extractPresencePot, mySort, nombreSelections } from '../UtilityScripts/TreeParsing'
import LoadingDiv from '../LoadingDiv/LoadingDiv';


function isUserCoach(user, loadingW, treeW) {
  if (loadingW || !treeW) {
    return false
  }
  else {
    return (treeW[user['uid']]['coach'])
  }
}


function updateListSportifs(dateId, userId, trees, loadings, errors, trainingOrMatch, triPresence, affichagePseudos) {
  //Fonction qui met à jour la liste des sportifs
  if (loadings['loadingW'] || loadings['loadingU']) return []

  //Pour que ça soit lisible
  const { treeE, treeU, treeW, treeP } = trees;
  const { loadingE, loadingU, loadingW, loadingP } = loadings;
  const { errorP } = errors;
  const branchName = trainingOrMatch

  let sportifs
  if (trainingOrMatch === 'pots') {
    ({ sportifs } = extractPresencePot(treeE, loadingE, treeW, loadingW, treeU, loadingU, dateId))
  }
  else {
    ({ sportifs } = extractPresence(treeE, loadingE, treeW, loadingW, treeU, loadingU, branchName, dateId))
  }

  //Tri des sportifs
  //Show me first ?
  let meFirst
  if (!loadingP && !errorP) {
    meFirst = treeP['readWrite']['meFirst']
  }
  sportifs.sort(mySort(triPresence, meFirst, userId, affichagePseudos))

  return sportifs
}



export default function ListeSportifs(props) {

  const { trees, loadings, errors,
    user,
    triPresence,
    affichagePseudos,
  } = useContext(FirebaseContext)

  const { currentDateId, trainingOrMatch } = props;

  //Get userId to highlight current user
  const userId = user['uid']

  //Liste des sportifs
  var sportifs = updateListSportifs(currentDateId, userId, trees, loadings, errors, trainingOrMatch, triPresence, affichagePseudos)

  //Is current user coach ?
  let coach
  if (trainingOrMatch !== 'matchs') {
    coach = false
  }
  else {
    coach = isUserCoach(user, loadings['loadingW'], trees['treeW'])
  }

  //If current user is coach, add stuff to sportifs list
  if (coach) {
    sportifs = nombreSelections(trees['treeE'], loadings['loadingE'], trees['treeW'], loadings['loadingW'], currentDateId, sportifs)
  }


  //Liste des options de présence
  let options
  if (trainingOrMatch === 'entrainements' || trainingOrMatch === 'pots') {
    options = ['Présent(e)', 'Provisoire', 'Absent(e)']
  }
  else {
    options = ['Oui', 'Non', 'Si besoin']
  }

  function handleUpdateSportif(sportif) {
    //Fonction qui met à jour un sportif après modification éventuelle de sa présence
    var myRef = firebase.database().ref("evenements/").child(trainingOrMatch).child(currentDateId).child('inscrits').child(sportif['uid']).child('present')
    myRef.set(sportif['present'])
  }

  function handleUpdatePot(sportif) {
    var myRef = firebase.database().ref("evenements/").child(trainingOrMatch).child(currentDateId).child('inscrits').child(sportif['uid'])
    myRef.set({
      present: sportif['present'],
      boissons: sportif['boissons'],
      sucre: sportif['sucre'],
      sale: sportif['sale'],
      autres: sportif['autres'],
    })
  }

  //Sauvegarde de la sélection
  function handleSaveCoach(sportif) {
    var myRef = firebase.database().ref("evenements/").child(trainingOrMatch).child(currentDateId).child('selection').child(sportif['uid'])
    myRef.set(sportif['selectionne'])
  }

  //Affichage de la liste si elle existe
  let listeSportifs
  if (currentDateId === 'fake date id') {
    listeSportifs = <LoadingDiv />
  }
  else if (sportifs.length === 0) {
    listeSportifs = (
      <Typography align='justify'>
        Il y a eu une erreur quelque part.
        Votre compte a-t-il été bien validé ? Si ce n'est pas le cas,
        pensez à renseigner vos noms/prénoms dans l'onglet paramètres.

        Sinon, peut-être que l'événement auquel vous tentez d'accéder a été
        supprimé.
      </Typography>
    )
  }
  else {
    //Is it current user || a user that trusts current user
    for (const sportif of sportifs) {
      sportif['updateable'] = false
      if (sportif['uid'] === userId) {
        sportif['updateable'] = true
      }
      else {
        if (!sportif['trustedUsers']) {
          continue
        }
        else if (sportif['trustedUsers'][userId]) {
          sportif['updateable'] = true
        }
      }
    }
    //S'agit-il d'un pot ?
    var pot = false
    if (trainingOrMatch === 'pots') {
      pot = true
    }

    listeSportifs = (
      sportifs.map(sportif => <MyCard key={sportif['uid']}
        sportif={sportif}
        options={options}
        updateable={sportif['updateable']}
        affichagePseudos={affichagePseudos}
        coach={coach}
        handleUpdateSportif={handleUpdateSportif}
        handleSaveCoach={handleSaveCoach}
        handleUpdatePot={handleUpdatePot}
        pot={pot}
      />)
    )
  }

  return (
    <div>
      {listeSportifs}
    </div>
  )
}
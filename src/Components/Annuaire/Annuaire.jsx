import React, { Fragment, useContext } from 'react';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import FirebaseContext from '../Firebase/FirebaseContext'
import { GetDirectoryData } from '../UtilityScripts/TreeParsing';
import LoadingDiv from '../LoadingDiv/LoadingDiv';
import DirectoryCard from '../DirectoryCard/DirectoryCard'


export default function Annuaire() {

  const { trees, loadings, errors } = useContext(FirebaseContext)

  //Chargement en cours ou utilisateur non autorisé ou erreur Firebase
  if (loadings['loadingTreeU'] || loadings['loadingTreeW']) {
    return <LoadingDiv />
  }
  else if (errors['errorTreeU'] || errors['errorTreeW']) {
    return (
      <Fragment>
        <h3>Erreur</h3>
        <Typography>
          Une erreur est survenue : votre compte a-t-il bien été validé ? Si oui,
          veuillez ré-essayer plus tard.
        </Typography>
      </Fragment>
    )
  }

  const data = GetDirectoryData(trees['treeU'], trees['treeW'])
  //Affichage de la liste si elle existe
  let annuaire
  if (!data) {
    annuaire = ('Problème')
  }
  else {
    annuaire = (
      data.map(sportif => <DirectoryCard key={sportif['uid']}
        sportif={sportif}
        boutons="normal"
      />)
    )
  }


  return (
    <Fragment>
      <Box p={1.5} />
      {annuaire}
    </Fragment>
  )
}
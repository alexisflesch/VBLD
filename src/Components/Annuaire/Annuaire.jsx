import React, { Fragment, useContext } from 'react';
import Box from '@material-ui/core/Box';

import FirebaseContext from '../Firebase/FirebaseContext'
import { GetDirectoryData } from '../UtilityScripts/TreeParsing';
import LoadingDiv from '../LoadingDiv/LoadingDiv';
import DirectoryCard from '../DirectoryCard/DirectoryCard'
import Error from '../Error/Error'

export default function Annuaire() {

  const { trees, loadings, errors, affichagePseudos } = useContext(FirebaseContext)

  //Chargement en cours ou utilisateur non autorisé ou erreur Firebase
  if (loadings['loadingU'] || loadings['loadingW']) {
    return <LoadingDiv />
  }
  else if (errors['errorU'] || errors['errorW']) {
    return (
      <Error />
    )
  }

  const data = GetDirectoryData(trees['treeU'], trees['treeW'], affichagePseudos)
  //Affichage de la liste si elle existe
  let annuaire
  if (!data) {
    annuaire = ('Problème')
  }
  else {
    annuaire = (
      data.map(sportif => <DirectoryCard key={sportif['uid']}
        sportif={sportif}
        affichagePseudos={affichagePseudos}
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

export default function PseudoNomPrenom(sportif, affichagePseudos) {

  //Affichage du nom/prénom/pseudo en fonction des paramètres
  var res = sportif['nom'] + ' ' + sportif['prenom']
  //Si la personne a défini un pseudo, on est heureux
  if (sportif['pseudo']) {
    if (affichagePseudos === 'Nom Prénom') {
      res = sportif['nom'] + ' ' + sportif['prenom']
    }
    else if (affichagePseudos === 'Nom Prénom (Pseudo)') {
      res = sportif['nom']
        + ' ' + sportif['prenom']
        + ' (' + sportif['pseudo'] + ')'
    }
    else if (affichagePseudos === 'Prénom (Pseudo)') {
      res = sportif['prenom'] + ' (' + sportif['pseudo'] + ')'
    }
    else if (affichagePseudos === 'Nom (Pseudo)') {
      res = sportif['nom'] + ' (' + sportif['pseudo'] + ')'
    }
    else if (affichagePseudos === 'Pseudo (Nom Prénom)') {
      res = sportif['pseudo']
        + ' (' + sportif['nom'] + ' ' + sportif['prenom'] + ')'
    }
    else if (affichagePseudos === 'Pseudo (Prénom)') {
      res = sportif['pseudo'] + ' (' + sportif['prenom'] + ')'
    }
    else if (affichagePseudos === 'Prénom') {
      res = sportif['prenom']
    }
    else if (affichagePseudos === 'Prénom Nom') {
      res = sportif['prenom'] + ' ' + sportif['nom']
    }
    else if (affichagePseudos === 'Prénom Nom (Pseudo)') {
      res = sportif['prenom'] + ' ' + sportif['nom'] + ' (' + sportif['pseudo'] + ')'
    }
  }
  //Sinon c'est chiant, on fait au mieux
  else {
    if (affichagePseudos === 'Nom Prénom') {
      res = sportif['nom'] + ' ' + sportif['prenom']
    }
    else if (affichagePseudos === 'Nom Prénom (Pseudo)') {
      res = sportif['nom']
        + ' ' + sportif['prenom']
    }
    else if (affichagePseudos === 'Prénom (Pseudo)') {
      res = sportif['prenom']
    }
    else if (affichagePseudos === 'Nom (Pseudo)') {
      res = sportif['nom'] + ' (' + sportif['prenom'] + ')'
    }
    else if (affichagePseudos === 'Pseudo (Nom Prénom)') {
      res = sportif['prenom']
        + ' (' + sportif['nom'] + ' ' + sportif['prenom'] + ')'
    }
    else if (affichagePseudos === 'Pseudo (Prénom)') {
      res = sportif['prenom']
    }
    else if (affichagePseudos === 'Prénom') {
      res = sportif['prenom']
    }
    else if (affichagePseudos === 'Prénom Nom') {
      res = sportif['prenom'] + ' ' + sportif['nom']
    }
    else if (affichagePseudos === 'Prénom Nom (Pseudo)') {
      res = sportif['prenom'] + ' ' + sportif['nom']
    }
  }
  return res
}
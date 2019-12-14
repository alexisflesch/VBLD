
export default function getBackgroundColor(sportif) {
  //Détermine la couleur de fond des cartes

  //On regarde d'abord s'il s'agit d'un joueur sélectionné pour un match
  if (sportif['selectionne'] && sportif['selectionne']['selectionne']) {
    return "#ff7bdb"
  }
  else if (sportif['present'] === 'Présent(e)' || sportif['present'] === 'Oui') {
    return "#8ad5fb"
  }
  else if (sportif['present'] === 'Absent(e)' || sportif['present'] === 'Non') {
    return "#bcd4de"
  }
  else if (sportif['present'] === 'Si besoin' || sportif['present'] === 'Provisoire') {
    return "#f5b829";
  }
  else if (sportif['present'] === 'Match') {
    return '#ff7bdb'
  }
  else {
    return "#E9F1F7";
  }
}

export function getBackgroundColor2(option) {
  //Détermine la couleur de fond de la liste où on clique pour se mettre présent
  var sportif = { present: option }
  return getBackgroundColor(sportif)
}
function sortAuth() {
  return function (a, b) {
    if (a['authorized'] === b['authorized']) {
      var foo = a['nom'] + a['prenom']
      var bar = b['nom'] + b['prenom']
      if (!a || !b) return 1
      else return foo.localeCompare(bar)
    }
    else {
      if (!a['authorized']) return -1
      else return 1
    }
  }
}

function mySort(triPresence, meFirst, uid) {
  //Inputs:
  //  - sportifs : a list of {nom, prenom, uid, present}
  //  - arg : a boolean
  if (!triPresence && meFirst) {
    return function (a, b) {
      if (a['uid'] === uid) return -1
      if (b['uid'] === uid) return 1
      var foo = a['nom'] + a['prenom']
      var bar = b['nom'] + b['prenom']
      return foo.localeCompare(bar)
    }
  }
  else if (!triPresence && !meFirst) {
    return function (a, b) {
      var foo = a['nom'] + a['prenom']
      var bar = b['nom'] + b['prenom']
      return foo.localeCompare(bar)
    }
  }
  else {
    return function (a, b) {
      //Affichage de la personne en premier
      if (meFirst && a['uid'] === uid) return -1
      if (meFirst && b['uid'] === uid) return 1
      //S'il y a une sélection pour un match, on l'affiche en bloc
      let presA, presB
      if (a['selectionne'] && a['selectionne']['selectionne']) {
        presA = 'Match'
      }
      else {
        presA = a['present']
      }
      if (b['selectionne'] && b['selectionne']['selectionne']) {
        presB = 'Match'
      }
      else {
        presB = b['present']
      }
      if (presA === presB) {
        var foo = a['nom'] + a['prenom']
        var bar = b['nom'] + b['prenom']
        return foo.localeCompare(bar)
      }
      else {
        if (presA === 'Match') return -1
        else if (presB === 'Match') return 1
        else if (presA === 'Présent(e)') return -1
        else if (presB === 'Présent(e)') return 1
        else if (presA === 'Oui') return -1
        else if (presB === 'Oui') return 1
        else if (presA === 'Si besoin') return -1
        else if (presB === 'Si besoin') return 1
        else if (presA === 'Provisoire') return -1
        else if (presB === 'Provisoire') return 1
        else if (presA === 'Non renseigné') return -1
        else if (presB === 'Non renseigné') return 1
      }
    }
  }
}


function findNextEvent(datesAndMore) {
  //Inputs:
  //  - datesAndMore : list of {dates, dateId, location}
  //Output:
  //  - {date, dateId, location} of next event after today
  var today = new Date()
  today.setHours(0, 0, 0, 0)

  //Is date list loaded ?
  if (!datesAndMore) return [];

  //In case there is no next event, return last event
  var { date, dateId, location } = datesAndMore[datesAndMore.length - 1]
  for (const dam of datesAndMore) {
    var bar = new Date(dam['date'])
    if (bar.setHours(0, 0, 0, 0) >= today) {
      date = new Date(dam['date'])
      dateId = dam['dateId']
      location = dam['location']
      break
    }
  }
  return { date, dateId, location }
}


function findCorrespondingTraining(dateId, treeE, loadingE) {
  //Inputs :
  // dateId : a date Id from the "entrainements" branch of the firebase tree
  // treeE : the "evenements" branch of the firebase tree
  // loadingE : true if treeE is still loading
  // errorE : true if an error occured while trying to connect to firebase
  //Ouput :
  // either a date id that matches the date of dateId in /evenements/matchs/ or false

  //Avoid problems
  if (loadingE || !treeE || !dateId) return false
  if (!treeE['entrainements']) return false
  if (!treeE['entrainements'][dateId]) return false

  //First, extract dates from the "entrainements" tree
  const { datesAndMore } = extractDates(treeE, loadingE, "matchs")

  //Find the date corresponding to dateId
  const dateNumEntrainement = treeE['entrainements'][dateId]['numericalDate']
  const dateEntrainement = new Date(dateNumEntrainement)
  const dateString = dateEntrainement.toDateString()


  //Then, try to find a match
  for (const dam of datesAndMore) {
    if (dam['date'].toDateString() === dateString) {//Match trouvé
      return dam['dateId']
    }
    else if (dam['date'].valueOf() > dateString + 86400000) {//Date dépassée
      return false
    }
  }
  return false
}


function extractDates(tree, loading, branchName) {
  //Inputs:
  //  - tree : a firebase tree
  //  - loading : true if data is still loading
  //  - branchName : a branch name ("entrainements", "matchs", "pots", ...)
  //Ouput:
  //  - list of {dates, dateId, location}
  //  - nextEvent (going from today)

  var vide = { 'datesAndMore': [], nextEvent: { 'date': 'fake date', 'dateId': 'fake date id', 'location': '' } }

  if (loading) return vide
  if (!tree) return vide

  var subTree = tree[branchName]
  if (!subTree) return vide

  var datesAndMore = []
  const keys = Object.keys(subTree)
  for (const dateId of keys) {
    var date = new Date(parseInt(subTree[dateId]['numericalDate']))
    var domicile = subTree[dateId]['EquipeDomicile']
    var exterieur = subTree[dateId]['EquipeExterieur']
    datesAndMore.push({ date, dateId, domicile, exterieur })
  }

  //Tri de la liste des dates par ordre chronologique
  datesAndMore.sort(function (a, b) {
    return a['date'].valueOf() - b['date'].valueOf();
  });

  //Recherche du prochain événement
  var nextEvent = findNextEvent(datesAndMore)
  var res = { datesAndMore, nextEvent }

  return res
}


function multipleEvents(treeE, loadingE, errorE, branchName, dateId) {
  //Find whether multiple events happen on a given date
  //Inputs :
  //  - treeE : firebase tree (namely "evenements")
  //  - loadingE : true if data is still loading
  //  - errorE : true if there was an error at some point loading the tree
  //  - branchName : one of "entrainements", "matchs", "pots"
  //  - dateId : a date id from branchName
  //Ouputs :
  //  - mult : a boolean (true if another event was found elsewhere)
  //  - events : a list of {branchName, dateId} corresponding to the events

  var mult = false
  var events = []
  const vide = { mult, events }

  //Avoid problems
  if (loadingE || errorE || !treeE || !dateId) return vide
  if (!treeE[branchName]) return vide
  if (!treeE[branchName][dateId]) return vide


  //First, find the real date corresponding to dateId in branchName
  const dateNumInit = treeE[branchName][dateId]['numericalDate']
  const dateInit = new Date(dateNumInit)
  const dateStringInit = dateInit.toDateString()

  //Find an event in {'entrainements', 'matchs', 'pots'} but not branchName
  for (const branch of ['entrainements', 'matchs', 'pots']) {
    if (branch === branchName) continue
    //Extract dates from the "branch" subTree
    const { datesAndMore } = extractDates(treeE, loadingE, branch)
    //Try to find a match
    for (const dam of datesAndMore) {
      if (dam['date'].toDateString() === dateStringInit) {//Match trouvé
        mult = true
        events.push({
          branchName: branch,
          dateId: dam['dateId'],
        })
        break
      }
      else if (dam['date'].valueOf() > dateStringInit + 86400000) {//Date dépassée
        break
      }
    }
  }
  return { mult, events }
}


function extractPresence(treeE, loadingE, treeW, loadingW, treeU, loadingU, branchName, dateId) {

  //Si "entrainement", on cherche s'il y a un match en même temps
  let dateId2
  if (branchName === 'entrainements') {
    dateId2 = findCorrespondingTraining(dateId, treeE, loadingE)
  }

  //Présence à l'événement
  const { sportifs, totaux } = extractPresenceOne(treeE, loadingE, treeW, loadingW, treeU, loadingU, branchName, dateId)

  //Présence au match qui a lieu en même temps (le cas échéant)
  if (dateId2) {
    const presM = extractPresenceOne(treeE, loadingE, treeW, loadingW, treeU, loadingU, "matchs", dateId2)
    const sportifsM = presM.sportifs
    for (const sportifM of sportifsM) {
      if (sportifM['selectionne'] && sportifM['selectionne']['selectionne']) {
        //La personne fait partie de la sélection
        //Si elle est inscrite à l'entraînement on note sa sélection
        //Et on modifie les totaux de l'entraînement si nécessaire
        for (const sportifE of sportifs) {
          if (sportifE['uid'] === sportifM['uid']) {
            //On ajoute les infos du coach
            sportifE['selectionne'] = sportifM['selectionne']
            //On modifie les totaux
            totaux[sportifE['present']]--
            totaux['Match']++
          }
        }
      }
    }
  }

  return { sportifs, totaux }
}


function extractPresenceOne(treeE, loadingE, treeW, loadingW, treeU, loadingU, branchName, dateId) {
  //Inputs:
  //  - treeE : main firebase tree (namely "evenements")
  //  - loadingE : true if data is still loading on treeE
  //  - treeW : whiteList users tree
  //  - loadingW : true if data is still loading on treeW
  //  - treeU : tree of all registered users (even not on whiteList)
  //  - loadingU : true if data is still loading on treeU
  //  - branchName : a branch name ("entrainements", "matchs", "pots", ...)
  //  - dateid : a dateid that (hopefully) exists in treeE['branchName']
  //Ouput : 
  //  - list of {nom, prenom, uid, present, trustedUsers, selection : { selectionne, centre, passe, quatre} }
  //  - total number of whatever (present, absent, oui, non, si besoin)

  //En cas d'erreur ou de chargement des arbres
  var sportifs = []
  var totaux = {
    'Oui': 0, 'Présent(e)': 0,
    'Non': 0, 'Absent(e)': 0,
    'Si besoin': 0, 'Provisoire': 0,
    'Non renseigné': 0,
    'Match': 0,
  }
  const vide = { sportifs, totaux }

  if (loadingE || loadingW || loadingU) return vide

  if (!treeE) return vide
  var dateTree = treeE[branchName]
  if (!dateTree || !treeU) return vide

  //First, find the corresponding branch in dateTree
  var branch = dateTree[dateId]
  if (!branch) return vide

  //Then populate res list and totaux
  let keysInscrits
  if (branch['inscrits']) {
    keysInscrits = Object.keys(branch['inscrits'])
  }
  else {
    keysInscrits = []
  }
  //Find selection if it exists
  let keysSelection
  if (branch['selection']) {
    keysSelection = Object.keys(branch['selection'])
  }
  else {
    keysSelection = []
  }

  const keysUsers = Object.keys(treeW)
  for (const key of keysUsers) {
    var nom = treeU[key]['readOnly']['nom']
    var prenom = treeU[key]['readOnly']['prenom']
    var civilite = treeU[key]['readWrite']['civilite']
    var trustedUsers = treeU[key]['readWrite']['trustedUsers']
    var uid = key
    let present, selectionne

    //En fonction de la sélection et de si la présence est renseignée

    if (keysSelection.includes(key) && keysInscrits.includes(key)) {
      // Joueur sélectionné qui a renseigné sa présence
      selectionne = branch['selection'][key]
      present = branch['inscrits'][key]['present']
      if (branch['selection'][key]['selectionne']) {
        totaux['Match']++
      }
      else {
        totaux[present]++
      }
    }
    else if (keysSelection.includes(key) && !keysInscrits.includes(key)) {
      // Joueur sélectionné mais présence non renseignée
      selectionne = branch['selection'][key]
      present = 'Non renseigné'
      if (branch['selection'][key]['selectionne']) {
        totaux['Match']++
      }
      else {
        totaux['Non renseigné']++
      }
    }
    else if (!keysSelection.includes(key)) {
      // Joueur non sélectionné
      selectionne = {
        'selectionne': false,
        'quatre': false,
        'centre': false,
        'passe': false,
      }
      //Si sportif a renseigné sa présence
      if (keysInscrits.includes(key)) {
        present = branch['inscrits'][key]['present']
        totaux[present]++
      }
      else {
        present = 'Non renseigné'
        totaux['Non renseigné']++
      }
    }

    sportifs.push({ nom, prenom, civilite, uid, present, selectionne, trustedUsers })
  }
  return { sportifs, totaux }
}




function extractPresencePot(treeE, loadingE, treeW, loadingW, treeU, loadingU, dateId) {
  //Inputs:
  //  - treeE : main firebase tree (namely "evenements")
  //  - loadingE : true if data is still loading on treeE
  //  - treeW : whiteList users tree
  //  - loadingW : true if data is still loading on treeW
  //  - treeU : tree of all registered users (even not on whiteList)
  //  - loadingU : true if data is still loading on treeU
  //  - dateid : a dateid that (hopefully) exists in treeE['pots']
  //Ouput : 
  //  - list of {nom, prenom, uid, present, trustedUsers, boissons, sucre, sale, autres }
  //  - summary {boissons: [], sucre:[], sale:[], autres:[]}
  //  - totaux : total number of (Présent(e), Provisoire, Absent(e))

  //En cas d'erreur ou de chargement des arbres
  var sportifs = []
  var summary = {
    'boissons': [],
    'sucre': [],
    'sale': [],
    'autres': [],
  }
  var totaux = {
    'Oui': 0, 'Présent(e)': 0,
    'Non': 0, 'Absent(e)': 0,
    'Si besoin': 0, 'Provisoire': 0,
    'Non renseigné': 0,
  }

  const vide = { sportifs, totaux, summary }

  if (loadingE || loadingW || loadingU) return vide

  if (!treeE) return vide
  var dateTree = treeE['pots']
  if (!dateTree || !treeU) return vide

  //First, find the corresponding branch in dateTree
  var branch = dateTree[dateId]
  if (!branch) return vide

  //Then populate res list and totaux
  let keysInscrits
  if (branch['inscrits']) {
    keysInscrits = Object.keys(branch['inscrits'])
  }
  else {
    keysInscrits = []
  }

  const keysUsers = Object.keys(treeW)
  for (const key of keysUsers) {
    var nom = treeU[key]['readOnly']['nom']
    var prenom = treeU[key]['readOnly']['prenom']
    var civilite = treeU[key]['readWrite']['civilite']
    var trustedUsers = treeU[key]['readWrite']['trustedUsers']
    var uid = key
    let present, boissons, sucre, sale, autres
    //Si sportif a renseigné sa présence
    if (keysInscrits.includes(key)) {
      present = branch['inscrits'][key]['present']
      boissons = branch['inscrits'][key]['boissons']
      sucre = branch['inscrits'][key]['sucre']
      sale = branch['inscrits'][key]['sale']
      autres = branch['inscrits'][key]['autres']
      totaux[present]++
      summary['boissons'].push(boissons)
      summary['sucre'].push(sucre)
      summary['sale'].push(sale)
      summary['autres'].push(autres)
    }
    else {
      present = 'Non renseigné'
      totaux['Non renseigné']++
    }
    sportifs.push({
      nom, prenom, civilite,
      uid, present, trustedUsers,
      boissons, sucre, sale, autres,
    })
  }
  return { sportifs, totaux, summary }
}

function nombreSelections(treeE, loadingE, treeW, loadingW, dateId, sportifs) {
  //Inputs:
  //  - treeE : main firebase tree (namely "evenements")
  //  - loadingE : true if data is still loading on treeE
  //  - treeW : whiteList users tree
  //  - loadingW : true if data is still loading on treeW
  //  - dateid : a dateid that exists in treeE['matchs']
  //  - sportifs : a list of {nom, prenom, present, uid, ... }
  //Ouput : 
  //  - a list of {nom, prenom, present, uid, ... AND nbSelections}
  // where nbSelections is the number of selections before dateId


  //En cas d'erreur ou de chargement des arbres
  if (!sportifs || loadingE || loadingW || !treeE || !treeW) return []


  //Initialisation de nbSelections
  for (const sportif of sportifs) {
    sportif['nbSelections'] = 0
  }

  //Date du match en cours d'édition :
  //On ne regarde que les sélections antérieures
  if (!treeE['matchs'] || !treeE['matchs'][dateId] || !treeE['matchs'][dateId]['numericalDate']) {
    return sportifs
  }

  const currentDate = treeE['matchs'][dateId]['numericalDate']

  //On boucle sur les dates des matchs
  const { datesAndMore } = extractDates(treeE, loadingE, 'matchs')
  for (const dam of datesAndMore) {
    if (dam['date'].valueOf() >= currentDate) {
      break
    }
    else {
      //Il s'agit d'une date antérieure
      //On boucle sur les sélectionnés
      var selectionnes = treeE['matchs'][dam['dateId']]['selection']
      if (selectionnes) {
        var keys = Object.keys(selectionnes)
        for (const key of keys) {
          // On identifie le sportif grâce à son uid
          for (const sportif of sportifs) {
            if (sportif['uid'] === key) {
              // On met à jour le nombre de sélections
              sportif['nbSelections'] = sportif['nbSelections'] + selectionnes[key]['selectionne']
              break
            }
          }
        }
      }
    }
  }

  return sportifs


}


function findLocationAndTime(treeE, loadingE, branchName, dateId) {
  //Inputs:
  //  - treeE : main firebase tree (namely "evenements")
  //  - loadingE : true if data is still loading
  //  - branchName : a branchName ("entrainements", "matchs", "pots", ...)
  //  - dateId : a date id
  //Ouput : 
  //  - {time, lieu, domicile, exterieur, resultat}

  if (!dateId || loadingE || !treeE) return ''
  var subTree = treeE[branchName]

  let domicile, exterieur, time, resultat, lieu
  if (!subTree) {
    domicile = 'Match inconnu'
    time = 'Heure inconnue'
    resultat = ''
  }
  else if (!subTree[dateId]) {
    domicile = 'Match inconnu'
    time = 'Date inconnue'
    resultat = ''
  }
  else {
    domicile = subTree[dateId]['EquipeDomicile']
    exterieur = subTree[dateId]['EquipeExterieur']
    time = subTree[dateId]['readableTime']
    resultat = subTree[dateId]['resultat']
    lieu = subTree[dateId]['lieu']
  }

  return { domicile, exterieur, time, resultat, lieu }
}


function GetDirectoryData(treeU, treeW) {
  //Inputs:
  //  - treeU : firebase tree containing all users
  //  - treeW : firebase tree of white listed users
  //Ouput : 
  //  - list of users with everything : {'nom', 'prenom', 'email', 'telephone' ...}
  if (!treeU || !treeW) return []

  var res = []
  //Looping on whiteListed users
  const keysUsers = Object.keys(treeW)
  for (const key of keysUsers) {
    if (treeU[key]) {
      res.push({ ...treeU[key]['readOnly'], ...treeU[key]['readWrite'], 'uid': key })
    }
  }
  return res.sort(mySort('a-z', false, '0'))
}

function GetAdminData(treeU, treeW) {
  //Inputs:
  //  - treeU : firebase tree containing all users
  //  - treeW : firebase tree of white listed users
  //Ouput : 
  //  - list of ALL users with everything : {'nom', 'prenom', 'email', 'telephone' ...}
  //  - plus one important info : is user in whiteList or not ?
  //  - except admins ! So that an admin can't remove another admin
  if (!treeU || !treeW) return []

  let temp
  var res = []
  //Looping on ALL users
  const keysUsers = Object.keys(treeU)
  for (const key of keysUsers) {
    temp = Object.assign({}, treeU[key]);
    if (!temp['readOnly']['nom']) temp['readOnly']['nom'] = '?'
    if (!temp['readOnly']['prenom']) temp['readOnly']['prenom'] = '?'
    if (treeW[key]) {
      if (!treeW[key]['admin']) {
        res.push({ ...temp['readOnly'], ...temp['readWrite'], 'uid': key, 'authorized': true })
      }
    }
    else {
      res.push({ ...temp['readOnly'], ...temp['readWrite'], 'uid': key, 'authorized': false })
    }
  }
  return res.sort(sortAuth())
}

export default mySort
export { extractPresence, extractDates, mySort, findNextEvent, findLocationAndTime, GetDirectoryData, GetAdminData, findCorrespondingTraining, nombreSelections, extractPresencePot, multipleEvents }
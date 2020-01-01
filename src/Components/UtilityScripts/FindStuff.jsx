import mySort from './TreeParsing'


function GetUserData(treeP, loadingP, errorP) {
  // Get info on a user using its personnal tree (/users/uid)
  // Inputs :
  //   - userId : a user unique id
  //   - treeU : the user tree (/users/) from the firebase database
  //   - loadingU : true if data is loading
  //   - errorU : true if an error occured (user trying to access something forbiddent, ...)
  // Ouput :
  //   - everything available ('nom', 'prenom', 'email', 'telephone' ...)
  if ((loadingP) || errorP || !treeP) return {}

  if (!treeP['readOnly']['nom']) {
    treeP['readOnly']['nom'] = ''
  }
  if (!treeP['readOnly']['prenom']) {
    treeP['readOnly']['prenom'] = ''
  }
  if (!treeP['readWrite']['telephone']) {
    treeP['readWrite']['telephone'] = ''
  }
  if (!treeP['readWrite']['email']) {
    treeP['readWrite']['email'] = ''
  }
  if (!treeP['readWrite']['pseudo']) {
    treeP['readWrite']['pseudo'] = ''
  }
  if (!treeP['readWrite']['trustedUsers']) {
    treeP['readWrite']['trustedUsers'] = {}
  }
  if (!treeP['readWrite']['homePage']) {
    treeP['readWrite']['homePage'] = ''
  }

  return { ...treeP['readOnly'], ...treeP['readWrite'] }
}


function isAdmin(treeW, loadingTreeW, errorTreeW, userId) {
  if (loadingTreeW || errorTreeW) return false
  if (!treeW[userId]) return false
  return treeW[userId]['admin']
}


function isMiniAdmin(treeW, loadingW, errorW, userId) {
  if (loadingW || errorW) return false
  if (!treeW[userId]) return false
  return (treeW[userId]['admin'] || treeW[userId]['miniAdmin'])
}


function getSportifs(treeW, loadingW, errorW, treeU, loadingU, errorU, userId) {
  if (loadingW || errorW || loadingU || errorU || !treeU || !treeW) return []

  var res = []
  const keys = Object.keys(treeW)
  for (const key of keys) {
    if (key === userId) continue //Ignore current user
    if (!treeU[key]) continue  //Should never happen
    var nom = treeU[key]['readOnly']['nom']
    var prenom = treeU[key]['readOnly']['prenom']
    var uid = key
    res.push({ nom, prenom, uid })
  }
  res.sort(mySort(false, false, ''))
  return res
}


function authorizedEdit(userId, treeW, loadingW, errorW, treeE, loadingE, errorE, branchName, dateId) {
  // Find whethere a user can edit a certain ressource
  // Returns a boolean a what can be edited
  // Inputs :
  //  - userId : the user uid
  //  - treeW : whiteList tree
  //  - loadingW : true if data is still loading
  //  - errorW : in case of an error with firebase
  //  - treeE : firebase "evenements" tree
  //  - loadingE : true if treeE is still loading
  //  - errorE : in case of an error while loading treeE
  //  - branchName : one of "matchs", "pots" (maybe 'entrainements' ?)
  //  - a dateId in /evenements/branchName
  // Ouputs :
  //  - authorized : a boolean
  //  - editable : a list of leaves in /evenements/branchName/dateId/ that can be edited
  //  - deletable : a boolean (can delete event or not)
  //  - path : full path of the event (e.g. /evenements/pots/someId)

  var authorized = false
  var editable = []
  var deletable = false
  var path = ''
  const vide = { authorized, editable, deletable, path }

  if (loadingW || errorW) return vide
  if (!treeW[userId]) return vide
  if (!treeE[branchName] || !treeE[branchName][dateId]) return vide

  path = '/evenements/' + branchName + '/' + dateId
  const admin = treeW[userId]['admin']
  const miniAdmin = treeW[userId]['miniAdmin']

  if (!admin && !miniAdmin) return vide

  // miniAdmin peut :
  // - modifier le résultat d'un match
  // - ajouter un match
  // - déplacer/supprimer un match qu'il a créé si personne d'autre que lui n'est inscrit
  // - déplacer/supprimer un pot qu'il a créé si personne d'autre que lui n'est inscrit

  // admin peut :
  // - faire la même chose que miniAdmin
  // - déplacer/supprimer les matchs/pots vides
  // - modifier la date de n'importe quel match

  //Résultat du match (si déjà renseigné)
  var score = treeE[branchName][dateId]['score']
  if (!score) { score = { dom: '', ext: '' } }

  //Date de l'événement
  const date = treeE[branchName][dateId]['numericalDate']
  //Y a-t-il déjà des gens inscrits autres que l'utilisateur qui veut éditer ?
  var nbInscrits = 0
  const inscrits = treeE[branchName][dateId]['inscrits']
  if (inscrits) {
    const keys = Object.keys(inscrits)
    for (const key of keys) {
      if (key !== userId) {
        nbInscrits++
      }
    }
  }

  //L'événement a-t-il été créé par l'utilisateur ?
  var createdByUser = (treeE[branchName][dateId]['pushedBy'] === userId)

  if (branchName === 'matchs') {
    authorized = true
    editable = { score }
    var domicile = treeE[branchName][dateId]['EquipeDomicile']
    var exterieur = treeE[branchName][dateId]['EquipeExterieur']
    if (admin || createdByUser) {
      editable = { ...editable, domicile, exterieur }
      if (!nbInscrits || admin) {
        editable = { ...editable, date }
      }
      if (!nbInscrits) {
        deletable = true
      }
    }
  }
  else if (branchName === 'pots') {
    if ((createdByUser || admin) && !nbInscrits) {
      var lieu = treeE[branchName][dateId]['lieu']
      authorized = true
      editable = { date, lieu }
      deletable = true
    }
  }

  return { authorized, editable, deletable, path }
}

export default GetUserData
export { isAdmin, isMiniAdmin, getSportifs, authorizedEdit }
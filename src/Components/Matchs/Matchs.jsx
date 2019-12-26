import React, { useContext } from 'react';
import MaterialUIPickers from '../DatePicker/datePicker';

import FirebaseContext from '../Firebase/FirebaseContext'
import { extractDates } from '../UtilityScripts/TreeParsing'

import ListeSportifs from '../ListeSportifs/ListeSportifs'
import LocationAndTime from '../LocationAndTime/LocationAndTime'
import LoadingDiv from '../LoadingDiv/LoadingDiv'
import AffichageTotaux from '../AffichageTotaux/AffichageTotaux'
import { makeStyles } from '@material-ui/core/styles';
import { extractPresence } from '../UtilityScripts/TreeParsing'
import { authorizedEdit, isMiniAdmin } from '../UtilityScripts/FindStuff'
import DialogEdit from '../Administration/DialogEdit'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import AddButton from '../Administration/AddButton'
import Error from '../Error/Error'

const useStyles = makeStyles(theme => ({
  margins: {
    paddingTop: theme.spacing(1),
    margin: 0,
  },
}));



export default function Matchs() {
  const classes = useStyles();

  //Context de firebase
  const { trees, loadings, errors, user } = useContext(FirebaseContext)

  //Pour que ça soit lisible
  const { treeE, treeU, treeW } = trees;
  const { loadingE, loadingU, loadingW } = loadings;
  const { errorE, errorW } = errors;

  //Listes des dates des matchs (à donner au calendrier ensuite)
  var { datesAndMore, nextEvent } = extractDates(treeE, loadingE, "matchs")

  //Date du prochain événement
  var [date, dateId] = [nextEvent['date'], nextEvent['dateId']]

  //State passé au calendrier qui permettra de faire remonter l'info
  //si un changement de date a eu lieu
  const [currentDateId, setCurrentDateId] = React.useState(dateId)

  //Mise à jour de l'affichage
  React.useEffect(() => {
    setCurrentDateId(dateId);
  }, [dateId]);


  if (errorE || errorW) {
    return <Error />
  }

  //Infobulles avec le nombre de présents
  const { totaux } = extractPresence(treeE, loadingE, treeW, loadingW, treeU, loadingU, "matchs", currentDateId)


  // Les utilisateurs autorisés peuvent modifier l'événement :
  // - renseigner le score de la rencontre
  // - déplacer la rencontre
  // - supprimer la rencontre
  const { authorized, editable, deletable, path } = authorizedEdit(user['uid'], treeW, loadingW, errorW, treeE, loadingE, errorE, "matchs", currentDateId)

  let editer
  if (!authorized) {
    editer = <Box p={3} />
  }
  else {
    editer = <DialogEdit editable={editable} path={path} deletable={deletable} />
  }
  // Les utilisateurs autorisés peuvent ajouter un pot :
  let addStuff
  if (isMiniAdmin(treeW, loadingW, errorW, user['uid'])) {
    addStuff = <AddButton
      branchName='matchs'
      datesAndMore={datesAndMore}
      userId={user['uid']}
    />
  }


  // Below is a fix needed if <matchs /> is the first thing
  // the app shows. Maybe not need if users have to log in
  // currentDateId is not properly initialized because FirebaseContext
  // is initialized with a fake date while loading.
  // When the true initial value arrives, the react Hook waits for
  // the next render to update it
  // Quick and dirty fix
  // if (currentDateId === 'fake date id' && dateId !== 'fake date id') {
  //   setCurrentDateId(dateId)
  // }


  if (loadings['loadingE']) {
    return <LoadingDiv />
  }
  else {
    return (
      <div className={classes.margins}>
        <AffichageTotaux totaux={totaux} />
        <MaterialUIPickers
          currentDate={date}
          currentDateId={currentDateId}
          setCurrentDateId={setCurrentDateId}
          datesAndMore={datesAndMore}
        />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={0}
        >
          <Grid item>
            <LocationAndTime
              currentDateId={currentDateId}
              trainingOrMatch="matchs"
            />
          </Grid>
          <Grid item xs={1}>
            {editer}
          </Grid>
        </Grid>
        <ListeSportifs
          currentDateId={currentDateId}
          trainingOrMatch="matchs"
        />
        {addStuff}
      </div >
    )
  }
}

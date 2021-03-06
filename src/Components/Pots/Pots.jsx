import React, { useContext } from 'react';
import MaterialUIPickers from '../DatePicker/datePicker';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import FirebaseContext from '../Firebase/FirebaseContext'
import { extractDates } from '../UtilityScripts/TreeParsing'

import ListeSportifs from '../ListeSportifs/ListeSportifs'
import LocationAndTime from '../LocationAndTime/LocationAndTime'
import LoadingDiv from '../LoadingDiv/LoadingDiv'
import AffichageTotaux from '../AffichageTotaux/AffichageTotaux'
import { makeStyles } from '@material-ui/core/styles';
import { extractPresencePot } from '../UtilityScripts/TreeParsing'
import { authorizedEdit, isMiniAdmin } from '../UtilityScripts/FindStuff'

import Summary from './Summary'
import DialogEdit from '../Administration/DialogEdit'
import AddButton from '../Administration/AddButton'
import Error from '../Error/Error'


const useStyles = makeStyles(theme => ({
  margins: {
    paddingTop: theme.spacing(1),
    margin: 0,
  },
}));



export default function Pots() {

  const classes = useStyles();

  //Context de firebase
  const { trees, loadings, errors, user } = useContext(FirebaseContext)

  //Pour que ça soit lisible
  const { treeE, treeU, treeW } = trees;
  const { loadingE, loadingU, loadingW } = loadings;
  const { errorE, errorW } = errors;

  //Listes des dates des pots (à donner au calendrier ensuite)
  var { datesAndMore, nextEvent } = extractDates(treeE, loadingE, "pots")

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
  const { totaux, summary } = extractPresencePot(treeE, loadingE, treeW, loadingW, treeU, loadingU, currentDateId)

  // Les utilisateurs autorisés peuvent modifier le pot :
  // - déplacer le pot (si personne d'inscrit)
  // - supprimer le pot (si personne d'inscrit)
  const { authorized, editable, deletable, path } = authorizedEdit(user['uid'], treeW, loadingW, errorW, treeE, loadingE, errorE, "pots", currentDateId)

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
      branchName='pots'
      datesAndMore={datesAndMore}
      userId={user['uid']}
    />
  }



  if (loadings['loadingE']) {
    return <LoadingDiv />
  }
  else {
    return (
      <div className={classes.margins}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={0}
        >
          <Grid item>
            <Summary summary={summary} />
          </Grid>
          <Grid item>
            <AffichageTotaux totaux={totaux} />
          </Grid>
        </Grid>
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
              trainingOrMatch="pots"
            />
          </Grid>
          <Grid item xs={1}>
            {editer}
          </Grid>
        </Grid>

        <ListeSportifs
          currentDateId={currentDateId}
          trainingOrMatch="pots"
        />
        {addStuff}
      </div >
    )
  }
}

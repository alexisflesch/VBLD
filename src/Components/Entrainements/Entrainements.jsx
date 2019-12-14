import React, { useContext } from 'react';
import MaterialUIPickers from '../DatePicker/datePicker';
import Grid from '@material-ui/core/Grid';

import FirebaseContext from '../Firebase/FirebaseContext'
import { extractDates } from '../UtilityScripts/TreeParsing'

import ListeSportifs from '../ListeSportifs/ListeSportifs'
import LocationAndTime from '../LocationAndTime/LocationAndTime'
import LoadingDiv from '../LoadingDiv/LoadingDiv'
import AffichageTotaux from '../AffichageTotaux/AffichageTotaux'
import { makeStyles } from '@material-ui/core/styles';
import { multipleEvents, extractPresence } from '../UtilityScripts/TreeParsing'
import AlertInfo from '../AlertInfo/AlertInfo'
import Box from '@material-ui/core/Box'


const useStyles = makeStyles(theme => ({
  margins: {
    paddingTop: theme.spacing(1),
    margin: 0,
  },
}));



export default function Entrainements() {
  const classes = useStyles();

  //Context de firebase
  const { trees, loadings, errors } = useContext(FirebaseContext)

  //Pour que ça soit lisible
  const { treeE, treeU, treeW } = trees;
  const { loadingE, loadingU, loadingW } = loadings;
  const { errorE } = errors;

  //Listes des dates des matchs (à donner au calendrier ensuite)
  var { datesAndMore, nextEvent } = extractDates(trees['treeE'], loadings['loadingE'], "entrainements")

  //Date du prochain événement
  var [date, dateId] = [nextEvent['date'], nextEvent['dateId']]

  //State passé au calendrier qui permettra de faire remonter l'info
  //si un changement de date a eu lieu
  const [currentDateId, setCurrentDateId] = React.useState(dateId)


  //Infobulles avec le nombre de présents
  const { totaux } = extractPresence(treeE, loadingE, treeW, loadingW, treeU, loadingU, "entrainements", currentDateId)


  //S'il y a un autre événement en même temps que l'entraînement, on affiche un panneau
  const { mult, events } = multipleEvents(treeE, loadingE, errorE, "entrainements", currentDateId)
  let attention
  if (!mult) {
    attention = <Box p={3} />
  }
  else {
    attention = <AlertInfo events={events} />
  }


  // Below is a fix needed if <Entrainements /> is the first thing
  // the app shows. Maybe not need if users have to log in
  // currentDateId is not properly initialized because FirebaseContext
  // is initialized with a fake date while loading.
  // When the true initial value arrives, the react Hook waits for
  // the next render to update it
  // Quick and dirty fix
  if (currentDateId === 'fake date id' && dateId !== 'fake date id') {
    setCurrentDateId(dateId)
  }


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
              trainingOrMatch="entrainements"
            />
          </Grid>
          <Grid item xs={1}>
            {attention}
          </Grid>
        </Grid>
        <ListeSportifs
          currentDateId={currentDateId}
          trainingOrMatch="entrainements"
        />
      </div >
    )
  }
}

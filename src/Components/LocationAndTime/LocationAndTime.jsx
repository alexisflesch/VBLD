import React, { useContext, Fragment } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

import FirebaseContext from '../Firebase/FirebaseContext'
import { findLocationAndTime } from '../UtilityScripts/TreeParsing'

const useStyles = makeStyles(theme => ({
  titre: {
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  smallcaps: {
    // fontVariantCaps: 'small-caps',
    // textTransform: 'smallCaps',
  },
  normal: {
    // fontVariantCaps: 'small-caps',
    // fontSize: '80%',
  },
}));


function formatStuff(lieu, domicile, exterieur, trainingOrMatch, classes) {

  if (trainingOrMatch !== 'matchs') {
    return lieu
  }

  if (!domicile || !exterieur) {
    return ''
  }

  let rencontre, styleDom, styleExt
  var foo = domicile.substring(1, 2)
  var bar = exterieur.substring(1, 2)

  //Si l'équipe est à afficher en majuscules
  if (foo.toLowerCase() && foo !== foo.toUpperCase()) {
    styleDom = classes.smallcaps
  }
  else {
    styleDom = classes.normal
  }
  if (bar.toLowerCase() && bar !== bar.toUpperCase()) {
    styleExt = classes.smallcaps
  }
  else {
    styleExt = classes.normal
  }
  rencontre = (
    <Fragment>
      <span className={styleDom}>{domicile}</span>
      -
      <span className={styleExt}>{exterieur}</span>
    </Fragment>
  )

  return rencontre
}



export default function LocationAndTime(props) {
  //Style
  const classes = useStyles();
  const { trees, loadings } = useContext(FirebaseContext)
  const { currentDateId, trainingOrMatch } = props;

  //Heure et lieu de la rencontre
  const { domicile, exterieur, time, score, lieu } = findLocationAndTime(trees['treeE'], loadings['loadingE'], trainingOrMatch, currentDateId)

  var rencontre = formatStuff(lieu, domicile, exterieur, trainingOrMatch, classes)

  let resOrTime
  if (score) {
    let resultat
    if (!score['ext']) {
      resultat = score['dom']
    }
    else {
      resultat = score['dom'] + '-' + score['ext']
    }

    resOrTime = <Typography variant='subtitle1'>{'(' + resultat + ')'}</Typography>
  }
  else {
    resOrTime = <Typography variant='subtitle1'>{'(' + time + ')'}</Typography>
  }


  return (
    <div className={classes.titre}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        <Grid item>
          <Typography variant='h6'>{rencontre} &nbsp;</Typography>
        </Grid>
        {/* <Grid item xs={1} /> */}
        <Grid item>
          {resOrTime}
        </Grid>
      </Grid>
    </div >
  )

}
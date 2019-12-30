import React, { Fragment } from 'react'
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import BipBip from '../../images/bipbip2.png'
import Coyotte from '../../images/coyotte2.png'
import MailIcon from '@material-ui/icons/Mail';
import MessageIcon from '@material-ui/icons/Message';
import Link from '@material-ui/core/Link';
import PhoneIcon from '@material-ui/icons/Phone';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles(theme => ({
  bigAvatar: {
    width: 100,
    height: 100,
    border: "5px solid white",
    marginTop: -50,
    marginLeft: theme.spacing(4),
    backgroundColor: "#dbe0ff",
  },
  smallAvatar: {
    color: theme.palette.primary.main,
    backgroundColor: "#ffffff",
  },
  smallDisabledAvatar: {
    color: theme.palette.grey[400],
    backgroundColor: "#ffffff",
  },
  title: {
    marginTop: -60,
    color: "#ffffff",
  },
  pseudo: {
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
    padding: theme.spacing(2),
    margin: 0,
    height: 125,
  },
  paper: {
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

function formatte(tel) {
  if (!tel.length === 10) {
    return tel
  }
  return tel.substring(0, 2) + ' ' + tel.substring(2, 4) + ' ' + tel.substring(4, 6) + ' ' + tel.substring(6, 8) + ' ' + tel.substring(8, 10)
}


export default function UserInfo2(props) {
  const classes = useStyles();
  var { nom, prenom, email, telephone, civilite, pseudo } = props;

  //Choix de l'avatar
  let photo
  if (civilite === 'bipbip') {
    photo = BipBip
  }
  else {
    photo = Coyotte
  }

  //Au cas où il manque des informations
  let phoneLink, emailLink, smsLink
  let phoneText, emailText

  if (!nom && !prenom) {
    nom = 'Non renseigné'
  }
  if (!email) {
    emailText = (
      <Typography color="textSecondary">
        Non renseigné
      </Typography>
    )
    emailLink = (
      <Avatar variant="rounded" className={classes.smallDisabledAvatar}>
        <MailIcon />
      </ Avatar>
    )
  }
  else {
    emailText = (
      <Typography>
        {email}
      </Typography>
    )
    emailLink = (
      <Link href={'mailto:' + email}>
        <Avatar variant="rounded" className={classes.smallAvatar}>
          <MailIcon />
        </ Avatar>
      </Link>
    )
  }
  if (!telephone) {
    phoneText = (
      <Typography color="textSecondary">
        Non renseigné
      </Typography>
    )
    phoneLink = (
      <Avatar variant="rounded" className={classes.smallDisabledAvatar}>
        <PhoneIcon />
      </ Avatar>
    )
    smsLink = (
      <Avatar variant="rounded" className={classes.smallDisabledAvatar}>
        <MessageIcon />
      </ Avatar>
    )
  }
  else {
    phoneText = (
      <Typography>
        {formatte(telephone)}
      </Typography>
    )
    phoneLink = (
      <Link href={'tel:' + telephone} >
        <Avatar variant="rounded" className={classes.smallAvatar}>
          <PhoneIcon />
        </ Avatar>
      </Link>
    )
    smsLink = (
      <Link href={'sms:' + telephone} >
        <Avatar variant="rounded" className={classes.smallAvatar}>
          <MessageIcon />
        </ Avatar>
      </Link>
    )
  }

  return (
    <Fragment>
      <Typography variant='h5' className={classes.pseudo}>
        {pseudo ? pseudo : ''}
      </Typography>
      {/* <Box bgcolor="primary.main" p={7} className={classes.bigBox} /> */}

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={3}>
          <Avatar alt="BipBip" src={photo} className={classes.bigAvatar} />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={7}>
          <Typography variant='h6' className={classes.title}>
            {nom + ' ' + prenom}
          </Typography>
        </Grid>
      </Grid>

      <Box p={4} />

      <Paper className={classes.paper}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={8}>{phoneText}</Grid>

          <Grid item>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Grid item>{phoneLink}</Grid>
              <Grid item>{smsLink}</Grid>
            </Grid>
          </Grid>

        </Grid>
      </Paper>

      <Paper className={classes.paper}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={8}>{emailText}</Grid>
          <Grid item>{emailLink}</Grid>
        </Grid>
      </Paper>
    </Fragment>
  )
}
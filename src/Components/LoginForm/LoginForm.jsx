import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';


import { ReactComponent as LogoGoogle } from '../../images/logoGoogle.svg';
import { ReactComponent as LogoFacebook } from '../../images/logoFacebook.svg';

import firebase from '../Firebase/firebase';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  paper: {
    marginTop: theme.spacing(2),
    // display: 'flex',
    // flexDirection: 'column',
    alignItems: 'left',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    // marginTop: theme.spacing(3),
    margin: 0,
    padding: -20,
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  text: {
    margin: 0,
  },
  card: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
  action: {
    "&:hover $focusHighlight": {
      opacity: 0
    }
  },
  focusHighlight: {}
}));


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="http://vbld.blogspot.com">
        Accès au site du club
      </Link>
    </Typography>
  );
}

//Register new user (test)
function createUser(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('Cet utilisateur existe déjà.')
    }
    else if (error.code === 'auth/weak-password') {
      alert('Mot de passe trop faible (' + error.message + ')')
    }
    else if (error.code === 'auth/invalid-email') {
      alert('Adresse email invalide')
    }
  });
}


function login(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    if (error.code === 'auth/wrong-password') {
      alert('Mot de passe erroné')
    }
    else {
      createUser(email, password)
    }
  });
}


function handleFacebookLogin() {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithRedirect(provider);
  firebase.auth().getRedirectResult().then(function (result) { })
}


function handleGoogleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
  firebase.auth().getRedirectResult().then(function (result) { })
}


export default function LoginForm() {
  const classes = useStyles();

  //Keeping track of the email field
  const [email, setEmail] = React.useState('')
  function handleChangeEmail(event) {
    setEmail(event.target.value)
    if (validateEmail(event.target.value)) {
      setErrorEmail(false)
    }
  }

  //Keeping track of the password field
  const [password, setPassword] = React.useState('')
  function handleChangePassword(event) {
    setPassword(event.target.value)
    if (event.target.value) {
      setErrorPassword(false)
    }
  }

  //Function to verify that the email adress is valid
  function validateEmail(email) {
    var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  //Error handling
  const [errorEmail, setErrorEmail] = React.useState(false)
  const [errorPassword, setErrorPassword] = React.useState(false)

  //Logging in...
  function handleConnect(event) {
    event.preventDefault();
    const valid = validateEmail(email);
    if (!password) {
      setErrorPassword(true)
    }
    if (!valid) {
      setErrorEmail(true)
    }
    if (valid && password) {
      login(email, password)
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <Grid className={classes.title}
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid item>
          {/* <Typography component="h1" variant="h5" align="center">
            Connexion
        </Typography> */}
        </Grid>
      </Grid>
      <Typography variant="subtitle2" align="left">
        Connexion avec Google ou Facebook
        </Typography>
      <Card onClick={handleGoogleLogin} className={classes.card}>
        <CardActionArea
          classes={{
            root: classes.action,
            focusHighlight: classes.focusHighlight
          }}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <LogoGoogle />
            </Grid>
            <Grid item>
              <Typography>Se connecter avec Google</Typography>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
      <Card onClick={handleFacebookLogin} className={classes.card}>
        <CardActionArea
          classes={{
            root: classes.action,
            focusHighlight: classes.focusHighlight
          }}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <LogoFacebook />
            </Grid>
            <Grid item>
              <Typography>Se connecter avec Facebook</Typography>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>

      <Box m={4} />
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      // spacing={3}
      >
        <Grid item>
          <Typography variant="subtitle2" align="left">
            Connexion avec une adresse email
        </Typography>
        </Grid>
        <Box m={3} />
        <Grid item>
          <form className={classes.form} noValidate onSubmit={handleConnect}>
            <TextField className={classes.text}
              error={errorEmail}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleChangeEmail}
            />
            <TextField
              error={errorPassword}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handleChangePassword}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submit}
              onClick={handleConnect}
            >
              Connexion
          </Button>
          </form>
        </Grid>
      </Grid>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
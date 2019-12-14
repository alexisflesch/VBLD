import React from 'react'
import Box from '@material-ui/core/Box';

import MainApp from "../MainApp/MainApp";
import LoginForm from "../LoginForm/LoginForm";
import LoadingDiv from "../LoadingDiv/LoadingDiv";

import firebase from '../Firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {

  //Hook d'authentification à firebase
  const [user, initializing, error] = useAuthState(firebase.auth());


  //Si on n'est pas loggé ou en train de l'être, on affiche <LoginForm />
  //Sinon on lance l'application (sauf en cas d'erreur)
  if (initializing) {
    return (<div><Box m={2} /><LoadingDiv /></div>)
  }
  else if (error) {
    return (
      <h1>
        <p>Error: {error}</p>
      </h1>
    );
  }
  else if (user) {
    return <MainApp user={user} />
  }
  else if (!user) {
    return <LoginForm />
  }
}


export default App
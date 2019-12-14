import React from 'react'
import { useListVals } from 'react-firebase-hooks/database';


export default function ExtractUsers(props) {

  const { firebase } = props;
  const [value, loading, error] = useListVals(firebase.database().ref('users'));

  function findNames() {
    var userList = [];
    for (const user of value) {
      userList.push(user['name'])
    }
    return userList
  }

  var userList = findNames();

  return (
    <div>
      {userList.map(user => <li key={user}>{user}</li>)}
    </div>
  )
}


function SomeComponent() {

  function extractstuff(firebase) {
    firebase.db.ref('plop').set({ name: 'Alexis', height: 182 })
    var ref = firebase.database().ref("users");
    ref.orderByKey().on("child_added", function (snapshot) {
      console.log(snapshot.key);
      console.log(snapshot.child('name').val());
    });
  }

  // function extractUsers(firebase) {
  //   var res = [];
  //   var ref = firebase.database().ref("users");
  //   ref.orderByKey().on("child_added", function (snapshot) {
  //     res.push(snapshot.child('name').val());
  //   });
  //   console.log(res);
  //   return (
  //     <div>
  //       <div>plop</div>
  //       <div>{res[0]}</div>
  //     </div>
  //   )
  // }
  //On récupère les noms des joueurs
  function findNames() {
    if (loadingU) {
      var userList = [{ name: 'loading', present: 'loading' }];
    }
    else {
      var userList = [];
      for (const user of users) {
        userList.push({ name: user['name'], entrainements: user['entrainements'] })
      }
    }
    return userList
  }

  //On récupère les dates des entraîements
  function findDatesEntrainements() {
    var datesEntrainements = [];
    for (const date of entrainements) {
      datesEntrainements.push(date['numericalDate'])
    }
    return datesEntrainements
  }

  function createEntrainements(firebase) {
    var future = new Date(2020, 6, 1, 20, 15);
    for (var d = new Date(2019, 10, 11, 20, 15); d <= future; d.setDate(d.getDate() + 1)) {
      var date = new Date(d);
      if (date.getDay() === 3) {
        //On ne garde que le mercredi
        var numericalDate = date.valueOf();
        var readableDate = date.toDateString();
        var readableTime = date.getUTCHours() + "h" + date.getUTCMinutes();
        var lieu = "Danjoutin";
        var entrainementsRef = firebase.database().ref('entrainements');
        var newEntrainement = entrainementsRef.push()
        newEntrainement.set({ numericalDate, readableDate, readableTime, lieu })
      }
    }
  }


  function createMatchs(firebase) {
    var future = new Date(2020, 6, 1, 20, 15);
    for (var d = new Date(2019, 10, 11, 20, 15); d <= future; d.setDate(d.getDate() + 1)) {
      var date = new Date(d);
      if (date.getDay() === 3) {
        //On ne garde que le mercredi
        var numericalDate = date.valueOf();
        var readableDate = date.toDateString();
        var readableTime = date.getUTCHours() + "h" + date.getUTCMinutes();
        var lieu = "Danjoutin";
        var entrainementsRef = firebase.database().ref('entrainements');
        var newEntrainement = entrainementsRef.push()
        newEntrainement.set({ numericalDate, readableDate, readableTime, lieu })
      }
    }
  }

  function createFancyUsers(firebase) {
    let names = ['Maxime Fourny', 'Alexis Flesch', 'Isaline Eugène'];
    for (const name of names) {
      var usersRef = firebase.database().ref('users')
      var newUser = usersRef.push()
      newUser.set({ name })
    }
  }

  return (
    // <div>
    <FirebaseContext.Consumer>
      {firebase => (<ExtractUsers firebase={firebase} />)}
    </FirebaseContext.Consumer>
    // </div>
  );
}
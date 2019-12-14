Projet créé avec [Create React App](https://github.com/facebook/create-react-app).

## Attention

Ce logiciel est en phase de développement, il n'est pas (encore) prévu pour être déployé
simplement par un utilisateur non averti. Ci-dessous quelques pistes pour
les plus vaillants.


## Installation

* Créer une bdd firebase

Créer un compte chez firebase et démarrer une "realtime database". Renseigner ensuite le fichier

src/Components/Firebase/firebase.jsx

avec les credentials. Appliquer les règles de sécurité du fichier ci-dessous à votre bdd :

./firebase.rules.json

Donner les droits d'admin/de coach à son propre utilisateur sur firebase. Il faut pour cela ajouter
son uid à /whiteList :

/whiteList/uid : {admin:true, coach:true}

Dans /src/Components/UtilityScripts/createStuff.jsx, on trouvera des fonctions pour 
mettre en place les entraînements/les matchs et comprendre le format de la bdd.

* HTTPS

Pour profiter de l'authentification avec Facebook, il faut activer https. Il faut aussi
suivre les indications données sur le site de firebase pour déclarer l'appli auprès de Facebook

* Autres

J'en oublie encore probablement...

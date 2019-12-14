function createEntrainements(firebase, debut, fin) {
  //Mise en place des entraînements tous les mercredis
  //Inputs :
  //  - firebase : firebase
  //  - debut : date de début
  //  - fin : date de fin
  for (var d = new Date(debut); d <= fin; d.setDate(d.getDate() + 1)) {
    var date = new Date(d);
    if (date.getDay() === 3) {
      //On ne garde que le mercredi
      var numericalDate = date.valueOf();
      var readableDate = date.toDateString();
      var readableTime = "20h15";
      var lieu = "Danjoutin";
      var entrainementsRef = firebase.database().ref('evenements/entrainements');
      var newEntrainement = entrainementsRef.push()
      newEntrainement.set({ numericalDate, readableDate, readableTime, lieu })
    }
  }
}

function upperCase(texte) {
  return texte.charAt(0).toUpperCase() + texte.substring(1).toLowerCase();
}

function createDate(texte, heures, minutes) {
  var foo = texte.split("/")
  var jour = foo[0]
  var mois = foo[1] - 1
  var annee = foo[2]
  return new Date(Date.UTC(annee, mois, jour, heures, minutes))
}

// const maListe = [["Étupes 2", "Danjoutin", "21/11/2019"],
// ["Danjoutin", "Héricourt", "04/12/2019"],
// ["Danjoutin", "ASPTT 2", "11/12/2019"],
// ["Danjoutin", "Bart 2", "18/12/2019"],
// ["Danjoutin", "VBCO 2", "08/01/2020"],
// ["Bavilliers 1", "Danjoutin", "17/01/2020"],
// ["MVCL 2", "Danjoutin", "23/01/2020"],
// ["Danjoutin", "Delle", "29/01/2020"],
// ["Danjoutin", "Étupes 2", "12/02/2020"],
// ["Héricourt", "Danjoutin", "13/03/2020"],
// ["ASPTT 2", "Danjoutin", "16/03/2020"],
// ["Bart 2", "Danjoutin", "26/03/2020"],
// ["VBCO 2", "Danjoutin", "02/04/2020"],
// ["Danjoutin", "Bavilliers 1", "08/04/2020"],
// ["Danjoutin", "MVCL 2", "13/05/2020"],
// ["Delle", "Danjoutin", "27/05/2020"]]

const maListe = [["Tournoi d'ouverture", "", "28/10/2019"]]

function createMatchs(firebase) {
  //Reprendre pour insérer EquipeDomicile et EquipeExterieur
  for (const rencontre of maListe) {
    var heures = 20
    var minutes = 0
    var heuresString = '20'
    var minutesString = '00'
    if (rencontre[0] === "Danjoutin") {
      minutes = 15
      minutesString = '15'
    }
    var date = createDate(rencontre[2], heures, minutes)
    var numericalDate = date.valueOf();
    var readableDate = date.toDateString();
    var readableTime = heuresString + 'h' + minutesString;
    var lieu = upperCase(rencontre[0])
    var matchsRef = firebase.database().ref('evenements/matchs');
    var newMatch = matchsRef.push()
    newMatch.set({ numericalDate, readableDate, readableTime, lieu })
  }
}

const ListGymnases = [
  ["Danjoutin", "Salle polyvalente", "https://goo.gl/maps/xnhH176dYiqjRAV1A",
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2688.3745688849995!2d6.857248115631619!3d47.63828757918677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47923b6003659c2d%3A0xb9d97840e3de0d51!2sBistrot%20des%20Moines!5e0!3m2!1sfr!2sfr!4v1575107990047!5m2!1sfr!2sfr'],
  ["Audincourt", "COSEC des Hautes Vignes", "https://goo.gl/maps/qfXh5LfMWYUkQaYL8",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2696.9311667488737!2d6.855191415625836!3d47.47177077917599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47921a0472a2d6c1%3A0xa383660e70db9798!2sColl%C3%A8ge%20Les%20Hautes%20Vignes!5e0!3m2!1sfr!2sfr!4v1575108108082!5m2!1sfr!2sfr"],
  ["Bart", "Gymnase du Collège", "https://goo.gl/maps/djXWaWxPEfF9r6T79",
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.8979694609584!2d6.75882881562657!3d47.4919009791773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47921143f3a00001%3A0xeaa84b016a6de978!2sColl%C3%A8ge%20Andr%C3%A9%20Boulloche!5e0!3m2!1sfr!2sfr!4v1575108153096!5m2!1sfr!2sfr'],
  ["Delle", "Gymnase Fromentaux", "https://goo.gl/maps/jEkUDP7QFjV1NGSA6",
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5389.741570490233!2d6.9911686!3d47.5119076!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47921fa500d51245%3A0xdcd919490f39a3dc!2sGymnase%20des%20Fromentaux!5e0!3m2!1sfr!2sfr!4v1575108199945!5m2!1sfr!2sfr"],
  ["Étupes", "Gymnase Vilquin", "https://goo.gl/maps/WgzrSzXmEH6RtAr6A",
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10781.217826151464!2d6.8537977!3d47.5034617!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x49c5450a1ea43e1a!2sGymnase%20Jacques%20Vilquin!5e0!3m2!1sfr!2sfr!4v1575108242575!5m2!1sfr!2sfr"],
  ["MVCL", "Gymnase Pajol", "https://goo.gl/maps/u1Q2bL2XtiAfgNrX6",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2694.363573513201!2d6.794292815627581!3d47.521784279179094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479216f78bb9d2c7%3A0x977492a98cce9a8c!2sGymnase%20Pajol!5e0!3m2!1sfr!2sfr!4v1575108273494!5m2!1sfr!2sfr"],
  ["VC2", "Gymnase rue ES Coutey", 'https://goo.gl/maps/bZCTzi4ggp1f1yeNA', "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d673.5429086284157!2d6.834536829214451!3d47.52552140429552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4792179f32393d15%3A0xd847106344316fbb!2s25600%20Vieux-Charmont!5e0!3m2!1sfr!2sfr!4v1575108756178!5m2!1sfr!2sfr"],
  ["Grandvillars", "Gymnase Jean Taillard Grandvillars", "https://goo.gl/maps/DmpWvuKzDXTB1K3H8", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2479.513060195673!2d6.957746715310939!3d47.539655800593806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47921f4c24e01d4f%3A0x5a351b01f61c77b6!2sRue%20du%20Stade%2C%2090600%20Grandvillars!5e1!3m2!1sfr!2sfr!4v1575104821818!5m2!1sfr!2sfr"]
].sort(function (a, b) {
  return a[0].localeCompare(b[0])
})


export { createMatchs, ListGymnases }
export default createEntrainements

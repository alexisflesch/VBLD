import React from 'react'
import Settings from '../Settings/Settings';
import Annuaire from '../Annuaire/Annuaire';
import Gymnases from '../Gymnases/Gymnases';
import Administration from '../Administration/Administration';
import Resultats from '../Resultats/Resultats'
import Pots from '../Pots/Pots'
import Entrainements from '../Entrainements/Entrainements';
import Matchs from '../Matchs/Matchs';
import SortMenu from '../SortMenu/SortMenu';
import PseudoMenu from '../SortMenu/PseudoMenu'
import News from '../Nouvelles/News';


const correspondanceMain = {
  "entrainements": ["Entraînements", <Entrainements />, <SortMenu />, <PseudoMenu />],
  "matchs": ["Matchs", <Matchs />, <SortMenu />, <PseudoMenu />],
  "news": ["Accueil", <News />, "", ""],
  "pots": ["Pots", <Pots />, <SortMenu />, <PseudoMenu />],
  "gymnases": ["Gymnases", <Gymnases />, "", ""],
  "annuaire": ["Annuaire", <Annuaire />, "", <PseudoMenu />],
  "settings": ["Paramètres", <Settings />, "", ""],
  "administration": ["Administration", <Administration />, "", ""],
  "resultats": ["Résultats", <Resultats />, "", ""],
}


const tabs = [
  'Accueil',
  'Entraînements',
  'Matchs',
  'Résultats',
  'Pots',
  'Annuaire',
  'Gymnases',
];

const correspondanceSettings = {
  'Accueil': 'news',
  'Entraînements': 'entrainements',
  'Matchs': 'matchs',
  'Résultats': 'resultats',
  'Pots': 'pots',
  'Annuaire': 'annuaire',
  'Gymnases': 'gymnases',
  'news': 'Accueil',
  'entrainements': 'Entraînements',
  'matchs': 'Matchs',
  'Resultats': 'Résultats',
  'pots': 'Pots',
  'annuaire': 'Annuaire',
  'gymnases': 'Gymnases',
}

export { tabs, correspondanceSettings, correspondanceMain }
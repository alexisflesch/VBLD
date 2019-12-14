import React, { Fragment } from 'react'
import PresenceCivilite from './PresenceCivilite'
import SportsVolleyballIcon from '@material-ui/icons/SportsVolleyball';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import { getBackgroundColor2 } from './Colors';


export default function generateOptions(options, sportif, setPresence, coach, hightlight, updateable) {
  var res = []
  let foo
  let inset
  for (const opt of options) {
    //Add volleyball icon to the current option
    if (opt === sportif['present']) {
      foo = (<ListItemIcon><SportsVolleyballIcon /></ListItemIcon>)
      inset = false
    }
    else {
      foo = ''
      inset = true
    }
    //Bipbip ou coyotte ?
    var opt2 = PresenceCivilite(sportif, opt)

    //Est-ce le coach en train d'afficher qqn dont il ne peut éditer la présence ?
    let fun
    if (coach && !hightlight && !updateable) {
      fun = () => { }
    }
    else {
      fun = () => setPresence(opt)
    }

    //Création de la liste
    res.push(
      <Fragment key={opt}>
        <ListItem button onClick={fun} style={{ backgroundColor: getBackgroundColor2(opt) }}>
          {foo}
          <ListItemText inset={inset} primary={opt2} />
        </ ListItem>
        <Divider />
      </Fragment >
    )
  }
  return res
}
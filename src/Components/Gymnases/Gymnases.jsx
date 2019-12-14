import React, { Fragment } from 'react';
import Box from '@material-ui/core/Box';
import GymnaseCard from './GymnaseCard';
import { ListGymnases } from '../UtilityScripts/createStuff';


export default function Gymnases() {

  const annuaire = (
    ListGymnases.map(gymnase =>
      <GymnaseCard key={gymnase[0]}
        equipe={gymnase[0]}
        lieu={gymnase[1]}
        maps={gymnase[2]}
        iframe={gymnase[3]}
      />)
  )

  return (
    <Fragment>
      <Box p={1.5} />
      {annuaire}
    </Fragment>
  )
}
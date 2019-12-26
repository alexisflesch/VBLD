import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'

import myData from '../../VolleyLoisir90/data.json'
import { Typography } from '@material-ui/core';


const NormalRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey['200'],
    },
  },
}))(TableRow);

const DanjoutinRow = withStyles(theme => ({
  root: {
    backgroundColor: "#8ad5fb",
  },
}))(TableRow);



export default function ResultatsPoule() {

  let tableau
  try {
    tableau = (
      <>
        <TableContainer component={Paper}>
          <Table aria-label="Résultats">
            <TableHead>
              <TableRow>
                <TableCell align="left">Équipe</TableCell>
                <TableCell align="center">Points</TableCell>
                <TableCell align="center">Matchs joués</TableCell>
                <Hidden xsDown>
                  <TableCell align='center'>Matchs gagnés</TableCell>
                </Hidden>
                <Hidden xsDown>
                  <TableCell align='center'>Matchs perdus</TableCell>
                </Hidden>
                <Hidden smDown>
                  <TableCell align='center'>3/0</TableCell>
                </Hidden>
                <Hidden smDown>
                  <TableCell align='center'>3/1</TableCell>
                </Hidden>
                <Hidden smDown>
                  <TableCell align='center'>3/2</TableCell>
                </Hidden>
                <Hidden smDown>
                  <TableCell align='center'>2/3</TableCell>
                </Hidden>
                <Hidden smDown>
                  <TableCell align='center'>1/3</TableCell>
                </Hidden>
                <Hidden smDown>
                  <TableCell align='center'>0/3</TableCell>
                </Hidden>
                <Hidden smDown>
                  <TableCell align='center'>Forfait</TableCell>
                </Hidden>
              </TableRow>
            </TableHead>
            <TableBody>
              {myData.map(function (data, index) {
                let MyRow
                if (data[0] === 'DANJOUTIN') {
                  MyRow = DanjoutinRow
                }
                else {
                  MyRow = NormalRow
                }
                return (
                  <MyRow key={index}>
                    <TableCell >
                      {data[0]}
                    </TableCell>
                    <TableCell align="center">{data[1]}</TableCell>
                    <TableCell align="center">{data[2]}</TableCell>
                    <Hidden xsDown>
                      <TableCell align="center">{data[3]}</TableCell>
                    </Hidden>
                    <Hidden xsDown>
                      <TableCell align="center">{data[4]}</TableCell>
                    </Hidden>
                    <Hidden smDown>
                      <TableCell align="center">{data[5]}</TableCell>
                    </Hidden>
                    <Hidden smDown>
                      <TableCell align="center">{data[6]}</TableCell>
                    </Hidden>
                    <Hidden smDown>
                      <TableCell align="center">{data[7]}</TableCell>
                    </Hidden>
                    <Hidden smDown>
                      <TableCell align="center">{data[8]}</TableCell>
                    </Hidden>
                    <Hidden smDown>
                      <TableCell align="center">{data[9]}</TableCell>
                    </Hidden>
                    <Hidden smDown>
                      <TableCell align="center">{data[10]}</TableCell>
                    </Hidden>
                    <Hidden smDown>
                      <TableCell align="center">{data[11]}</TableCell>
                    </Hidden>
                  </MyRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={1} />
        <Typography>
          <span>Ces résultats sont extraits automatiquement de </span>
          <Link href='http://volleyloisir90.free.fr/index.php?mod=page&ac=page&id_page=25'
            target='_blank' rel="noopener noreferrer">
            cette page
          </Link>
          <span> toutes les heures.</span>
        </Typography>
      </>
    )
  }
  catch (error) {
    console.error(error);
    tableau = (
      <div>
        <Box p={1} />
        <Typography>
          <span>Une erreur est survenue lors de la récupération des résultats.
            Vous pouvez tenter votre chance </span>
          <Link href='http://volleyloisir90.free.fr/index.php?mod=page&ac=page&id_page=25'
            target='_blank' rel="noopener noreferrer">
            ici
          </Link>.
      </Typography>
      </div>
    )
  }

  return (
    <Container maxWidth="lg" >
      {tableau}
    </Container>
  );
}
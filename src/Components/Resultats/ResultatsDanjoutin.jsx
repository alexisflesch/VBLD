import React, { useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container'
import Error from '../Error/Error'

import FirebaseContext from '../Firebase/FirebaseContext'

import { extractResults } from '../UtilityScripts/TreeParsing'


function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth() + 1)].join('/')
}

export default function ResultatsDanjoutin() {

  const { trees, loadings, errors } = useContext(FirebaseContext)

  //Pour que ça soit lisible
  const { treeE } = trees;
  const { loadingE } = loadings;
  const { errorE } = errors;

  if (errorE) {
    return <Error />
  }

  var resultats = extractResults(treeE, loadingE, errorE, "matchs")

  return (
    <Container maxWidth="sm" >
      <TableContainer component={Paper}>
        <Table aria-label="Résultats">
          <TableHead>
            <TableRow>
              <Hidden xsDown>
                <TableCell>Date</TableCell>
              </Hidden>
              <TableCell align="left">Domicile</TableCell>
              <TableCell align="center">Score</TableCell>
              <TableCell align="right">Exterieur</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultats.map(function (res, index) {
              return (
                <TableRow key={index}>
                  <Hidden xsDown>
                    <TableCell >
                      {convertDate(res['date'])}
                    </TableCell>
                  </Hidden>
                  <TableCell align="left">{res['domicile']}</TableCell>
                  <TableCell align="center">
                    {res['score']['dom'] ?
                      res['score']['dom'] + '-' + res['score']['ext']
                      : ''
                    }
                  </TableCell>
                  <TableCell align="right">{res['exterieur']}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
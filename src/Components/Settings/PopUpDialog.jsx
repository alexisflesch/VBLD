import React from 'react'

import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography'

import { Checkbox, Grid, Box } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel'


export default function PopUpDialog(props) {

  const { open, setOpen, sportifs, trustedUsers, setTrustedUsers } = props;

  let initialState = {}
  for (const sportif of sportifs) {
    initialState[sportif['uid']] = trustedUsers[sportif['uid']]
  }
  const [state, setState] = React.useState(initialState);

  function handleCancel() {
    setState(initialState)
    setOpen(false)
  }

  function handleOk() {
    var trustedUsersT = {}
    const keys = Object.keys(state)
    for (const key of keys) {
      if (state[key]) {
        trustedUsersT[key] = true
      }
    }
    setTrustedUsers(trustedUsersT)
    setOpen(false)
  }

  function handleChangeBox(event, option) {
    var newState = Object.assign({}, state);
    newState[option['uid']] = event.target.checked
    setState(newState)
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      // onEntering={}
      aria-labelledby="Sélection"
      open={open}
    >
      <DialogContent>
        <Typography variant='h6'>
          Utilisateurs de confiance
          </Typography>
        <Box p={.5} />
        <Typography variant='caption' align='justify'>
          Permettre aux utilisateurs sélectionnés de modifier
          vos présences aux événements.
        </Typography>
        <Box p={1} />
        {sportifs.map(option => (
          <Grid item key={option['uid']}>
            <FormControlLabel
              control={
                <Checkbox
                  // checked={option['trusted']}
                  // checked={false}
                  checked={state[option['uid']]}
                  color='primary'
                  onChange={(event) => handleChangeBox(event, option)}
                />
              }
              label={option['nom'] + ' ' + option['prenom']}
            />
          </Grid>
        ))}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Annuler
        </Button>
        <Button onClick={handleOk} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
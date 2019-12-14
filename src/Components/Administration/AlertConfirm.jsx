import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export default function AlertDeleteForReal(props) {
  const { open, setOpen, handleDelete } = props

  const [checked, setChecked] = React.useState(false)

  function handleClose() {
    setOpen(false)
    handleDelete()
  };

  function handleCancel() {
    setOpen(false)
  }

  function handleCheck(event) {
    setChecked(event.target.checked)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmer la suppression"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" align='justify'>
            Attention ! Cette action est irréversible ! Êtes-vous sûr de vouloir
            supprimer cet événement ?
          </DialogContentText>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleCheck}
                value="checked"
                color="primary"
              />}
            label="Je confirme"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" autoFocus>
            Annuler
          </Button>
          <Button onClick={handleClose} color="primary" disabled={!checked}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

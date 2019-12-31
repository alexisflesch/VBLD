import React, { useContext } from 'react'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import IconButton from '@material-ui/core/IconButton';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import firebase from '../Firebase/firebase'
import FirebaseContext from '../Firebase/FirebaseContext'

const options = [
  'Nom Prénom',
  'Prénom Nom',
  'Prénom',
  'Nom Prénom (Pseudo)',
  'Prénom Nom (Pseudo)',
  'Prénom (Pseudo)',
  'Nom (Pseudo)',
  'Pseudo (Nom Prénom)',
  'Pseudo (Prénom)',
];


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: '80%',
    maxHeight: 435,
  },
}));

export default function PseudoMenu() {

  //Context de firebase : setTriPresence(...) demande à (re)trier
  const { affichagePseudos, setAffichagePseudos, user } = useContext(FirebaseContext);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = newValue => {
    setOpen(false);

    if (newValue) {
      setAffichagePseudos(newValue);
      var myRef = firebase.database().ref('/users/' + user['uid'] + '/readWrite/affichagePseudos')
      myRef.set(newValue)
    }
  };

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={() => handleClick()}
      >
        <ChildCareIcon />
      </IconButton>
      <ConfirmationDialogRaw
        classes={{
          paper: classes.paper,
        }}
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={affichagePseudos}
      />
    </>
  );
}


function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
    >
      <DialogTitle id="confirmation-dialog-title">Paramètres d'affichage</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map(option => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio color='primary' />}
              label={option} />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};


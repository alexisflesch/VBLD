import React, { Fragment } from 'react'
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import InputAdornment from '@material-ui/core/InputAdornment';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import BipBip from '../../images/bipbip2.png'
import Coyotte from '../../images/coyotte2.png'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';





const useStyles = makeStyles(theme => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: 60,
    height: 60,
    marginLeft: -theme.spacing(4),
    backgroundColor: 'rgba(0,0,0,0)',
  },
}));


export default function UserInfo(props) {
  const classes = useStyles();
  const { nom, prenom, email, telephone, handleChangeNom,
    handleChangePrenom, handleChangeTelephone, handleChangeEmail,
    civilite, handleChangeCivilite, disabled } = props;

  return (
    <Fragment>
      <FormLabel component="legend">Civilité</FormLabel>



      <Grid container justify="center">
        <Grid item xs={10}>
          <RadioGroup aria-label="position" name="position" value={civilite} onChange={handleChangeCivilite} row>
            <FormControlLabel
              value="bipbip"
              control={<Radio color="primary" />}
              labelPlacement="end"
            />
            <Avatar alt="BipBip" src={BipBip} className={classes.avatar} />

            <Box m={5} />

            <FormControlLabel
              value="coyotte"
              control={<Radio color="primary" />}
              labelPlacement="end"
            />
            <Avatar alt="Coyotte" src={Coyotte} className={classes.avatar} />

          </RadioGroup>
        </Grid>
      </Grid>



      <InputLabel htmlFor="component-simple">
        Nom
      </InputLabel>
      <Input id="component-simple"
        value={nom}
        className={classes.margin}
        fullWidth
        onChange={handleChangeNom}
        disabled={disabled}
      />
      <InputLabel htmlFor="component-simple">
        Prénom
      </InputLabel>
      <Input id="component-simple"
        value={prenom}
        className={classes.margin}
        fullWidth
        onChange={handleChangePrenom}
        disabled={disabled}
      />
      <InputLabel htmlFor="input-with-icon-adornment">
        Adresse email
        </InputLabel>
      <Input
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <MailIcon />
          </InputAdornment>
        }
        value={email}
        className={classes.margin}
        fullWidth
        onChange={handleChangeEmail}
      />
      <InputLabel htmlFor="input-with-icon-adornment">
        Téléphone
        </InputLabel>
      <Input
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <PhoneIcon />
          </InputAdornment>
        }
        value={telephone}
        className={classes.margin}
        fullWidth
        onChange={handleChangeTelephone}
      />
    </Fragment >
  )
}
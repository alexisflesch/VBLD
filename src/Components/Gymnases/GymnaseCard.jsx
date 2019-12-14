import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import ButtonsNormal from '../DirectoryCard/ButtonsNormal';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    marginBottom: 0,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  action: {
    margin: theme.spacing(1),
    padding: 0,
  },
  avatar: {
    marginTop: -11,
    padding: 0,
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
  card: {
    marginTop: 5,
    marginBottom: 5,
    height: 50,
    backgroundColor: "#E9F1F7",
  },
  titre: {
    marginTop: -14,
    marginBottom: -7,
  },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});





export default function MyCard(props) {
  const classes = useStyles();
  const { equipe, lieu, iframe } = props;
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Container maxWidth="xs" >

      <Card className={classes.card} elevation={4} onClick={handleClickOpen}>
        <CardActionArea >
          <CardContent>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <Avatar className={classes.avatar}>
                  {equipe.substring(0, 1).normalize("NFD").replace(/[\u0300-\u036f]/g, "")}
                </ Avatar>
              </Grid>
              <Grid item>
                <Typography className={classes.titre} variant="subtitle1">
                  {equipe}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {lieu}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>


      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {equipe}
            </Typography>
          </Toolbar>
        </AppBar>

        <Box p={1.5} />
        <iframe src={iframe} title="Maps" width="100%" height="80%" frameBorder="0">
        </iframe>
        <Box p={3.5} />
        <ButtonsNormal handleClickAccept={handleClose} buttonName="Fermer" />

      </Dialog>
    </Container >
  );
}
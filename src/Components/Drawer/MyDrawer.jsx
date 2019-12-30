import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';

import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import SportsVolleyballIcon from '@material-ui/icons/SportsVolleyball';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import ContactsIcon from '@material-ui/icons/Contacts';
import MapIcon from '@material-ui/icons/Map';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import HomeIcon from '@material-ui/icons/Home';
import ScoreIcon from '@material-ui/icons/Score';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));


function ResponsiveDrawer(props) {
  const { container, handleChange, sortMenu, pseudoMenu, admin } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function handleClick() {
    if (mobileOpen) {
      handleDrawerToggle();
    }
  };

  var adminTab = null;
  if (admin) {
    adminTab = (
      <ListItem button onClick={() => { handleChange('administration'); handleClick() }}>
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary="Administration" />
      </ListItem>
    )
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button onClick={() => { handleChange('news'); handleClick() }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Accueil" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => { handleChange('entrainements'); handleClick() }}>
          <ListItemIcon>
            <SportsKabaddiIcon />
          </ListItemIcon>
          <ListItemText primary="Entraînements" />
        </ListItem>
        <ListItem button onClick={() => { handleChange('matchs'); handleClick() }}>
          <ListItemIcon>
            <SportsVolleyballIcon />
          </ListItemIcon>
          <ListItemText primary="Matchs" />
        </ListItem>
        <ListItem button onClick={() => { handleChange('resultats'); handleClick() }}>
          <ListItemIcon>
            <ScoreIcon />
          </ListItemIcon>
          <ListItemText primary="Résultats" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => { handleChange('pots'); handleClick() }}>
          <ListItemIcon>
            <FastfoodIcon />
          </ListItemIcon>
          <ListItemText primary="Pots" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => { handleChange('annuaire'); handleClick() }}>
          <ListItemIcon>
            <ContactsIcon />
          </ListItemIcon>
          <ListItemText primary="Annuaire" />
        </ListItem>
        <ListItem button onClick={() => { handleChange('gymnases'); handleClick() }}>
          <ListItemIcon>
            <MapIcon />
          </ListItemIcon>
          <ListItemText primary="Gymnases" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => { handleChange('settings'); handleClick() }}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Paramètres" />
        </ListItem>
        {adminTab}
        <ListItem button onClick={() => { handleChange('disconnect'); handleClick() }}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Déconnexion" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            {props.pageName}
          </Typography>
          {pseudoMenu}
          {sortMenu}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.div}
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
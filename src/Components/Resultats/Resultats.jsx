import React, { Fragment } from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles } from '@material-ui/core/styles';


import ResultatsDanjoutin from './ResultatsDanjoutin'
import ResultatsPoule from './ResultatsPoule'



const useStyles = makeStyles(theme => ({
  tabs: {
    marginBottom: theme.spacing(2),
  },
  margins: {
    paddingTop: theme.spacing(1),
    margin: 0,
  }
}));



export default function Resultats() {

  const classes = useStyles();

  const [valueTab, setValueTab] = React.useState(0);
  const [content, setContent] = React.useState(<ResultatsDanjoutin />);

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
    if (newValue === 1) {
      setContent(<ResultatsPoule />)
    }
    else {
      setContent(<ResultatsDanjoutin />)
    }
  };

  return (
    <Fragment>
      <Paper square className={classes.tabs}>
        <Tabs
          value={valueTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChangeTab}
          aria-label="disabled tabs example"
          variant="fullWidth"
        >
          <Tab label="Danjoutin" />
          <Tab label="Poule B" />
        </Tabs>
      </Paper>
      <div className={classes.margins}>
        {content}
      </div>
    </Fragment>
  )
}
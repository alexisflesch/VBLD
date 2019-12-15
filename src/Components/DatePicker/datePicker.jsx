import React, { Fragment } from 'react';
import 'date-fns';
import frLocale from "date-fns/locale/fr";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import grey from "@material-ui/core/colors/grey";


const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersDay: {
      dayDisabled: {
        color: grey['300'],
      },
    },
  },
});



const useStyles = makeStyles(theme => ({
  jour: {
    marginTop: -theme.spacing(0.8),
  },
}));




export default function MaterialUIPickers(props) {
  const { setCurrentDateId, currentDate, datesAndMore } = props;

  //Initialisation du calendrier
  const [selectedDate, setSelectedDate] = React.useState(currentDate)

  //Quel jour est affiché ?
  let jour
  if (selectedDate === 'fake date') {
    jour = 'Date'
  }
  else {
    const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    jour = jours[selectedDate.getDay()]
  }


  function minMaxDates() {
    let minDate, maxDate;
    //Is date list loaded ?
    if (datesAndMore.length === 0) {
      minDate = new Date('2018-11-20')
      maxDate = new Date('2200-11-20')
    }
    else {
      //Extract data (list is sorted)
      minDate = new Date(datesAndMore[0]['date']);
      maxDate = new Date([...datesAndMore].pop()['date']);
      //Enlarge by 2 days to avoid problems
      minDate.setDate(minDate.getDate() - 2)
      maxDate.setDate(maxDate.getDate() + 2)
    }
    return { minDate, maxDate }
  }

  const { minDate, maxDate } = minMaxDates()

  function handleDateChange(d, value, id = 0) {
    //Update date on calendar
    setSelectedDate(d)
    //Update date id to inform parent to update content
    if (id === 0) {
      //fetch date id
      for (const dam of datesAndMore) {
        var foo = new Date(dam['date'])
        if (foo.setHours(0, 0, 0, 0) === d.setHours(0, 0, 0, 0)) {
          setCurrentDateId(dam['dateId'])
        }
      }
    }
    else {
      setCurrentDateId(id)
    }
  }

  const classes = useStyles();


  function handleClickNext() {
    //Find next date
    for (const dam of datesAndMore) {
      if (dam['date'].setHours(0, 0, 0, 0) > selectedDate.setHours(0, 0, 0, 0)) {
        handleDateChange(dam['date'], 0, dam['dateId'])
        break
      }
    }
  }

  function handleClickPrevious() {
    //Find previous date
    //datesAndMore is sorted. Let's loop from end to begining
    for (var i = datesAndMore.length; i > 0; i--) {
      if (datesAndMore[i - 1]['date'].setHours(0, 0, 0, 0) < selectedDate.setHours(0, 0, 0, 0)) {
        handleDateChange(datesAndMore[i - 1]['date'], 0, datesAndMore[i - 1]['dateId'])
        break
      }
    }
  }

  function disableDates(date) {
    var bool = true;
    for (const d of datesAndMore) {
      if (date.toDateString() === d['date'].toDateString()) {
        bool = false;
        break;
      }
    }
    return (bool);
  }

  function handleRenderDay(day, selectedDate, isInCurrentMonth, dayComponent) {

    // const horizontal = 'right';
    // const vertical = 'bottom';

    // var isSelected;
    // var variant;
    // if (day.getDay() === 4 && isInCurrentMonth) {
    //   isSelected = true;
    //   variant = "dot"
    // }
    // else {
    //   isSelected = false;
    // }

    // return (
    //   <Badge
    //     color="primary"
    //     overlap="circle"
    //     anchorOrigin={{
    //       horizontal,
    //       vertical,
    //     }}
    //     variant={variant}
    //     badgeContent={isSelected ? 1 : undefined}>
    //     {dayComponent}
    //   </Badge>
    // );

    return (
      <div>{dayComponent}</div>
    )

  }

  return (
    <Fragment>
      <Container maxWidth="xs">
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={2}>
            <IconButton className={classes.button} onClick={handleClickPrevious}>
              <ChevronLeftIcon />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
              <ThemeProvider theme={materialTheme}>
                <KeyboardDatePicker
                  maxDate={maxDate}
                  minDate={minDate}
                  margin="normal"
                  id="date-picker-dialog"
                  label={<Typography variant='h6' className={classes.jour}>{jour}</Typography>}
                  format="d MMM yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  autoOk={true}
                  shouldDisableDate={disableDates}
                  invalidDateMessage="Date non valide"
                  renderDay={handleRenderDay}
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={2}>
            <IconButton className={classes.button} onClick={handleClickNext}>
              <ChevronRightIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
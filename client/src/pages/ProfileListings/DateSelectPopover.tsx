import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Popover from '@material-ui/core/Popover';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles({
  popover: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  datePickerCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  datePickerHeader: {
    alignSelf: 'flex-end',
  },
  datePickerTitle: {
    paddingBottom: '1rem',
  },
  datePickerActions: {
    flexDirection: 'column',
  },
  datePickerButton: {
    marginTop: '1rem',
    width: '7rem',
  },
  datePicker: {
    marginRight: '5rem',
    marginLeft: '5rem',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface DateSelectProps {
  open: true | false;
  handleOpen: any;
  handleUpdate: any;
}

const DateSelectPopover: React.FC<DateSelectProps> = ({ open, handleOpen, handleUpdate }) => {
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);

  const handleDateFromChange = (date: Date | null) => {
    setDateFrom(date);
  };

  const handleDateToChange = (date: Date | null) => {
    if (date && dateFrom && date < dateFrom) {
      setSnackbarOpen(true);
    } else {
      setDateTo(date);
    }
  };

  const updateDateRange = (dateFrom: Date | null, dateTo: Date | null) => {
    dateFrom && dateTo ? handleUpdate(dateFrom, dateTo) : handleUpdate(null);
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Popover
      open={open}
      className={classes.popover}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Card className={classes.datePickerCard}>
        <CardHeader
          className={classes.datePickerHeader}
          action={
            <IconButton aria-label="settings">
              <CloseIcon onClick={handleOpen} />
            </IconButton>
          }
        />
        <Typography variant="h5" className={classes.datePickerTitle}>
          Select date range
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.datePicker}
            disableToolbar
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-dialog"
            label="From"
            value={dateFrom instanceof Date ? dateFrom : null}
            onChange={handleDateFromChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            className={classes.datePicker}
            disableToolbar
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-dialog"
            label="to"
            value={dateTo instanceof Date ? dateFrom : null}
            onChange={handleDateToChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <CardActions>
          <Grid container className={classes.datePickerActions}>
            <Button
              className={classes.datePickerButton}
              onClick={() => {
                handleOpen();
                updateDateRange(dateFrom, dateTo);
              }}
            >
              <Typography variant="h5">Go!</Typography>
            </Button>
            <Button
              className={classes.datePickerButton}
              onClick={() => {
                handleOpen();
                updateDateRange(null, null);
              }}
            >
              <Typography variant="h6">Any day</Typography>
            </Button>
          </Grid>
        </CardActions>
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert severity="error">Please select a date later than the start date</Alert>
      </Snackbar>
    </Popover>
  );
};

export default DateSelectPopover;
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: '5rem',
  },
  bookingCard: {
    marginBottom: '1rem',
  },
  booking: {
    boxShadow: 'none',
  },
  cardHeader: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  bookingTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bookingAvatar: {
    marginRight: '1rem',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  bookingProfileGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookingUserInfoGrid: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingAcceptedDeclined: {
    textTransform: 'uppercase',
    color: 'grey',
    alignSelf: 'center',
    marginRight: '2rem',
  },
  noBookingDisplay: {
    paddingLeft: '1rem',
  },
  settingsIcon: {
    color: 'lightgrey',
  },
  bookingList: {
    display: 'block',
  },
  bookingListCurrentPast: {
    height: '50vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  currentPastBooking: {
    border: '1px solid lightgrey',
  },
  dayWithDotContainer: {
    position: 'relative',
  },
  dayWithDot: {
    position: 'absolute',
    height: 0,
    width: 0,
    border: '2px solid',
    borderRadius: 4,
    right: '50%',
    transform: 'translateX(1px)',
    top: '80%',
  },
  badge: {
    backgroundColor: 'white',
    borderRadius: '50%',
    border: '.25px solid lightgrey',
  },
  badgeAnchorTopRight: {
    transform: 'translate(60%, -50%)',
  },
});

export default useStyles;

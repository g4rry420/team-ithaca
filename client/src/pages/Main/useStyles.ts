import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    backgroundColor: 'white',
  },
  mainContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subBox: {
    padding: '30px 15%',
  },
  mainText: {
    fontWeight: 900,
    marginBottom: '80px',
  },
  searchText: {
    fontWeight: 800,
    marginTop: '30px',
  },
  placeSearchInput: {
    width: '50%',
  },
  mainPageBtn: {
    padding: '18px 20px',
    marginTop: '35px',
  },
  mainPhoto: {
    width: '100%',
    height: '100vh',
  },
}));
export default useStyles;

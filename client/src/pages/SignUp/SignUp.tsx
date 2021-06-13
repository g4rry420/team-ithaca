import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import register from '../../helpers/APICalls/register';
import SignUpForm from './SignUpForm/SignUpForm';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useUser } from '../../context/useUserContext';
import { Link } from 'react-router-dom';
import LandingNavbar from '../../components/LandingNavbar/LandingNavbar';

export default function Register(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const { userState } = useUser();

  const handleSubmit = (
    { firstName, lastName, email, password }: { firstName: string; lastName: string; password: string; email: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string; firstName: string; lastName: string }>,
  ) => {
    register(firstName, lastName, email, password, userState.isDogSitter).then((data) => {
      if (data.error) {
        console.error({ error: data.error });
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        if (userState.isDogSitter) {
          updateLoginContext(data.success, '/settings');
        } else {
          updateLoginContext(data.success);
        }
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <div>
      <LandingNavbar />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} elevation={6} component={Paper} square>
          <Box className={classes.authWrapper}>
            <Box width="100%" maxWidth={450} p={3} alignSelf="center">
              <Grid container>
                <Grid item xs>
                  <Typography className={classes.welcome} component="h1" variant="h5">
                    Sign up
                  </Typography>
                </Grid>
              </Grid>
              <SignUpForm handleSubmit={handleSubmit} />
            </Box>
            <Grid className={classes.loginInfo}>
              <Typography>{'Already have an account?'}</Typography>
              <Link to="/login" className={classes.loginLink}>
                Login
              </Link>
            </Grid>
            <Box p={1} alignSelf="center" />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

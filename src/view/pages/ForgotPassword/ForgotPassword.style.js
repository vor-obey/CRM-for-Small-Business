export const ForgotPasswordStyles = (theme => ({
   root: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
   form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
   display: {
      display: 'block',
      marginTop: theme.spacing(8),
   },
   button: {
      margin: theme.spacing(3, 0, 2),
   }
}));

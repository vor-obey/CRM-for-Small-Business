export const profileStyles = (theme => ({
   container: {
      right: 0,
      height: '100%',
      display: 'flex',
      position: 'absolute',
      justifyContent: 'flex-end',
      [theme.breakpoints.down('md')]: {
         position: 'static'
      },
      [theme.breakpoints.down('xs')]: {
         padding: 0,
         position: 'static'
      },
   },

   textWrapper: {
      display: 'flex',
      flexDirection: 'column'
   },
   userName: {
      fontSize: 22,
      height: '100%',
      textAlign: 'end',
      [theme.breakpoints.down('xs')]: {
         fontSize: 16,
      },
   },
   orgName: {
      height: '100%',
      textAlign: 'end',
      [theme.breakpoints.down('xs')]: {
         fontSize: 16,
      },
   },
   icon: {
      width: 50,
      height: '100%',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: 'auto',
      marginBottom: 'auto',
      [theme.breakpoints.down('xs')]: {
         width: 35,
      }
   },
}));

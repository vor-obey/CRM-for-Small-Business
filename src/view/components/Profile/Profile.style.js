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
      },
   },
   textWrapper: {
      display: 'flex',
      flexDirection: 'column'
   },
   userName: {
      fontSize: 18,
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
      margin: `auto ${theme.spacing(1)}px`,
      [theme.breakpoints.down('xs')]: {
         width: 35,
      }
   },
}));

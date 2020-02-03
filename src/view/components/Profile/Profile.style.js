export const profileStyles = (theme => ({
   container: {
      display: 'flex',
      justifyContent: 'flex-end',
      position: 'absolute',
      right: 0,
      height: '100%'
   },
   textWrapper: {
      display: 'flex',
      flexDirection: 'column'
   },
   userName: {
      fontSize: 22,
      height: '100%',
      [theme.breakpoints.down('xs')]: {
         fontSize: 16,
         marginLeft: theme.spacing(6)
      },
   },
   orgName: {
      height: '100%',
      [theme.breakpoints.down('xs')]: {
         fontSize: 16,
         marginLeft: theme.spacing(6)
      },
   },
   icon: {
      width: 50,
      height: '100%',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
         width: 35,
      },
   },
}));

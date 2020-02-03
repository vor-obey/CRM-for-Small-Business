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
      height: '100%'
   },
   orgName: {
      height: '100%'
   },
   icon: {
      width: 50,
      height: '100%',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
   }
}));

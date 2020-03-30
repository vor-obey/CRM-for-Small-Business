export const filterStyle = (theme => ({
   root: {
      display: 'flex',
      justifyContent: 'flex-end',
   },
   form: {
      width: 200,
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
         width: 75,
      }
   },
   input: {
      marginLeft: theme.spacing(1),
      flex: 1,
   },
   iconButton: {
      padding: 10,
   },
}));

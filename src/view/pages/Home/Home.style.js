export const HomeStyles = (theme => ({
   container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: theme.spacing(5)
   },
   root: {
      width: 800,
      marginRight: theme.spacing(15),
      [theme.breakpoints.down('md')]: {
      },
      [theme.breakpoints.down('sm')]: {
      },
   },
   card: {
      width: 300,
      height: 250,
      display: 'flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('md')]: {
         width: 250,
         height: 200
      },
      [theme.breakpoints.down('sm')]: {
         width: 200,
         height: 150 
      },
   },
   chat: {
      width: 300,
      height: 415,
      marginTop: theme.spacing(3),
      [theme.breakpoints.down('md')]: {
         width: 250,
         height: 390 
      },
   },
   graph: {
      width: 640,
      height: 415,
      marginTop: theme.spacing(3),
      [theme.breakpoints.down('md')]: {
         width: 590,
         height: 390 
      },
   }
}));

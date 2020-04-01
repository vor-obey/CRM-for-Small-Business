export const orderDetailsStyles = ((theme) => ({
   root: {
      marginTop: theme.spacing(10),
      [theme.breakpoints.down('xs')]: {
         marginTop: theme.spacing(5)
      }
   },
   container: {
      marginBottom: theme.spacing(4),
      [theme.breakpoints.down('lg')]: {
         marginBottom: theme.spacing(2),
      }
   },
   orderDescription: {
      paddingRight: theme.spacing(1)
   },
   orderCurrency: {
      paddingLeft: theme.spacing(1),
      [theme.breakpoints.down('lg')]: {
         paddingLeft: 0
      }
   },
   customerGrid: {
      marginBottom: theme.spacing(9),
      [theme.breakpoints.down('xs')]: {
         marginBottom: 0,
      }
   },
   wrapper: {
      paddingRight: theme.spacing(2)
   },
   inputManager: {
      paddingRight: theme.spacing(2),
   },
   managerGrid: {
      marginTop: theme.spacing(2)
   },
   button: {
      margin: '5px 5px 0 5px'
   },
   modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('lg')]: {
         margin: '0 15px 0 15px'
      },
      [theme.breakpoints.down('xs')]: {
         overflow: 'auto',
         height: '100%',
         alignItems: 'baseline',
         justifyContent: 'baseline',
      }
   },
   gridModal: {
      display: 'flex',
      backgroundColor: '#fff',
      position: 'relative',
   },
   children: {
      [theme.breakpoints.down('xs')]: {
         marginTop: theme.spacing(4)
      }
   },
   buttonClose: {
      position: 'absolute',
      marginTop: theme.spacing(1),
      right: 0
   },
}));

export const orderDetailsStyles = ((theme) => ({
   root: {
      marginTop: theme.spacing(10),
      [theme.breakpoints.down('xs')]: {
         marginTop: theme.spacing(5)
      }
   },
   orderContainer: {
      marginBottom:  theme.spacing(9),
      [theme.breakpoints.down('lg')]: {
         marginBottom: 0
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
   managerRender: {
      marginTop: theme.spacing(1),
          [theme.breakpoints.down('xs')]: {
         marginTop: theme.spacing(2)
      }
   },
   managerHeading: {
     marginBottom: theme.spacing(2)
   },
   orderStatus: {
      paddingRight: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
         paddingRight: 0
      }
   },
   wrapper: {
      paddingRight: theme.spacing(2)
   },
   customerContainer: {
      [theme.breakpoints.down('xs')]: {
         marginTop: theme.spacing(3)
      }
   },
   managerContainer: {
      paddingBottom: theme.spacing(2)
   },
   button: {
      margin: '0 5px 0 5px'
   }
}));

export const orderDetailsStyles = ((theme) => ({
   root: {
      marginTop: theme.spacing(10),
      [theme.breakpoints.down('xs')]: {
         marginTop: theme.spacing(5)
      }

   },
   orderRender: {
      marginBottom:  theme.spacing(9),
      [theme.breakpoints.down('lg')]: {
         marginBottom: 0
      }
   },
   inputDesciption: {
      paddingRight: theme.spacing(1)
   },
   inputCurrency: {
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
   statusRender: {
      marginTop: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
         marginTop: theme.spacing(0)
      }
   },
   typographyManager: {
     marginBottom: theme.spacing(2)
   },
   inputStatus: {
      paddingRight: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
         paddingRight: 0
      }
   },
   order: {
      paddingRight: theme.spacing(2)
   },
   customer: {
      [theme.breakpoints.down('xs')]: {
         marginTop: theme.spacing(3)
      }
   },
   manager: {
      paddingBottom: theme.spacing(2)
   },
}));

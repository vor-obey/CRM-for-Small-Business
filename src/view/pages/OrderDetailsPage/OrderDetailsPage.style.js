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
   managerRender: {
      marginTop: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
         marginTop: theme.spacing(2)
      }
   },
   managerHeading: {
      marginBottom: theme.spacing(2)
   },
   wrapper: {
      paddingRight: theme.spacing(2)
   },
   button: {
      marginRight: theme.spacing(1),
   },
   managerContainer: {
      paddingBottom: theme.spacing()
   },
}));

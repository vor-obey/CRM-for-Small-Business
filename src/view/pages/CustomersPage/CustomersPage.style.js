export const customersPageStyle = (theme =>  ({
   root: {
      flexGrow: 1,
      marginTop: theme.spacing(10),
      padding: theme.spacing(0),
   },
   container: {
      display: 'flex',
      flexWrap: 'wrap',
   },
   title: {
      textAlign: 'center',
   },
   button: {
      margin: theme.spacing(3, 2, 2),
      alignItems: 'center',
   },
   addCustomer: {
      margin: theme.spacing(0, 1, 0, 0)
   },
   customerBlock: {
      wordWrap: 'break-word',
      '&:nth-child(odd)': {
         backgroundColor: '#efefef',
      },
      '&:hover': {
         backgroundColor: '#cecece',
         transitionDuration: '0.3s',
         transitionTimingFunction: 'linear',
      }
   },
   customerListContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   customerItem: {
      paddingRight: '4px',
      display: 'block',
      textAlign: 'left',
   },
   customerItemTitle: {
      paddingRight: '4px',
      textAlign: 'left',
      variant: 'body1',
   },
   searchBox: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
         marginLeft: theme.spacing(2)
      },
   },
   search: {
      width: '600px',
   },
}));

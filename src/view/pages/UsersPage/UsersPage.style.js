export const usersPageStyle = (theme =>  ({
   root: {
      flexGrow: 1,
      marginTop: theme.spacing(10),
      padding: theme.spacing(0),
   },
   container: {
      display: 'flex',
      flexWrap: 'wrap',
   },
   button: {
      margin: theme.spacing(3, 2, 2),
      alignItems: 'center',
   },
   addUser: {
      margin: theme.spacing(0, 1, 0, 0)
   },
   userListItem: {
      wordWrap: 'break-word',
      '&:nth-child(odd)': {
         backgroundColor: '#efefef',
      },
      '&:hover': {
         backgroundColor: '#cecece',
         transitionDuration: '0.3s',
         transitionTimingFunction: 'linear',
      },
      cursor: 'pointer'
   },
   userListContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   userItem: {
      paddingRight: '4px',
      display: 'block',
      textAlign: 'left',
   },
   userItemTitle: {
      paddingRight: '4px',
      textAlign: 'left',
      variant: 'body1',
   },
   searchBox: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
         marginLeft: theme.spacing(1)
      }
   },
   search: {
      width: '300px',
   },
   selector: {
      width: '200px',
      margin: '0 10px 0 10px',
      [theme.breakpoints.down('xs')]: {
         margin: '0 0 0 10px',
      }
   },
}));

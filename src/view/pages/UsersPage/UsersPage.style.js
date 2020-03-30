export const usersPageStyle = (theme =>  ({
   root: {
      marginTop: theme.spacing(10),
       [theme.breakpoints.down('xs')]: {
         marginTop: theme.spacing(3)
       }
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
   searchBox: {
      display: 'flex',
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
   filter: {
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
   textList: {
      display: 'none',
      [theme.breakpoints.down('xs')]: {
         display: 'block',
         marginRight: theme.spacing(1)
      }
   },
   gridUserContainer: {
      [theme.breakpoints.down('xs')]: {
         display: 'none'
      }
   },
   gridList: {
      display: 'flex',
      alignItems: 'center',
      overflowWrap: 'break-word'
   },
   gridNumber: {
      display: 'flex',
      alignItems: 'center',
      overflowWrap: 'break-word',
      [theme.breakpoints.down('xs')]: {
         display: 'none'
      }
   }
}));

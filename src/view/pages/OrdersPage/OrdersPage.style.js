export const ordersPageStyles = ((theme) => ({
   root: {
      marginTop: theme.spacing(10),
      [theme.breakpoints.down('xs')]: {
         marginTop: theme.spacing(3)
      }
   },
   statusGrid: {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      overflowWrap: 'break-word'
   },
   gridList: {
      display: 'flex',
      alignItems: 'center',
      overflowWrap: 'break-word'
   },
   orderGrid: {
      hyphens: 'auto',
      overflowWrap: 'break-word'
   },
   textStatus: {
      textAlign: 'center',
      wordBreak: 'break-all'
   },
   searchBox: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
   },
   selector: {
      width: '200px',
      margin: '0 10px 0 10px',
      [theme.breakpoints.down('xs')]: {
      margin: '0 0 0 10px',
      }
   },
   textList: {
      display: 'none',
      [theme.breakpoints.down('xs')]: {
         display: 'block',
         marginRight: theme.spacing(1)
      }
   },
   gridOrderContainer: {
      [theme.breakpoints.down('xs')]: {
         display: 'none'
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
}));

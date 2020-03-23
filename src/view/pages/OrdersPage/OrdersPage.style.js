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
   customerGrid: {
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

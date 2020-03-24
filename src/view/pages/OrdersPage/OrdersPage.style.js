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
      justifyContent: 'flex-end',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
         justifyContent: 'center',
      }
   },
   search: {
      width: '300px',
   },
   selector: {
      width: '203px',
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
   }
}));

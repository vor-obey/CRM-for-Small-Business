export const HomeStyles = (theme => ({
   root: {
      display: 'inline-grid',
      justifyContent: 'center'
   },
   gridCloud: {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(50),
      [theme.breakpoints.down('md')]: {
         width: 400
      },
      [theme.breakpoints.down('sm')]: {
         width: 300,
         marginRight: theme.spacing(30)
      },
      [theme.breakpoints.down('xs')]: {
         width: 240,
         marginRight: theme.spacing(10),
      }
   },
   textInOne: {
      color: '#F2AA1B',
      top: '26%',
      fontSize: 40,
      position: 'absolute',
      letterSpacing: -1.5,
      fontWeight: 'bold',
      paddingLeft: theme.spacing(8),
      [theme.breakpoints.down('lg')]: {
         top: '30%',
         fontSize: 36,
         position: 'absolute',
         paddingLeft: theme.spacing(8),
      },
      [theme.breakpoints.down('md')]: {
         top: '26%',
         fontSize: 32,
         position: 'absolute',
         paddingLeft: theme.spacing(5),
      },
      [theme.breakpoints.down('sm')]: {
         top: '24%',
         fontSize: 28,
         position: 'absolute',
         paddingLeft: theme.spacing(6),
      },
      [theme.breakpoints.down('xs')]: {
         top: '19%',
         fontSize: 23,
         fontWeight: 'bold',
         position: 'absolute',
         paddingLeft: theme.spacing(2),
      }
   },
   textInTwo: {
      color: '#F2AA1B',
      top: '30%',
      fontSize: 40,
      position: 'absolute',
      letterSpacing: -1.5,
      fontWeight: 'bold',
      paddingLeft: theme.spacing(8),
      [theme.breakpoints.down('lg')]: {
         top: '36%',
         fontSize: 36,
         position: 'absolute',
         paddingLeft: theme.spacing(18),
      },
      [theme.breakpoints.down('md')]: {
         top: '31%',
         fontSize: 32,
         position: 'absolute',
         paddingLeft: theme.spacing(15),
      },
      [theme.breakpoints.down('sm')]: {
         top: '29%',
         fontSize: 28,
         position: 'absolute',
         paddingLeft: theme.spacing(13),
      },
      [theme.breakpoints.down('xs')]: {
         top: '23%',
         fontSize: 23,
         fontWeight: 'bold',
         position: 'absolute',
         paddingLeft: theme.spacing(9),
      }
   },
   gridDog: {
      marginLeft: theme.spacing(25),
      [theme.breakpoints.down('md')]: {
         width: 400
      },
      [theme.breakpoints.down('sm')]: {
         width: 350,
         marginLeft: theme.spacing(10)
      },
      [theme.breakpoints.down('xs')]: {
         width: 300,
         marginLeft: theme.spacing(2),
      }
   },
   imgDog: {
      width: 500,
      [theme.breakpoints.down('md')]: {
         width: 400
      },
      [theme.breakpoints.down('sm')]: {
         width: 400
      },
      [theme.breakpoints.down('xs')]: {
         width: 300
      },
   },
   imgCloud: {
      width: 500,
      [theme.breakpoints.down('md')]: {
         width: 400
      },
      [theme.breakpoints.down('sm')]: {
         width: 350
      },
      [theme.breakpoints.down('xs')]: {
         width: 240,
      }
   }
}));

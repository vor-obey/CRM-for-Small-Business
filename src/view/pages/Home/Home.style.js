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
   textInCloud: {
      color: '#F2AA1B',
      top: '22%',
      fontSize: 38,
      position: 'absolute',
      paddingLeft: theme.spacing(8),
      [theme.breakpoints.down('lg')]: {
         top: '28%',
         fontSize: 36,
         position: 'absolute',
         paddingLeft: theme.spacing(8),
      },
      [theme.breakpoints.down('md')]: {
         top: '24%',
         fontSize: 32,
         position: 'absolute',
         paddingLeft: theme.spacing(5),
      },
      [theme.breakpoints.down('sm')]: {
         top: '22%',
         fontSize: 28,
         position: 'absolute',
         paddingLeft: theme.spacing(5),
      },
      [theme.breakpoints.down('xs')]: {
         top: '18%',
         fontSize: 20,
         position: 'absolute',
         paddingLeft: theme.spacing(3),
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

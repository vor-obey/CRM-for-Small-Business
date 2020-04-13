export const HomeStyles = (theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(5)
    },
    root: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginRight: 0,
        },
    },
    grid: {
      margin: '0px 15px'
    },
    header: {
        height: 20,
        color: '#FFF',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(63,81,181,1) 45%, rgba(34,171,199,1) 100%)',
        [theme.breakpoints.down('xs')]: {
            height: 1,
        },
    },
    typography : {
        [theme.breakpoints.down('xs')]: {
            fontSize: 18
        },
    },
    card: {
        width: '100%',
        height: 250,
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            width: 250,
            height: 200
        },
        [theme.breakpoints.down('sm')]: {
            width: '95%',
            height: 200,
            marginTop: theme.spacing(3),
        },
        [theme.breakpoints.down('xs')]: {
            width: '95%',
            marginTop: theme.spacing(1),
        },
    },
    cardAction: {
        height: 250,
        [theme.breakpoints.down('md')]: {
            width: 250,
            height: 200
        },
        [theme.breakpoints.down('sm')]: {
            width: '95%',
            height: 200,
        },
        [theme.breakpoints.down('xs')]: {
            width: '95%',
        },
    },
    chatCard: {
        marginTop: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
            width: 250,
            height: 370
        },
        [theme.breakpoints.down('sm')]: {
            width: '95%',
            height: 200
        },
        [theme.breakpoints.down('xs')]: {
            width: '96%',
            height: 200,
            marginTop: theme.spacing(1),
        }
    },
    graph: {
        width: 640,
        marginTop: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
            width: 590,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '98%',
        }
    },
    displayError: {
        [theme.breakpoints.down('xs')]: {
            fontSize: 13
        }
    }
}));

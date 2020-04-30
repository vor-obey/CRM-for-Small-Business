export const HomeStyles = (theme => ({
    container: {
        marginTop: theme.spacing(5)
    },
    grid: {
        margin: '0px 10px',
        [theme.breakpoints.down('sm')]: {
            margin: '0px 0px',
        },
        [theme.breakpoints.down('xs')]: {
            margin: '20px 0px 0px 0px',
        },
    },
    gridReady: {
        margin: '0px 10px',
        [theme.breakpoints.down('sm')]: {
            margin: '20px 0px 0px 0px',
        },
    },
    header: {
        height: 20,
        color: '#FFF',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(63,81,181,1) 45%, rgba(34,171,199,1) 100%)',
    },
    typography: {
        [theme.breakpoints.down('xs')]: {
            fontSize: 18
        },
    },
    card: {
        height: 250,
        width: '100%',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '98%'
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        }
    },
    cardAction: {
        height: 250,
        width: '100%',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '98%'
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        }
    },
    chatCard: {
        width: '100%',
        marginTop: 20,
        [theme.breakpoints.down('sm')]: {
            height: 250,
            width: '98%',
            overflowY: 'auto',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginTop: 0
        }
    },
    graph: {
        width: '90%',
        height: '94%',
        marginTop: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: 0
        }
    },
    displayError: {
        [theme.breakpoints.down('xs')]: {
            fontSize: 13
        }
    },
    number: {
        fontWeight: 370
    }
}));

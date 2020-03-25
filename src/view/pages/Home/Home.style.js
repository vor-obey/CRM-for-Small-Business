export const HomeStyles = (theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(5)
    },
    root: {
        width: 800,
        marginRight: theme.spacing(15),
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginRight: 0,
        },
    },
    header: {
        height: 20,
        color: '#FFF',
        textAlign: 'center',
        backgroundColor: '#3f51b5',
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
        width: 300,
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
        width: 300,
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
    chat: {
        width: 300,
        height: 395,
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
}));

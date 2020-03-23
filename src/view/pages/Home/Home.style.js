export const HomeStyles = (theme => ({
    '@font-face': {
        fontFamily: 'Cuprum',
        src: 'url(https://fonts.googleapis.com/css2?family=Cuprum&display=swap)'
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(5)
    },
    root: {
        width: 1024,
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
    typography: {
        [theme.breakpoints.down('xs')]: {
            fontSize: 18
        },
    },
    cardsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        },
    },
    card: {
        width: 300,
        height: 250,
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        borderRadius: '40% 15% 40% 15%',
        fontFamily: 'Cuprum',
        background: 'linear-gradient(45deg, rgba(63,81,181,1) 40%, rgba(34,171,199,1) 100%)',

        [theme.breakpoints.down('md')]: {
            width: 250,
            height: 200,
            margin: theme.spacing(3),
        },
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(3),
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            margin: theme.spacing(3, 0),
        },
    },
    cardAction: {
        width: 300,
        height: 250,
    },
    gridChat: {
        width: 300,
        height: 395,
        [theme.breakpoints.down('md')]: {
            width: 250,
            height: 370
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: 200
        },
        [theme.breakpoints.down('xs')]: {
            width: '96%',
            height: 200,
            marginTop: theme.spacing(1),
        }
    },
    chatText: {
        color: '#848484',
        textAlign: 'center',
    },
    gridGraph: {
        width: 662,
        [theme.breakpoints.down('md')]: {
            width: 640,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '98%',
        }
    },


}));

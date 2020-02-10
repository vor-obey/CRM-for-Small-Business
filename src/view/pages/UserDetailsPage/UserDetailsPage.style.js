export const userDetailsStyle = (theme =>  ({
    root: {
        marginTop: theme.spacing(2),
        width: '100%',
    },
    containerList: {
        width: '100%',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    userItem: {
        wordWrap: 'break-word',
        margin: theme.spacing(0, 0, 2, 0),
    },
    allUsers: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        width: '100%',
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',

    },
    title: {
        marginTop: theme.spacing(3),
    },
    fab: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.primary.main,
    },
    userInfo: {
        wordWrap: 'break-word',
    },
    userDetail: {
        display: 'grid',
        justifyContent: 'space-evenly',
    },
}));

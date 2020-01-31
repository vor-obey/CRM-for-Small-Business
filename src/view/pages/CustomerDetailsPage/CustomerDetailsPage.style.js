export const customerDetailsStyle = (theme =>  ({
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
    form: {
        margin: theme.spacing(3),
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    fab: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.primary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        alignItems: 'center',
    },
    addUser: {
        margin: theme.spacing(0, 1, 0, 0)
    },
    textField: {
        width: '100%',
    }
}));

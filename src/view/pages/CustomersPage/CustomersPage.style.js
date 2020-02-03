export const customersPageStyle = (theme =>  ({
    table: {
        maxWidth: 800,
        marginTop: theme.spacing(10),
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        alignItems: 'center'
    },
    button: {
        margin: theme.spacing(3, 10, 2),
        alignItems: 'center',
    },
    addUser: {
        margin: theme.spacing(0, 1, 0, 0)
    },
    allUsers: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

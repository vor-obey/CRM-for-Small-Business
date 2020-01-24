export const userDetailsStyle = (theme =>  ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '90%',
        minWidth: 300,
    },
    card: {
        margin: theme.spacing(3, 2, 2),
        width: '40%',
        minWidth: 275,
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
    form: {
        width: '100%', // Fix IE 11 issue.
        margin: theme.spacing(3),
    },
    textField: {
        width: '100%',
    }
}));

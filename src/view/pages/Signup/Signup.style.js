export const signupStyle = (theme =>  ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    select: {
        margin: theme.spacing(1, 0),
        minWidth: 120,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const saveCustomerStyle = (theme =>  ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleText: {
        [theme.breakpoints.down('xs')]: {
           fontSize: 20
        }
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    create: {
        color: '#ffffff',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    select: {
        margin: theme.spacing(1, 0),
        minWidth: '100%'
    },
    formControl: {
        width: '100%',
        margin: theme.spacing(0, 0, 2)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    typographySources: {
        fontSize: 16,
    }
}));

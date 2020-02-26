export const filterStyle = (theme => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    form: {
        width: 200,
        margin: '2px 4px',
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            margin: '2px 15px',
        }
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}));
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
            width: 75,
            margin: '0px 5px 0px 5px',
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

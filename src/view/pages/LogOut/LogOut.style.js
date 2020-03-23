export const logOutStyle = (theme =>  ({
    root: {
        marginTop: theme.spacing(5),
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: theme.spacing(5, 0),
        padding: theme.spacing(10, 0),
    },
    textBar: {
        margin: theme.spacing(5, 0),
        fontSize: '20px',
    },
    buttonBar: {
        justifyContent: 'center',
        margin: '0 auto',
    },
    button: {
        justifyContent: 'center',
    },
}));

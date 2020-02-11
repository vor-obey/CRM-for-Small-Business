export const usersPageStyle = (theme =>  ({
    root: {
        flexGrow: 1,
        // width: '85%',
        marginTop: theme.spacing(10),
        padding: theme.spacing(0),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing(3, 2, 2),
        alignItems: 'center',
    },
    addUser: {
        margin: theme.spacing(0, 1, 0, 0)
    },
    userBlock: {
        wordWrap: 'break-word',
        '&:nth-child(odd)': {
            backgroundColor: '#efefef',
        },
        '&:hover': {
            backgroundColor: '#cecece',
            transitionDuration: '0.3s',
            transitionTimingFunction: 'linear',
        }
    },
    userListContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userItem: {
        paddingRight: '4px',
        display: 'block',
        textAlign: 'left',
    },

    userItemTitle: {
        paddingRight: '4px',
        textAlign: 'left',
        variant: 'body1',
    },
}));

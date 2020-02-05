export const usersPageStyle = (theme =>  ({
    root: {
        flexGrow: 1,
        width: '85%',
        marginTop: theme.spacing(10),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing(3, 10, 2),
        alignItems: 'center',
    },
    addUser: {
        margin: theme.spacing(0, 1, 0, 0)
    },
    userListItem: {
        '&:nth-child(odd)': {
            backgroundColor: '#efefef',
        },
        '&:hover': {
            backgroundColor: '#cecece',
            transitionDuration: '0.3s',
            transitionTimingFunction: 'linear',
        }
    },
}));

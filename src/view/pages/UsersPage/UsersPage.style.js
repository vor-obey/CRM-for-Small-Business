export const usersPageStyle = (theme =>  ({
    root: {
        flexGrow: 1,
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
    userListItem: {
        wordWrap: 'break-word',
        '&:nth-child(odd)': {
            backgroundColor: '#efefef',
        },
        '&:hover': {
            backgroundColor: '#cecece',
            transitionDuration: '0.3s',
            transitionTimingFunction: 'linear',
        },
        cursor: 'pointer'
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
    searchBox: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    selector: {
        width: 205,
        [theme.breakpoints.down('xs')]: {
            width: 220
        }
    },
}));

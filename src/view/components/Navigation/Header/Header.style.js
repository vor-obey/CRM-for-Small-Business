export const headerStyle = (theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {
        justifyContent: 'space-between',
        background: 'linear-gradient(5deg, rgba(63,81,181,1) 45%, rgba(34,171,199,1) 100%)',
    },
    user: {
        display: 'flex',
        flexDirection: 'row',
    },
    flags: {
        '&:before': {
            borderBottom: 'none',
        },
        '&:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
        },
    }
}));

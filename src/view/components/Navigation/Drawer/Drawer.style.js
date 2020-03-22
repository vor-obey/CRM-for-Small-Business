export const drawerStyle = (theme => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    burger: {
        color: '#ffffff',
    },
    menuItem: {
        '&:hover': {
            color: '#fff',
            background: 'linear-gradient(90deg, rgba(63,81,181,1) 50%, rgba(34,171,199,1) 100%)',
            '.MuiListItemIcon-root': {
                color: '#fff',
            },
        },
    },
}));

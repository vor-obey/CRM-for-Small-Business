export const NotificationPageStyle = (theme => ({
    root: {
        height: 70,
        width: '100%',
        display: 'flex',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    listItem: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    gridDescription: {
        width: '95%',
        display: 'flex',
        justifyContent: 'center',
    },
    rootDesktop: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    textList: {
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            paddingRight: theme.spacing(1)
        }
    },
    designDesktop: {
        display: 'block',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    designMobile: {
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'block'
        }
    },
    divButton: {
        display: 'flex',
        justifyContent: 'center'
    },
    text: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
}));

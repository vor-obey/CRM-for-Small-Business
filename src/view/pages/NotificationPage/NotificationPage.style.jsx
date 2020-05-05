export const NotificationPageStyle = (theme => ({
    container: {
      paddingLeft: '8px',
      paddingRight: '8px'
    },
    wrap: {
      display: 'flex',
      alignItems: 'center',
      margin: '5px'
    },
    panel: {
      padding: 0,
      marginLeft: '2px',
      marginRight: '4px',
    },
    root: {
        width: '100%',
        display: 'flex',
    },
    username: {
        fontWeight: 'bold',
    },
    message: {
        paddingLeft: 4,
        wordBreak: 'break-all',
        [theme.breakpoints.down('xs')]: {
            width: 60,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            textOverflow: 'ellipsis',
        }
    },
    send: {
      wordBreak: 'break-word'
    },
    date: {
        color: 'gray',
        paddingLeft: 6
    },
    desktop: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    divMobile: {
        padding: 0,
        width: '100%',
        marginTop: theme.spacing(1)
    },
    messageMobile: {
        wordBreak: 'break-all',
    },
    mobile: {
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'block'
        }
    }
}));

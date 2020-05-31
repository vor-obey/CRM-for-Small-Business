const drawerWidth = 400;

export const chatWrapperStyles = (theme => ({
    container: {
        display: 'flex',
        padding: 0,
        width: '100%',
        height: 'calc(100vh - 64px)'
    },
    listThreads: {
        maxWidth: '300px',
        border: '1px solid #B7BFC4',
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    listThreadsMin: {
        width: '72px',
        minWidth: '72px',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    listDialog: {
        width: '100%',
        border: '1px solid #E9EBED',
        borderTop: 'none',
        borderLeft: 'none',
        backgroundColor: '#EFF7FD',
        position: 'relative',
        '@media (max-width: 600px)': {
            width: '100%'
        },
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    sentBox: {
        borderTop: '1px solid #B7BFC4',
        position: 'sticky',
        bottom: '0',
        backgroundColor: '#f0f7fd',
        zIndex: 1,
        padding: '20px',
        width: 'calc(100% - 40px)',
    },
    noMessage: {
        width: '100%',
        border: '1px solid #E9EBED',
        borderLeft: 'none',
        backgroundColor: '#EFF7FD',
        position: 'relative',
    },
    threadText: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        height: '1.5em',
        whiteSpace: 'nowrap'
    },
    additionals: {
        // width: '10%',
        border: '1px solid #B7BFC4',
        borderLeft: 'none',
        backgroundColor: '#E7EBF0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    additionalsBlocks: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    additionalsNavigation: {
        width: '100px',
        height: '100%',
        borderRight: '1px solid #B7BFC4',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    additionalButton: {
        width: 50
    },
    additionalChild: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    additionalChildHidden: {
        display: 'none',
    },
    dialogHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 20px',
        width: '100%',
        height: '25px',
        borderBottom: '1px solid #B7BFC4',
        position: 'sticky',
        top: 0,
        backgroundColor: '#f0f7fd',
        zIndex: 1
    },
    messageText: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
        marginRight: 5,
        marginLeft: 5,
        flex: 'unset',
        wordBreak: 'break-word'
    },
    messageImg: {
        width: 150,
        height: 150
    },
    messageUnsupported: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 5,
        padding: 10,
        marginRight: 5,
        marginLeft: 5,
        flex: 'unset'
    },
    text: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    typographyCredentials: {
        textAlign: 'center',
        padding: 5
    },
    cursor: {
        cursor: 'pointer'
    },
    mobileContainer: {
        padding: 0
    },
    mobileList: {
        padding: 0,
        width: '100%'
    },
    backButton: {
        cursor: 'pointer',
        paddingRight: 10
    },
    form: {
        width: '100%',
        display: 'flex'
    },
    flexEnd: {
        justifyContent: 'flex-end'
    },
    flexStart: {
        justifyContent: 'flex-start'
    },
    chatEnterContainer: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        top: '64px',
        padding: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: '100px',
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        top: '65px',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        width: '100px',
        top: '65px',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
    },
}));

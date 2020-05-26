export const chatWrapperStyles = (theme => ({
    container: {
        display: 'flex',
        padding: 0,
        width: '100%',
        height: 'calc(100vh - 64px)'
    },
    listThreads: {
        width: '30%',
        borderWidth: 1,
        borderColor: '#B7BFC4',
        borderStyle: 'solid',
        overflowX: 'hidden',
    },
    listDialog: {
        width: '100%',
        border: '1px solid #E9EBED',
        borderLeft: 'none',
        backgroundColor: '#EFF7FD',
        position: 'relative',
        '@media (max-width: 600px)': {
            width: '100%'
        }
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
        border: '1px solid #B7BFC4',
        borderLeft: 'none',
        padding: '0 10px'
    },
    threadText: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        height: '1.5em',
        whiteSpace: 'nowrap'
    },
    additionals: {
        width: '10%',
        border: '1px solid #B7BFC4',
        borderLeft: 'none',
        backgroundColor: '#E7EBF0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'

    },
    dialogHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 20px',
        width: 'inherit',
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
        padding: 20,
    },
}));

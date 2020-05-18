export const ChatStyles = (theme => ({
    container: {
        display: 'flex',
        padding: 0,
        marginTop: theme.spacing(1),
        height: 850
    },
    listThreads: {
        width: '50%',
        borderWidth: 1,
        borderColor: '#B7BFC4',
        borderStyle: 'solid',
    },
    listDialog: {
        width: '50%',
        borderWidth: 1,
        borderColor: '#B7BFC4',
        borderStyle: 'solid',
        backgroundColor: '#EFF7FD'
    },
    messageText: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
        marginRight: 5,
        marginLeft: 5,
        flex: 'unset',
        wordBreak: 'break-all'
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
    scroll: {
        height: 840,
        overflowY: 'scroll',
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

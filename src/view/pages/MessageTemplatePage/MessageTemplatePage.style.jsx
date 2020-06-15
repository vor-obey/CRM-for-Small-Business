export const templatePageStyles = ((theme) => ({
    container: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
    },
    containerChat: {
        display: 'flex',
        width: '100%',
        [theme.breakpoints.down('md')]: {
            width: '90%',
        },
        '@media (max-width: 769px)': {
            width: '100%'
        },
        justifyContent: 'center',
    },
    buttonContainer: {
        marginTop: 18
    },
    noNewText: {
        paddingBottom: 18
    },
    justifyContainerButton: {
        display: 'grid',
        paddingTop: 24
    },
    display: {
        display: 'flex'
    },
    break: {
        whiteSpace: 'break-spaces',
        wordBreak: 'break-all'
    },
    inputContent: {
        marginTop: 8
    },
    root: {
        width: '90%',
        paddingBottom: 20,
        [theme.breakpoints.down('xs')]: {
            width: '95%',
            paddingBottom: 10,
        },
    },
    templateList: {
        marginTop: 20,
        padding: 0,
    },
    templateGrid: {
        marginTop: 20,
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 5,
        padding: 0,
    },
    templateTitle: {
        flexDirection: 'column',
    },
    templateTitleWithCursor: {
        flexDirection: 'column',
        cursor: 'pointer'
    },
    templateContainerName: {
        padding: 0,
        justifyContent: 'space-between'
    },
    templateContainerContent: {
        margin: theme.spacing(1)
    },
    templateTitleName: {
        wordBreak: 'break-word',
        padding: theme.spacing(2)
    },
    templateInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    templateMeta: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
    },
    none: {
        display: 'none'
    },
    button: {
        paddingBottom: 30
    },
    readMoreText: {
        fontSize: '16px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        wordBreak: 'break-word',
        color: 'gray',
        textOverflow: 'ellipsis',
        marginTop: 6,
    },
    readMoreTextChat: {
        fontSize: '16px',
        cursor: 'pointer',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        wordBreak: 'break-word',
        color: 'gray',
        textOverflow: 'ellipsis',
        marginTop: 6,
        [theme.breakpoints.down('xl')]: {
            width: '760px'
        },
        [theme.breakpoints.down('lg')]: {
            width: '450px'
        },
        [theme.breakpoints.down('sm')]: {
            width: '700px'
        },
        [theme.breakpoints.down('xs')]: {
            width: '500px'
        },
    },
    readLessText: {
        fontSize: '16px',
        color: 'gray',
        cursor: 'pointer',
        marginTop: 4,
        wordBreak: 'break-word',
        whiteSpace: 'break-spaces'
    },
    buttonText: {
        fontSize: '12px',
        cursor: 'pointer',
        whiteSpace: 'pre',
        paddingTop: '10px',
    },
    gridMore: {
        padding: 6,
        width: '99%',
    },
    gridLess: {
        padding: 6
    }
}));

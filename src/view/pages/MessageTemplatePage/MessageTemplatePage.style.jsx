export const templatePageStyles = ((theme) => ({
    container: {
        display: 'flex',
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
    divName: {
        padding: 10
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
    }
}));

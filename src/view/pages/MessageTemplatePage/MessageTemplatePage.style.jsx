export const templatePageStyles = ((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center'
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

    },
    inputContent: {
        marginTop: 8
    },
    divName: {
        padding: 10
    },
    root: {
        width: '90%',
        [theme.breakpoints.down('xs')]: {
            width: '95%',
        },
    },
    templateList: {
        marginTop: 20,
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 5,
        paddingLeft: 0,
        paddingBottom: 0,
        paddingRight: 0,
    },
    templateTitle: {
        flexDirection: 'column',
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
}));

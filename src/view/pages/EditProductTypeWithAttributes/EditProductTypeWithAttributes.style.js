export const editProductTypeWithAttributesStyles = (theme => ({
    root: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(5),
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3)
        }
    },
    container: {
        padding: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    containerTitle: {
        marginTop: 15,
        marginBottom: 15,
        textAlign: 'center',
        width: '100%'
    },
    containerTypeItem: {
        marginTop: '15px',
        wordWrap: 'break-word',
        justifyContent: 'space-between'
    },
    containerAttribute: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between'
    },
    containerAttributeItem: {
        marginTop: theme.spacing(3),
    },
    containerAttributeHeader: {
        border: '1px solid rgba(0, 0, 0, 0.12)'
    },
    containerAttributeContent: {
        maxHeight: 100,
        overflow: 'auto',
        padding: 0
    },
    containerAttributeIcon: {
        padding: '5px 5px 0',
    },
    buttonContainer: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonFab: {
        margin: theme.spacing(3),
    },
}));
export const editAttributeStyles = (theme => ({
    root: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    title: {
        marginTop: theme.spacing(3),
        textAlign: 'center',
    },
    attributeContainer: {
        marginTop: 30
    },
    attributeValueContainer: {
        marginTop: 10,
        marginBottom: 10,
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: 5,
    },
    attributeItem: {
        width: '100%',
        maxHeight: 300,
        overflow: 'auto',
    },
    buttonContainer: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
    },
    button: {
        margin: theme.spacing(3),
    },
}));
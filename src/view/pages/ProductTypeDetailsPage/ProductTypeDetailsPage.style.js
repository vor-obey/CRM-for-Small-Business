export const productTypeDetailsPageStyles = (theme => ({
    root: {
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(3)
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
    containerType: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
    },
    containerTypeItem: {
        marginTop: '15px',
        wordWrap: 'break-word',
        justifyContent: 'space-between'
    },
    containerTypeAttribute: {
        marginTop: theme.spacing(5)
    },
    attributeValue: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '100%'
    },
    attributeValueTitle: {
        display: 'block',
    },
    attributeValueItem: {
        marginRight: theme.spacing(3),
        display: 'inline-block',
    },
    containerAbstractAttribute: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    buttonContainer: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonFab: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.primary.main,
    },
}));
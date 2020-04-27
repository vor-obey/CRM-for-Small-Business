export const saveAbstractProductPageStyles = (theme => ({
    root: {
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(3)
        }
    },
    paper: {
        padding: '20px',
        width: '100%'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        }
    },
    containerTitle: {
        marginTop: 15,
        marginBottom: 15,
        textAlign: 'center',
        width: '100%'
    },
    containerProduct: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'space-between'
    },
    containerProductItem: {
        marginTop: '15px',
    },
    containerProductType: {
        textAlign: 'center',
        marginTop: '15px',
        justifyContent: 'space-between'
    },
    containerType: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
    },
    containerTypeItem: {
        marginTop: '15px',
        wordWrap: 'break-word',
    },
    attributeValue: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
    },
    attributeValueItem: {
        marginRight: theme.spacing(3),
        display: 'inline-block',
    },
    buttonContainer: {
        alignContent: 'center',
        textAlign: 'center'
    },
    button: {
        margin: theme.spacing(3),
    },
}));
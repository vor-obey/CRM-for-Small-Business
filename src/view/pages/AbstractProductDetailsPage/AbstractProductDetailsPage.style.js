export const abstractProductDetailsPageStyles = (theme => ({
    root: {
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(3)
        }
    },
    paper: {
        padding: '20px',
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
    },
    containerProductItem: {
        marginTop: '15px',
        wordWrap: 'break-word',
    },
    containerProductList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
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
    buttonContainer: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonFab: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.primary.main,
    },
}));
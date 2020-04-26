export const productDetailsPageStyles = (theme => ({
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
    buttonContainer: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonFab: {
        margin: theme.spacing(3, 3, 0),
        backgroundColor: theme.palette.primary.main,
    },
}))
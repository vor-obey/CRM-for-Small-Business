export const addOrderProductStyles = (theme => ({
    container: {
        padding: theme.spacing(4, 0, 0, 0),
    },
    containerProduct: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(2),
        },
    },
    containerProductMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerProductItemTotal: {
        textAlign: 'right',
        marginBottom: theme.spacing(1)
    },
    amountButton: {
        width: 0,
    },
    amount: {
        '& input.MuiOutlinedInput-input': {
            textAlign: 'center'
        }
    },
    currency: {
        textAlign: 'center',
        '&:before': {
            borderBottom: 'none',
            content: 'none',
        },
        '&:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
            content: 'none',
        },
    },
    buttonContainer: {
        marginTop: theme.spacing(3)
    },
    buttonFab: {
        marginRight: theme.spacing(1),

    },
    '@media (max-width:669px)': {
        buttonFab: {
            marginBottom: 10
        }
    }
}));

export const addOrderProductStyles = (theme => ({
    container: {
        padding: theme.spacing(4, 2, 0, 2),
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
    },
    containerProductItem: {
        marginTop: theme.spacing(4),
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
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonFab: {
        margin: '0px 24px 24px',
    },
}));
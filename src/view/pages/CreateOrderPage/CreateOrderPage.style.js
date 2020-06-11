export const createOrderPageStyles = (theme => ({
        root: {
            marginTop: theme.spacing(3)
        },
        paper: {
            padding: theme.spacing(2),
            width: '100%'
        },
        submit: {
            margin: theme.spacing(3, 0, 2)
        },
        heading: {
            paddingBottom: 5,
            paddingTop: 5,
            textAlign: 'left'
        },
        productList: {
            marginTop: 10,
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: 5,
            marginBottom: 5,
            [theme.breakpoints.up('sm')]: {
                paddingLeft: 0,
            },
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 0,
                paddingRight: 0
            },
        },
        removeProduct: {
            display: 'flex',
            justifyContent: 'center',
            height: '100%',
            alignItems: 'center',
            marginBottom: theme.spacing(2),
            [theme.breakpoints.down('xs')]: {
                display: 'block',
                height: 0,
                position: 'absolute',
                right: 0,
                top: 0,
                marginTop: 6,
            },
        },
        productTitle: {
            flexDirection: 'column',
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 35,
            },
        },
        productTitleName: {
            color: '#1769aa',
            wordBreak: 'break-word',
            whiteSpace: 'break-spaces',
            cursor: 'pointer'
        },
        productContainer: {
            alignItems: 'center',
        },
        productContainerItem: {
            marginTop: '00px',
        },
        productInfo: {
            display: 'flex',
            flexDirection: 'column'
        },
        productMeta: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
                alignItems: 'flex-start',
            },
        },
        productContainerItemPrice: {
            marginTop: '0px',
            [theme.breakpoints.down('xs')]: {
                padding: '20px 16px 16px'
            },
        },
        productMetaAmountAndTotal: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
            },
        },
        chip: {
            width: 'fit-content',
            padding: ' 0 5px',
        },
        productMetaPrice: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            [theme.breakpoints.down('xs')]: {
                padding: '0 16px'
            },
        },
        productContainerMeta: {
            marginTop: 10,
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        productMetaAmount: {
            padding: '8px 0',

            [theme.breakpoints.down('xs')]: {
                width: '100%',
                padding: '16px 0',
                borderTop: '1px solid #ebebeb',
                display: 'flex',
                justifyContent: 'center'
            },
        },
        productMetaAmountForm: {
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '123px',
            },
        },
        productMetaAmountContainer: {
            [theme.breakpoints.up('sm')]: {
                display: 'flex',
                justifyContent: 'flex-end'
            },
        },
        productMetaSummary: {
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                padding: '16px 0 0',
                borderTop: '1px solid #ebebeb',
                display: 'flex',
                justifyContent: 'center'
            },
        },
        productContainerTotal: {
            textAlign: 'right',
        },
        productContainerSummary: {
            textAlign: 'right',
            [theme.breakpoints.down('xs')]: {
                textAlign: 'left',
                justifyContent: 'space-between',
                display: 'flex',
                width: '100%',
                padding: '0 16px 0'
            },
        },
        amountButton: {
            width: 0,
        },
        amount: {
            '& input.MuiOutlinedInput-input': {
                textAlign: 'center'
            }
        },
        inputPrice: {
            marginLeft: theme.spacing(3),
            [theme.breakpoints.down('xs')]: {
                marginLeft: 0
            },
        },
        cityAutocomplete: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            paddingRight: theme.spacing(2),
            [theme.breakpoints.down('xs')]: {
                paddingRight: 0
            },
        },
        warehouseAutocomplete: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            paddingLeft: theme.spacing(2),
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 0
            },
        },
        popper: {
            backgroundColor: '#000',
        },
        rootGrid: {
            marginTop: theme.spacing(3)
        },
        textCreateCustomer: {
            paddingBottom: 5,
            textAlign: 'center'
        },
        gridText: {
            marginBottom: theme.spacing(1)
        },
        gridCustomers: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            [theme.breakpoints.down('xs')]: {
                marginBottom: theme.spacing(1),
                paddingLeft: theme.spacing(4)
            },
        },
        gridButton: {
            marginTop: theme.spacing(3),
            paddingRight: theme.spacing(3),
            [theme.breakpoints.down('sm')]: {
                paddingRight: 0,
            }
        },
        gridShipping: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        },
        shippingText: {
            marginBottom: theme.spacing(1)
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'auto',
            height: '100%',
            [theme.breakpoints.down('xs')]: {
                alignItems: 'baseline',
                justifyContent: 'baseline',
            }
        },
        gridModal: {
            display: 'flex',
            backgroundColor: '#fff',
            justifyContent: 'flex-end'
        },
        select: {
            marginLeft: theme.spacing(2),
            [theme.breakpoints.down('xs')]: {
                marginLeft: 0
            }
        },
        buttonClose: {
            position: 'absolute',
            marginTop: theme.spacing(1)
        },
        fadeLoading: {
            alignItems: 'center'
        },
        gridStatus: {
            margin: '16px 0 10px 0px'
        },
        margin: {
            width: 80,
        },
        editProduct: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        underline: {
            color: '#FFF' ,
            '&::after': {
                border: '1px solid white'
            }
        }
    }
));

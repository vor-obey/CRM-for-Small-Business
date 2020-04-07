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
            [theme.breakpoints.down('xs')]:
                {
                    paddingRight: 0
                }
            ,
        },
        warehouseAutocomplete: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            paddingLeft: theme.spacing(2),
            [theme.breakpoints.down('xs')]:
                {
                    paddingLeft: 0
                },
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
            [theme.breakpoints.down('xs')]:
                {
                    marginBottom: theme.spacing(1),
                    paddingLeft: theme.spacing(4)
                },
        },
        gridButton: {
            marginTop: theme.spacing(3),
            paddingRight: theme.spacing(3),
            [theme.breakpoints.down('sm')]:
                {
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
    }
));

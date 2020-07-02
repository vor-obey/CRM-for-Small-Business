export const orderDetailsStyles = ((theme) => ({
    root: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(5)
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
        width: '100%',
        marginTop: 15,
        display: 'flex',
        marginBottom: 15,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productList: {
        flexDirection: 'row',
        alignItems: 'stretch',
        alignContent: 'center',
    },
    productTitle: {
        flexDirection: 'column',
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 5,
        },
    },
    productTitleName: {
        color: '#1769aa',
        wordBreak: 'break-word'
    },
    productName: {
        color: '#1769aa',
        cursor: 'pointer',
        alignSelf: 'left',
        wordBreak: 'break-word',
        marginRight: 20,
        [theme.breakpoints.down('xs')]: {
            margin: '15px 0'
        },
    },
    productAmount: {
        textAlign: 'center'
    },
    productIcon: {
        cursor: 'pointer',
        textAlign: 'center',
        alignSelf: 'center'
    },
    productTotalPrice: {
        padding: '10px 15px 0px',
    },
    productSummary: {
        textAlign: 'right',
    },
    productContainer: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5
    },
    containerItem: {
        marginTop: '30px',
        wordWrap: 'break-word',
        alignItems: 'flex-start',
        alignContent: 'flex-start'
    },
    containerFieldsItem: {
        marginTop: '15px'
    },

    orderCurrency: {
        paddingLeft: theme.spacing(1),
        [theme.breakpoints.down('lg')]: {
            paddingLeft: 0
        }
    },
    customerGrid: {
        marginBottom: theme.spacing(9),
        [theme.breakpoints.down('xs')]: {
            marginBottom: 0,
        }
    },
    wrapper: {
        paddingRight: theme.spacing(2)
    },
    inputManager: {
        paddingRight: theme.spacing(2),
    },
    managerGrid: {
        marginTop: theme.spacing(2)
    },
    productInfo: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left'
    },
    productMeta: {
        padding: '10px 0 5px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingTop: 10,
            paddingRight: 16,
            paddingLeft: 16,
            paddingBottom: 10,
            minHeight: 95,
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('lg')]: {
            margin: '0 15px 0 15px'
        },
        [theme.breakpoints.down('xs')]: {
            overflow: 'auto',
            height: '100%',
            alignItems: 'baseline',
            justifyContent: 'baseline',
        }
    },
    gridModal: {
        display: 'flex',
        backgroundColor: '#fff',
        position: 'relative',
    },
    children: {
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(4),
            marginLeft: theme.spacing(1)
        }
    },
    selectStatusDisabled: {
        backgroundColor: '#fff'
    },
    selectStatusFilled: {
        backgroundColor: '#fff',
        textAlign: 'center',
    },
    editButton: {
        color: 'rgba(0, 0, 0, 0.54)'
    },
    buttonClose: {
        position: 'absolute',
        marginTop: theme.spacing(1),
        right: 0
    },
    buttonContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: '20px'
    },
    button: {
        margin: '10px',
    },
    orderNum: {
        marginTop: 2,
        fontSize: 20,
        [theme.breakpoints.down('lg')]: {
            marginTop: 4,
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 17,
            marginTop: 0,
        }
    },
    orderDetails: {
        marginTop: 2,
        fontSize: 20,
        paddingRight: 10,
        [theme.breakpoints.down('lg')]: {
            marginTop: 4,
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 17,
            marginTop: 0,
        }
    }
}));

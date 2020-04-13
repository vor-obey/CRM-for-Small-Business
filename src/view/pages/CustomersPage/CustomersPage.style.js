export const customersPageStyle = (theme => ({
    root: {
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(3)
        }
    },
    title: {
        textAlign: 'center',
    },
    button: {
        margin: theme.spacing(3, 2, 2),
        alignItems: 'center',
    },
    addCustomer: {
        margin: theme.spacing(0, 1, 0, 0)
    },
    searchBox: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'block'
        }
    },
    textList: {
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            marginRight: theme.spacing(1)
        }
    },
    gridCustomerContainer: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    gridList: {
        display: 'flex',
        alignItems: 'center',
        overflowWrap: 'break-word'
    },
    form: {
        width: '100%',
    },
}));

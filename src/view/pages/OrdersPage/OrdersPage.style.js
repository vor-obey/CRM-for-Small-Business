export const ordersPageStyles = ((theme) => ({
    root: {
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(3)
        }
    },
    statusGrid: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        overflowWrap: 'break-word'
    },
    customerGrid: {
        overflowWrap: 'break-word'
    },
    orderGrid: {
        overflowWrap: 'break-word'
    },
    textStatus: {
        textAlign: 'center',
    },
}));

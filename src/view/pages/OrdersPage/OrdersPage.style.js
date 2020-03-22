export const ordersPageStyles = ((theme) => ({
    root: {
        marginTop: 80
    },
    statusGrid: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    },
    customerGrid: {
        overflowWrap: 'break-word'
    },
    orderGrid: {
        overflowWrap: 'break-word'
    },
    textStatus: {
        textAlign: 'center',
        overflowWrap: 'break-word'
    },
    searchBox: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    selector: {
        width: 205,
        [theme.breakpoints.down('xs')]: {
            width: 200
        }
    },
}));

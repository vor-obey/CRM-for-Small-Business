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
        textAlign: 'center'
    },
    searchBox: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
        }
    },
    search: {
        width: '300px',
    },
    selector: {
        width: '200px',
        paddingTop: '2px',
    },
}));

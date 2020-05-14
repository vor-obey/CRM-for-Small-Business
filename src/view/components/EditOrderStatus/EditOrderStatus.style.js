export const editOrderStatusStyles = ((theme) => ({
    orderItem: {
        marginTop: theme.spacing(1),
    },
    orderCurrency: {
        paddingLeft: theme.spacing(1),
        [theme.breakpoints.down('lg')]: {
            paddingLeft: 0
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
}));

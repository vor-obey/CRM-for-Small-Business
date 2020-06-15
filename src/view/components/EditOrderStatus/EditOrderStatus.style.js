export const editOrderStatusStyles = ((theme) => ({
    orderItem: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '@media (max-width: 365px)': {
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
    },
    orderCurrency: {
        paddingLeft: theme.spacing(1),
        [theme.breakpoints.down('lg')]: {
            paddingLeft: 0
        }
    },
    selectStatus: {
        paddingTop: 0,
        '&:focus': {
            backgroundColor: '#fff',
        },
    },

    selectStatusDisabled: {
        backgroundColor: '#fff'
    },
    selectStatusFilled: {
        backgroundColor: '#fff',
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

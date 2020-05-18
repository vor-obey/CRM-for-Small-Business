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
    currentStatus: {
        width: 'fit-content',
    },
    statusForm: {
        order: 2,
        '@media (max-width: 365px)': {
            order: 1,
            margin: '0 22px',
        },
        '@media (min-width: 350px) and (max-width:365px)': {
            margin: '0 25px',
        },
    },
    actionButton: {
        order: 3,
        '@media (max-width: 365px)': {
            order: 3
        },
    },
    actionButtonPanel: {
        order: 3,
        '@media (max-width: 365px)': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            order: 3
        },
    },
    actionADD: {
        order: 1,
        '@media (max-width: 365px)': {
            order: 2
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

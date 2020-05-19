export const novaPoshtaAddressStyles = (theme => ({
    city: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            paddingRight: 0
        },
    },
    warehouse: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 0
        },
    },
    popper: {
        marginBottom: '10px',
        borderTop: '1px solid #ECECEC',
    },
}));

export const customerOrderListStyle = ((theme) => ({
    root: {
        marginTop: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(3)
        }
    },
    gridOrderContainer: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
        textAlign: 'center',
    },

}))
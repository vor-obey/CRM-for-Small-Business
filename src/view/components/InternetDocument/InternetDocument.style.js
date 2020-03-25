export const internetDocumentStyles = (theme => ({
    root: {
        padding: theme.spacing(5)
    },
    cityAutocomplete: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.down('xs')]:
            {
                paddingRight: 0
            }
        ,
    },
    warehouseAutocomplete: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        [theme.breakpoints.down('xs')]:
            {
                paddingLeft: 0
            },
    },
}));
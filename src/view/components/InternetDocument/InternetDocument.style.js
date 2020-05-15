export const internetDocumentStyles = (theme => ({
    root: {
        padding: theme.spacing(5),
        [theme.breakpoints.down('xs')]: {
            padding: 0
        }
    },
    cityAutocomplete: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.down('xs')]:
            {
                paddingRight: 0,
                marginTop: 0,
                marginBottom: 0
            }
        ,
    },
    warehouseAutocomplete: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        [theme.breakpoints.down('xs')]:
            {
                paddingLeft: 0,
                marginTop: 0
            },
    },
    title: {
        textAlign: 'center',
        padding: '10px 0',
        [theme.breakpoints.down('xs')]:
            {
                textAlign: 'left',
            },
    }
}));

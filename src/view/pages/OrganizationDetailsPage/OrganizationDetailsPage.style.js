export const OrganizationDetailsStyle = (theme => ({
    root: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    organizationItem: {
        wordWrap: 'break-word',
        margin: theme.spacing(0, 0, 2, 0),
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    organizationGrid: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '100%',
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
    title: {
        marginTop: theme.spacing(3),
        textAlign: 'center',
    },
    buttonContainer: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonFab: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.primary.main,
    },
    button: {
        margin: theme.spacing(3),
    },
    organizationInfo: {
        wordWrap: 'break-word',
    },
    organizationTypography: {
        wordBreak: 'break-word',
        [theme.breakpoints.down('xs')]: {
            marginTop: 3
        },
    },
    organizationDetail: {
        display: 'grid',
        justifyContent: 'space-evenly',
    },
    integrationsList: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    }
}));

export const customerOrderListStyle = ((theme) => ({
    root: {
        marginTop: theme.spacing(1),
        marginButton: theme.spacing(1),
    },
    gridOrderContainer: {
        '@media (max-width: 1150px)': {
            display: 'none'
        },
    },
    gridList: {
        display: 'flex',
        alignItems: 'center',
        overflowWrap: 'break-word',
        whiteSpace: 'break-spaces',
        '@media (max-width: 1150px)': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            overflowWrap: 'break-word',
        },
    },
    flexContainer: {
        '@media (max-width: 1150px)': {
            flexDirection: 'column',
        },
    },
    textList: {
        display: 'block',
        marginRight: theme.spacing(1)
    },
    hide: {
        display: 'none',
    }
}))
export const createAbstractProductPageStyles = (theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        height: '100%',
        [theme.breakpoints.down('xs')]: {
            alignItems: 'baseline',
            justifyContent: 'baseline',
        }
    },
    gridModal: {
        display: 'flex',
        backgroundColor: '#fff',
        justifyContent: 'flex-end'
    },
    buttonClose: {
        position: 'absolute',
        marginTop: theme.spacing(1)
    },
}));
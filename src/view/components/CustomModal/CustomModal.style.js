export const customModalStyle = (theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        height: '100%',
    },
    container: {
        display: 'flex',
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('xs')]: {
            position: 'absolute',
            top: 0,
        },
    },
    closeButton: {
        border: '2px solid #000000ab',
        borderRadius: '50%',
        backgroundColor: '#fff',
        height: '25px',
        width: '26px',
    },
}));

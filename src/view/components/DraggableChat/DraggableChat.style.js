export const draggableChatStyles = (theme => ({
    card: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        zIndex: 1,
        border: '1px solid grey',
        background: 'white'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}));
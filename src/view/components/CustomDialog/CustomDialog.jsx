import React, {useMemo} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Slide
} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((() => ({
    title: {
        textAlign: 'center'
    },
    text: {
        textAlign: 'justify'
    },
    buttons: {
        justifyContent: 'space-between'
    }
})));

export function CustomDialog({
                                 isShow,
                                 title,
                                 children,
                                 exit,
                                 closeText = "Disagree",
                                 actionText = "Agree",
                                 onClose,
                                 onAction,
                             }) {
    const classes = useStyles();
    const renderActionButton = useMemo(() => {
        if (typeof onAction === "undefined") {
            return null;
        }

        return (
            <Button onClick={onAction} href={exit} color="primary">
                {actionText}
            </Button>
        );
    }, [onAction, actionText, exit]);

    return (
        <Dialog
            open={isShow}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title" className={classes.title}>{title}</DialogTitle>
            <DialogContent className={classes.text}>
                <DialogContentText id="alert-dialog-slide-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.buttons}>
                <Button onClick={onClose} color="primary">
                    {closeText}
                </Button>
                {renderActionButton}
            </DialogActions>
        </Dialog>
    );
}

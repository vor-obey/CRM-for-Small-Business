import React, { useMemo } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Slide
} from '@material-ui/core';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function CustomDialog({
                                 isShow,
                                 title,
                                 children,
                                 closeText = "Disagree",
                                 actionText = "Agree",
                                 onClose,
                                 onAction,
                             }){
    const renderActionButton = useMemo(() => {
        if (typeof onAction === "undefined") {
            return null;
        }

        return (
            <Button onClick={onAction} color="primary">
                {actionText}
            </Button>
        );
    }, [onAction, actionText]);

    return (
        <Dialog
            open={isShow}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {closeText}
                </Button>
                {renderActionButton}
            </DialogActions>
        </Dialog>
    );
}

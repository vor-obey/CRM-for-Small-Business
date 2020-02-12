import React from 'react';
import {Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const AlertSnackbar = (props) => {

    const {isOpen, errorMessage, onClose} = props;

    return (
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            open={isOpen}
            autoHideDuration={4000}
            onClose={onClose}
        >
            <Alert severity="error" onClose={onClose}>
                {errorMessage}
            </Alert>
        </Snackbar>
    );
};

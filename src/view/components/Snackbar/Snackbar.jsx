import React from 'react';
import {Snackbar, useMediaQuery, useTheme} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const AlertSnackbar = (props) => {
    const theme = useTheme();
    const breakpointOnSm = useMediaQuery(theme.breakpoints.down('sm'));
    const {isOpen, message, onClose, success} = props;

    return (
        <Snackbar
            anchorOrigin={{
                vertical: breakpointOnSm ? 'top' : 'bottom',
                horizontal: breakpointOnSm ? 'center' : 'right'
            }}
            open={isOpen}
            autoHideDuration={4000}
            onClose={onClose}
        >
            <Alert severity={success ? "success" : "error"} onClose={onClose}>
                {message}
            </Alert>
        </Snackbar>
    );
};

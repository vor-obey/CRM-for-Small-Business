import React from 'react';
import {Snackbar, useMediaQuery, useTheme} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const AlertSnackbar = (props) => {
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.up('sm'));
    const {isOpen, errorMessage, onClose} = props;

    return (
        <Snackbar
            anchorOrigin={{vertical: (!breakpoint && 'top') || 'bottom', horizontal: (!breakpoint && 'center' ) || 'right'}}
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

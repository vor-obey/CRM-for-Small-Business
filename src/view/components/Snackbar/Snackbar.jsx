import React from 'react';
import {Snackbar, useMediaQuery, useTheme} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const AlertSnackbar = ({
                                  isOpen,
                                  message,
                                  onClose,
                                  success
                              }) => {
    const theme = useTheme();
    const minWidth600 = useMediaQuery('(min-width:600px)');
    const breakpointOnSm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Snackbar
            anchorOrigin={{
                vertical: breakpointOnSm ? 'top' : 'bottom',
                horizontal: breakpointOnSm ? 'center' : 'right'
            }}
            open={isOpen}
            autoHideDuration={minWidth600 ? 10000 : 3000}
            onClose={onClose}
        >
            <Alert severity={success ? "success" : "error"} onClose={onClose}>
                {message}
            </Alert>
        </Snackbar>
    );
};

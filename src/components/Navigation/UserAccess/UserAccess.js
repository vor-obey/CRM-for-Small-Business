import React from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import { Box, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


export default function UserAccess() {

    return (
        <Box display="flex"
            justifyContent="flex-end">
            <IconButton
               component={ Link }
               to="/admin"
            >
                <AccountCircleIcon />
            </IconButton>
        </Box>
    );
}

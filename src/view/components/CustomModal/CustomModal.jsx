import React from 'react';

import {Button, Grid, Modal} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export const CustomModal = ({
                                open,
                                classes,
                                children,
                                handleClose,
                                breakpoints,
                            }) => {

    const {xl, lg, sm, md, xs} = breakpoints;

    return (
        <Modal
            className={classes.modal}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Grid item xl={xl} lg={lg} sm={sm} md={md} xs={xs} className={classes.gridModal}>
                <Button onClick={handleClose} className={classes.buttonClose}>
                    <CloseIcon/>
                </Button>
                {children}
            </Grid>
        </Modal>
    );
};

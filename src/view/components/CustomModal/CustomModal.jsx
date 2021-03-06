import React from 'react';

import {Button, Grid, Modal, makeStyles} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {customModalStyle} from "./CustomModal.style";

const useStyles = makeStyles(customModalStyle);

export const CustomModal = ({
                                open,
                                children,
                                handleClose,
                                allowBackDropClick
                            }) => {

    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            className={classes.modal}
            disableBackdropClick={!allowBackDropClick}
        >
            <Grid item className={classes.container}>
                <Button onClick={handleClose} style={{
                    position: 'absolute',
                    marginTop: 8,
                }}>
                    <CloseIcon className={classes.closeButton}/>
                </Button>
                <Grid className={classes.children}>
                    {children}
                </Grid>
            </Grid>
        </Modal>
    );
};

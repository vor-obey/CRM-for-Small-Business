import React from 'react';

import {Button, Grid, Modal} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export const CustomModal = ({
                               open,
                               classes,
                               children,
                               handleClose,
                            }) => {

   return (
         <Modal
            className={classes.modal}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
         >
            <Grid item className={classes.gridModal}>
               <Button onClick={handleClose} className={classes.buttonClose}>
                  <CloseIcon/>
               </Button>
               <Grid className={classes.children}>
                  {children}
               </Grid>
            </Grid>
         </Modal>
   );
};

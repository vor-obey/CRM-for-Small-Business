import React from 'react';

import {Button, Grid, Modal} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export const CustomModal = (props) => {

   const {
      open,
      classes,
      children,
      handleClose
   } = props;

   return (
      <Modal
         className={classes.modal}
         aria-labelledby="transition-modal-title"
         aria-describedby="transition-modal-description"
         open={open}
         onClose={handleClose}
         closeAfterTransition
      >
         <Grid item xl={3} lg={3} sm={6} md={4} xs={9} className={classes.gridModal}>
            <Button onClick={handleClose} className={classes.buttonClose}>
               <CloseIcon/>
            </Button>
            {children}
         </Grid>
      </Modal>
   );
};

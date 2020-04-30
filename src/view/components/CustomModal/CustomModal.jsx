import React from 'react';

import {Button, Grid, Modal} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export const CustomModal = ({
                               open,
                               classes = {},
                               children,
                               handleClose,
                            }) => {

   return (
         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto',
                height: '100%',
            }}
         >
            <Grid item style={{
                display: 'flex',
                backgroundColor: '#fff',
                justifyContent: 'flex-end'
            }}>
               <Button onClick={handleClose} style={{
                   position: 'absolute',
                   marginTop: 8
               }}>
                  <CloseIcon/>
               </Button>
               <Grid className={classes.children}>
                  {children}
               </Grid>
            </Grid>
         </Modal>
   );
};

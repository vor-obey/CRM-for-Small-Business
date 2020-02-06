import React from 'react';
import {useSelector} from "react-redux";
import {
   AppBar,
   Toolbar,
   makeStyles, Snackbar
} from '@material-ui/core';
import Drawer from "../Drawer/Drawer";
import { Profile } from '../../Profile/Profile';
import ProgressBar from '../../ProgressBar/ProgressBar';
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
   root: {
      flexGrow: 1,
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   title: {
      flexGrow: 1,
   },
}));

function Header() {
   const classes = useStyles();
   const loading = useSelector(state => state.userReducer.loading);
   const currentUser = useSelector(state => state.userReducer.currentUser);

   const onClosedHandler = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setErrorMessage('');
      setIsOpen(false);
   };

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar>
               <Drawer/>
            </Toolbar>
            <Profile currentUser={currentUser}/>
         </AppBar>
         <ProgressBar isLoading={loading}/>
         <Snackbar
             anchorOrigin={{vertical: top, }}
             open={isOpen}
             autoHideDuration={6000}
             onClose={onClosedHandler}
         >
            <Alert onClose={onClosedHandler} severity='error'>
               {errorMessage}
            </Alert>
         </Snackbar>
      </div>
   );
}

export default Header;

import React from 'react';
import {useSelector} from "react-redux";
import {
   AppBar,
   Toolbar,
   makeStyles
} from '@material-ui/core';
import Drawer from "../Drawer/Drawer";
import { Profile } from '../../Profile/Profile';
import ProgressBar from '../../ProgressBar/ProgressBar';

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
   const isLoading = useSelector(state => state.auxiliaryReducer.isLoading);
   const currentUser = useSelector(state => state.userReducer.currentUser);

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar>
               <Drawer/>
            </Toolbar>
            <Profile currentUser={currentUser}/>
         </AppBar>
         <ProgressBar isLoading={isLoading}/>
      </div>
   );
}

export default Header;

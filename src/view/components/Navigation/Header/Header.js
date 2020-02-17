import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    AppBar,
    Toolbar,
    makeStyles,
} from '@material-ui/core';
import Drawer from "../Drawer/Drawer";
import {Profile} from '../../Profile/Profile';
import ProgressBar from '../../ProgressBar/ProgressBar';
import {AlertSnackbar} from "../../Snackbar/Snackbar";
import {setSnackBarStatus} from "../../../../data/store/auxiliary/auxiliaryActions";
import {headerStyle} from "./Header.style";

const useStyles = makeStyles(headerStyle);

function Header() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const isLoading = useSelector(state => state.auxiliaryReducer.isLoading);
    const snackBarStatus = useSelector(state => state.auxiliaryReducer.snackBarStatus);
    const currentUser = useSelector(state => state.userReducer.currentUser);


    const onClosedHandler = () => {
        dispatch(setSnackBarStatus({isOpen: false, errorMessage: ''}))
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar} >
                    <Drawer/>
                    <Profile currentUser={currentUser}/>
                </Toolbar>
            </AppBar>
            <ProgressBar isLoading={isLoading}/>
            <AlertSnackbar
                isOpen={snackBarStatus.isOpen}
                errorMessage={snackBarStatus.errorMessage}
                onClose={onClosedHandler}
            />
        </div>
    );
}

export default Header;

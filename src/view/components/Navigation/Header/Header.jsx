import React, {useCallback} from 'react';
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
import {Flags} from "../Flags/Flags";

const useStyles = makeStyles(headerStyle);

export const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const isLoading = useSelector(state => state.auxiliaryReducer.isLoading);
    const {isOpen, message, success} = useSelector(state => state.auxiliaryReducer.snackBarStatus);
    const currentUser = useSelector(state => state.userReducer.currentUser);

    const onClosedHandler = useCallback(() => {
        dispatch(setSnackBarStatus({isOpen: !isOpen, message: message, success: success}))
    }, [dispatch, isOpen, message, success]);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Drawer/>
                    <div className={classes.user}>
                        <Flags classes={classes}/>
                        <Profile currentUser={currentUser}/>
                    </div>
                </Toolbar>
            </AppBar>
            <ProgressBar isLoading={isLoading}/>
            <AlertSnackbar
                isOpen={isOpen}
                message={message}
                success={success}
                onClose={onClosedHandler}
            />
        </div>
    );
};
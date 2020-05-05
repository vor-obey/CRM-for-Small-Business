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
import {NotificationsFunc} from "../../../../utils/notifications";

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
                    {currentUser ? <Drawer/> : <div/>}
                    <div className={classes.user}>
                        <Flags classes={classes}/>
                        {currentUser ? <Profile currentUser={currentUser}/> : <div/>}
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
            {NotificationsFunc()}
        </div>
    );
};

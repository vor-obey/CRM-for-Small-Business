import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    AppBar,
    Toolbar,
    makeStyles,
} from '@material-ui/core';
import {Profile} from '../../Profile/Profile';
import ProgressBar from '../../ProgressBar/ProgressBar';
import {AlertSnackbar} from "../../Snackbar/Snackbar";
import {setSnackBarStatus} from "../../../../data/store/auxiliary/auxiliaryActions";
import {Flags} from "../Flags/Flags";
import {InstagramConnection} from '../../../../utils/instagramConnection';
import isEmpty from 'lodash/isEmpty';

const useStyles = makeStyles((theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {
        padding: 11,
        justifyContent: 'flex-end',
        background: 'linear-gradient(5deg, rgba(63,81,181,1) 45%, rgba(34,171,199,1) 100%)',
    },
    user: {
        display: 'flex',
        flexDirection: 'row',
    },
    flags: {
        '&:before': {
            borderBottom: 'none',
        },
        '&:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
        },
    }
})));

export const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const isLoading = useSelector(state => state.auxiliaryReducer.isLoading);
    const {isOpen, message, success} = useSelector(state => state.auxiliaryReducer.snackBarStatus);
    const {currentUser} = useSelector(state => state.userReducer);

    const isSignedIn = !isEmpty(currentUser);

    const onClosedHandler = useCallback(() => {
        dispatch(setSnackBarStatus({isOpen: !isOpen, message: message, success: success}))
    }, [dispatch, isOpen, message, success]);

    return (
        <>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.user}>
                        <Flags classes={classes}/>
                        {isSignedIn ? <Profile currentUser={currentUser}/> : <div/>}
                    </div>
                </Toolbar>
                <ProgressBar isLoading={isLoading}/>
            </AppBar>
            <AlertSnackbar
                isOpen={isOpen}
                message={message}
                success={success}
                onClose={onClosedHandler}
            />
            {InstagramConnection()}
        </>
    );
};

import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    AppBar,
    Toolbar,
    makeStyles
} from '@material-ui/core';
import Drawer from "../Drawer/Drawer";
import {Profile} from '../../Profile/Profile';
import ProgressBar from '../../ProgressBar/ProgressBar';
import {AlertSnackbar} from "../../Snackbar/Snackbar";
import {setSnackBarStatus} from "../../../../data/store/auxiliary/auxiliaryActions";


// todo move styles to style.js
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
                <Toolbar>
                    <Drawer/>
                </Toolbar>
                <Profile currentUser={currentUser}/>
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

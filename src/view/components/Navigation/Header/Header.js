import React from 'react';
import {useSelector} from "react-redux";
import {
    AppBar,
    Toolbar,
    makeStyles} from '@material-ui/core';
import Drawer from "../Drawer/Drawer";
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
    const loading = useSelector(state => state.userReducer.loading);

    return (
        <div className={classes.root}>
            <AppBar position="static" className='classes.AppBar'>
                <Toolbar>
                    <Drawer />
                </Toolbar>
            </AppBar>
            <ProgressBar isLoading={loading} />

        </div>
    );
}

export default Header;

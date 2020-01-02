import React from 'react';
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

    return (
        <div className={classes.root}>
            <AppBar position="static" className='classes.AppBar'>
                <Toolbar>
                    <Drawer />
                </Toolbar>
            </AppBar>
            <ProgressBar isLoading />

        </div>
    );
}

export default Header;

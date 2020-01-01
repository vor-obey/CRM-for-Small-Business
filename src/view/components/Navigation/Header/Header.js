import React from 'react';
import { 
    AppBar, 
    Toolbar,
    makeStyles } from '@material-ui/core';
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
            {/* <ProgressBar /> */}
            <AppBar position="static" className='slasses.AppBar'>
                <Toolbar>
                    <Drawer />
                </Toolbar>
                
            </AppBar>
            
        </div>
    );
}

export default Header;
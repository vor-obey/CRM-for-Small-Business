import React, { Component } from 'react';
import { 
    LinearProgress,
    withStyles } from '@material-ui/core';
import { progressbarStyle } from './ProgressBar.style';

class ProgressBar extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <LinearProgress />
            </div>
        );
    }
}


export default withStyles(progressbarStyle)(ProgressBar);
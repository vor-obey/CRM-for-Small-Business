import React, { Component } from 'react';
import {
    LinearProgress,
    withStyles } from '@material-ui/core';
import { progressbarStyle } from './ProgressBar.style';

const ColorLinearProgress = withStyles({
    colorPrimary: {
        backgroundColor: '#dc004e',
    },
    barColorPrimary: {
        backgroundColor: '#f19ebb',
    },
})(LinearProgress);

class ProgressBar extends Component {
    render() {
        const { classes, isLoading } = this.props;

        if (isLoading) {
            return (
                <div className={classes.root}>
                    <ColorLinearProgress
                    />
                </div>
            );
        }

        return null;
    }
}


export default withStyles(progressbarStyle)(ProgressBar);

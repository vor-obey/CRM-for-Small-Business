import React from 'react';
import {
    TextField,
    makeStyles
} from '@material-ui/core';
import {filterStyle} from "./Filter.Style";

const useStyles = makeStyles(filterStyle);


export const FilterInput = (props) => {

    const {
        label,
        onChange,
        value,
    } = props;

    const classes = useStyles();

    return (
        <div className={classes.root}>
                <TextField
                    className={classes.form}
                    value={value}
                    label={label}
                    name={"search"}
                    type={'text'}
                    onChange={onChange}
                    fullWidth
                />
        </div>
    );
};
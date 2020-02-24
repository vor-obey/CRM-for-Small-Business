import React from 'react';
import {
    IconButton,
    InputLabel,
    Input,
    InputAdornment,
    FormControl,
    makeStyles
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
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
        <form className={classes.form} >
            <FormControl variant="standard" fullWidth>
                <InputLabel >{label}</InputLabel>
                <Input
                    value={value}
                    name={"search"}
                    type={'text'}
                    onChange={onChange}
                    fullWidth
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                type="submit"
                                className={classes.iconButton}
                                aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </form>
        </div>
    );
};
import React from 'react';
import {
   TextField,
   makeStyles
} from '@material-ui/core';
import {filterStyle} from "./Filter.style";

const useStyles = makeStyles(filterStyle);

export const InputFilter = ({
   label,
   onChange,
   value,
}) => {
   const classes = useStyles();

   return (
      <div className={classes.root}>
         <TextField
            className={classes.form}
            value={value}
            label={label}
            name='search'
            type='text'
            onChange={onChange}
            fullWidth
         />
      </div>
   );
};

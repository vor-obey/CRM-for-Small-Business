import React from 'react';
import {
   TextField,
} from '@material-ui/core';

export const InputFilter = ({
   label,
   onChange,
   value,
   classes,
}) => {

   return (
      <div className={classes.filter}>
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

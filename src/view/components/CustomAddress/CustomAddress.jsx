import React from 'react';
import Grid from '@material-ui/core/Grid';
import {TextField} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

export const CustomAddress = ({
                                  onChangedInput,
                                  address
                              }) => {
    const {t} = useTranslation();
    const value = typeof address === 'object' ? '' : address;
    return (
        <Grid item xl={12} xs={12}>
            <TextField
                required
                fullWidth
                autoFocus
                label={t('ADDRESS')}
                variant="outlined"
                margin="normal"
                name='address'
                onChange={onChangedInput}
                value={value || ''}
            />
        </Grid>
    )
};
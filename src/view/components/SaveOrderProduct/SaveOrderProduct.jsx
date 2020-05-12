import React from 'react';
import {CustomAutocomplete} from '../Autocomplete/Autocomplete';
import {Grid, FormControl, IconButton, InputLabel, OutlinedInput, InputAdornment, Select, MenuItem} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import {useTranslation} from "react-i18next";

const currencies = [
    {
        value: 'UAH',
        label: '₴',
    },
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
];

export const SaveOrderProduct = ({
                                     isOpen,
                                     options,
                                     onClose,
                                     onToggle,
                                     inputLabel,
                                     renderOption,
                                     getOptionLabel,
                                     onSelectHandler,
                                     value,
                                     details,
                                     onChange,
                                     increment,
                                     decrement,
                                     classes
                                 }) => {

    const {t} = useTranslation();

    return (
        <Grid container item xl={12} xs={12} sm={12} className={classes.container}>
            <Grid container item xl={12} xs={12} sm={12} className={classes.containerProduct}>
                <Grid item xs={12} sm={7}>
                    <CustomAutocomplete
                        isOpen={isOpen}
                        options={options}
                        onClose={onClose}
                        onToggle={onToggle}
                        inputLabel={inputLabel}
                        renderOption={renderOption}
                        getOptionLabel={getOptionLabel}
                        onSelectHandler={onSelectHandler}
                        value={value}
                    />
                </Grid>
                <Grid item xs={6} sm={2} className={classes.containerProduct}>
                    <FormControl variant="outlined" fullWidth >
                        <InputLabel>{t('AMOUNT')}</InputLabel>
                        <OutlinedInput
                            className={classes.amount}
                            type='text'
                            label={t('AMOUNT')}
                            name='amount'
                            value={details.amount}
                            onChange={onChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconButton
                                        className={classes.amountButton}
                                        fontSize="small"
                                        onClick={decrement} disabled={details.amount === 1}>
                                        <RemoveIcon/>
                                    </IconButton>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        className={classes.amountButton}
                                        fontSize="small"
                                        onClick={increment}>
                                        <AddIcon/>
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={2} className={classes.containerProductPrice}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>{t('PRICE')}</InputLabel>
                        <OutlinedInput
                            value={details.price}
                            label={t('PRICE')}
                            name='price'
                            type='text'
                            variant='outlined'
                            onChange={onChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Select
                                        className={classes.currency}
                                        value={details.currency}
                                        name='currency'
                                        onChange={onChange}
                                    >
                                        {currencies.map((option) => (
                                            <MenuItem
                                                key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                </Grid>
            </Grid>

        </Grid>
    );
};

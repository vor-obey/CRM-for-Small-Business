import React, {useCallback} from 'react';
import {CustomAutocomplete} from '../Autocomplete/Autocomplete';
import {Grid, FormControl, IconButton, Typography, InputLabel, OutlinedInput, InputAdornment, Button, Select, MenuItem} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {closeModal} from '../../../data/store/auxiliary/auxiliaryActions';
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
                                     totalPrice,
                                     classes
                                 }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const navigateToCreateProduct = useCallback(() => {
        dispatch(closeModal());
        history.push('/create-product');
    }, [dispatch, history]);

    return (
        <Grid container item xs={12} sm={12} className={classes.container}>
            <Grid container item xs={12} sm={12} className={classes.containerProduct}>
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
                <Grid item xs={12} sm={2} className={classes.containerProduct}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Amount</InputLabel>
                        <OutlinedInput
                            className={classes.amount}
                            type='text'
                            label='Amount'
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
                <Grid item xs={12} sm={2} className={classes.containerProduct}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Price</InputLabel>
                        <OutlinedInput
                            value={details.price}
                            label='Price'
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
            <Grid container item xs={12} sm={12} className={classes.containerProductMeta}>
                <Grid item xs={12} sm={6} className={classes.containerProductItem}>
                    <Button
                        variant="outlined" color="primary"
                        onClick={navigateToCreateProduct}>
                        <AddIcon/>
                          Add new product
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.containerProductItem}>
                    <Grid className={classes.containerProductItemTotal}>
                        <Typography variant='subtitle1'>
                            {t('TOTAL_PRICE')}:
                        </Typography>
                        <Typography variant='h6'>
                            {`${totalPrice} ${details.currency}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    );
};
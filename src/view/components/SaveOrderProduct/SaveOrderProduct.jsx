import React, {useCallback} from 'react';
import Grid from '@material-ui/core/Grid';
import {CustomAutocomplete} from '../Autocomplete/Autocomplete';
import {TextField} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {closeModal} from '../../../data/store/auxiliary/auxiliaryActions';
import {useTranslation} from "react-i18next";

const currencies = ['UAH', 'USD', 'EUR'];

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
                                     totalPrice
                                 }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const navigateToCreateProduct = useCallback(() => {
        dispatch(closeModal());
        history.push('/create-product');
    }, [dispatch, history]);
    const {t} = useTranslation();

    return (
        <>
            <Grid item xl={1} lg={1}>
                <IconButton onClick={navigateToCreateProduct}>
                    <AddIcon/>
                </IconButton>
            </Grid>
            <Grid item xl={11} lg={11}>
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
            <Grid item xl={4}>
                <TextField
                    value={details.price}
                    label={t('PRICE')}
                    name='price'
                    type='text'
                    fullWidth
                    variant='outlined'
                    onChange={onChange}
                />
            </Grid>
            <Grid item xl={4}>
                <TextField
                    select
                    fullWidth
                    value={details.currency}
                    SelectProps={{
                        native: true,
                    }}
                    name='currency'
                    variant='outlined'
                    label={t('CURRENCY')}
                    onChange={onChange}
                >
                    {currencies.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </TextField>
            </Grid>
            <Grid item xl={12} lg={12}>
                <IconButton onClick={decrement} disabled={details.amount === 1}>
                    <RemoveIcon/>
                </IconButton>
                <TextField
                    value={details.amount}
                    label={t('AMOUNT')}
                    name='amount'
                    type='number'
                    variant='outlined'
                    onChange={onChange}
                />
                <IconButton onClick={increment}>
                    <AddIcon/>
                </IconButton>
            </Grid>
            <Grid>
                <Typography variant='body1'>
                     {`${t('TOTAL_PRICE')} ${totalPrice} ${details.currency}`}
                </Typography>
            </Grid>
        </>
    );
};

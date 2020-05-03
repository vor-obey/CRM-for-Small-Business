import React, {useCallback, useEffect, useState} from 'react';
import {SaveOrderProduct} from '../SaveOrderProduct/SaveOrderProduct';
import {Container, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import isEmpty from 'lodash/isEmpty';
import {useDispatch} from 'react-redux';
import {closeModal} from '../../../data/store/auxiliary/auxiliaryActions';
import {useTranslation} from "react-i18next";

export const AddOrderProduct = ({
                                    products,
                                    submit
                                }) => {
    const dispatch = useDispatch();
    const [selectedProduct, setSelectedProduct] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [details, setDetails] = useState({
        price: 0,
        currency: 'UAH',
        amount: 1,
    });
    const [totalPrice, setTotalPrice] = useState(0);
    const {t} = useTranslation();

    useEffect(() => {
        setTotalPrice(details.price * details.amount);
    }, [details]);

    const toggleAutocomplete = useCallback(() => {
        setIsOpen(prevState => !prevState);
    }, []);

    const renderProductOptions = useCallback((item) => {
        const {productId, name, price, description} = item;
        return (
            <Grid container alignItems='center'>
                <Grid item xs>
                    <span key={productId}>
                        {name}, {price}
                    </span>
                    <Typography variant='body2' color='textSecondary'>
                        {description}
                    </Typography>
                </Grid>
            </Grid>
        );
    }, []);

    const getProductOptionLabel = useCallback(item => !isEmpty(item) ? item.name : '', [])

    const onProductSelectHandler = useCallback((item) => {
        if (!item) {
            setSelectedProduct({});
            setDetails({
                price: 0,
                currency: 'UAH',
                amount: 1,
            });
        } else {
            setSelectedProduct(item);
            setDetails({
                price: item.price,
                currency: 'UAH',
                amount: 1,
            });
        }
    }, []);

    const onDetailsChangedHandler = useCallback((event) => {
        const {name, value} = event.target;
        setDetails(prevState => ({...prevState, [name]: value}));
    }, []);

    const incrementAmount = useCallback(() => {
        setDetails(prevState => ({...prevState, amount: ++prevState.amount}))
    }, []);

    const decrementAmount = useCallback(() => {
        setDetails(prevState => ({...prevState, amount: --prevState.amount}))
    }, []);

    return (
        <Container maxWidth='md'>
            <Grid container item xl={12} lg={12} style={{paddingTop: 15, paddingBottom: 15}}>
                <SaveOrderProduct
                    isOpen={isOpen}
                    options={products}
                    onClose={toggleAutocomplete}
                    onToggle={toggleAutocomplete}
                    inputLabel={t('SELECT_PRODUCT')}
                    renderOption={renderProductOptions}
                    getOptionLabel={getProductOptionLabel}
                    onSelectHandler={onProductSelectHandler}
                    value={selectedProduct}
                    details={details}
                    onChange={onDetailsChangedHandler}
                    increment={incrementAmount}
                    decrement={decrementAmount}
                    totalPrice={totalPrice}
                />
            </Grid>
            <Grid container item>
                <Button
                    variant='outlined'
                    onClick={() => dispatch(closeModal())}
                >
                    {t('CANCEL')}
                </Button>
                <Button
                    variant='outlined'
                    onClick={() => submit({...selectedProduct, ...details, totalPrice})}
                    disabled={isEmpty(selectedProduct)}
                >
                    {t('ADD')}
                </Button>
            </Grid>
        </Container>

    );
};

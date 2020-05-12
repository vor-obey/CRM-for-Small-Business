import React, {useCallback, useEffect, useState} from 'react';
import {SaveOrderProduct} from '../SaveOrderProduct/SaveOrderProduct';
import {Grid, Container, Typography, Button, makeStyles, useMediaQuery} from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import {addOrderProductStyles} from "./AddOrderProduct.style";
import {useTranslation} from "react-i18next";
import AddIcon from "@material-ui/icons/Add";
import {closeModal} from "../../../data/store/auxiliary/auxiliaryActions";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

const useStyle = makeStyles(addOrderProductStyles);

export const AddOrderProduct = ({
                                    products,
                                    submit
                                }) => {
    const classes = useStyle();
    const [selectedProduct, setSelectedProduct] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [details, setDetails] = useState({
        price: 0,
        currency: 'UAH',
        amount: 1,
    });
    const [totalPrice, setTotalPrice] = useState(0);
    const {t} = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const minWidth600 = useMediaQuery('(min-width:600px)');

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

    const getProductOptionLabel = useCallback(item => !isEmpty(item) ? item.name : '', []);

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

    const navigateToCreateProduct = useCallback(() => {
        dispatch(closeModal());
        history.push('/create-product');
    }, [dispatch, history]);

    return (
        <Container className={classes.containerRoot}>
            <Grid container item xl={12} lg={12}>
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
                    classes={classes}
                />
            </Grid>
            <Grid container item xs={12} className={classes.buttonContainer}>
                <Grid item xl={6} lg={6} md={6} sm={8} xs={12}>
                    <Button
                        fullWidth={!minWidth600}
                        className={classes.buttonFab}
                        variant='outlined'
                        onClick={() => submit({...selectedProduct, ...details, totalPrice}) || onProductSelectHandler()}
                        disabled={isEmpty(selectedProduct)}
                    >
                        {t('ADD_PRODUCT')}
                    </Button>
                    <Button
                        className={classes.buttonFub}
                        fullWidth={!minWidth600}
                        variant="outlined" color="primary"
                        onClick={navigateToCreateProduct}>
                        <AddIcon/>
                        {t('CREATE_PRODUCT')}
                    </Button>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={4} xs={12} className={classes.containerProductItemTotal}>
                    <Typography variant='subtitle1'>
                        {t('SUMMARY')}:
                    </Typography>
                    <Typography variant='h6'>
                        {`${totalPrice} ${details.currency}`}
                    </Typography>
                </Grid>
            </Grid>
        </Container>

    );
};

import React, {useCallback, useEffect, useState} from 'react';
import {SaveOrderProduct} from '../SaveOrderProduct/SaveOrderProduct';
import {
    Grid,
    Container,
    Typography,
    Button,
    makeStyles,
    useMediaQuery,
    FormControl, Divider,
    InputLabel, OutlinedInput
} from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import {addOrderProductStyles} from "./AddOrderProduct.style";
import {useTranslation} from "react-i18next";
import AddIcon from "@material-ui/icons/Add";
import {useHistory} from "react-router-dom";
import {useCart} from "../../../utils/hooks/cartHooks";

const useStyle = makeStyles(addOrderProductStyles);

export const AddOrderProduct = ({
                                    selectedProducts,
                                    orderedProducts,
                                    products,
                                    submit,
                                    orderDescription,
                                    onOrderDescriptionChangeHandler
                                    isEdit,
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
    const minWidth600 = useMediaQuery('(min-width:600px)');
    const cart = useCart();

    useEffect(() => {
        if (history.location.state !== undefined && history.location.state.productDetails) {
            const product = history.location.state.productDetails
            setSelectedProduct(product);
            setDetails(prevState => {
                return {
                    ...prevState,
                    price: product.price
                };
            });
        }
    }, [history]);

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
            if (!isEmpty(cart.products)) {
                const currency = cart.products.map((currency) => {
                    return currency.currency
                });
                setSelectedProduct(item);
                setDetails({
                    price: item.price,
                    currency: currency[0],
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
        }
    }, [cart]);

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
        history.push('/create-product', {
            createOrder: true
        });
    }, [history]);

    const handleClick = useCallback(() => {
        submit({...selectedProduct, ...details, totalPrice});
        onProductSelectHandler()
    }, [submit, details, onProductSelectHandler, selectedProduct, totalPrice]);

    const notEditCb = useCallback((item) => {
        return !!selectedProducts.find(({productId}) => productId === item.productId) === false;
    }, [selectedProducts]);

    const editCb = useCallback((item) => {
        return !!orderedProducts.find((orderedProduct) => {
            if (orderedProduct.productId === item.productId) {
                return orderedProduct.action !== 'remove';
            } else {
                return false;
            }
        }) === false;
    }, [orderedProducts]);

    const filterOptions = useCallback((array, {inputValue}) => {
        if (!array.length) {
            return [];
        }
        const matchWhitespacesRegExp = /\s/g;
        const formattedInputValue = inputValue.toLowerCase().replace(matchWhitespacesRegExp, '');
        const filteredArr = array.filter((item) => {
            return isEdit ? editCb(item) : notEditCb(item);
        });
        return filteredArr.filter((item) => {
            return item.name.toLowerCase().replace(matchWhitespacesRegExp, '').indexOf(formattedInputValue) !== -1;
        })

    }, [isEdit, editCb, notEditCb]);

    return (
        <Container className={classes.containerRoot}>
            <Grid container item xs={12} sm={12}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>{t('DESCRIPTION')}</InputLabel>
                    <OutlinedInput
                        label={t('DESCRIPTION')}
                        name='price'
                        type='text'
                        variant='outlined'
                        labelWidth={70}
                        value={orderDescription}
                        onChange={onOrderDescriptionChangeHandler}
                    />
                </FormControl>
                <Divider/>
            </Grid>
            <Grid container item xl={12} lg={12}>
                <fieldset className={classes.fieldset}>
                    <legend className={classes.legend}>
                        {t('ADD_PRODUCT')}
                    </legend>
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
                        filterOptions={filterOptions}
                    />
                </fieldset>
            </Grid>
            <Grid container item xs={12} className={classes.buttonContainer}>
                <Grid item xl={6} lg={6} md={6} sm={8} xs={12}>
                    <Button
                        fullWidth={!minWidth600}
                        className={classes.buttonFab}
                        variant='outlined'
                        onClick={handleClick}
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

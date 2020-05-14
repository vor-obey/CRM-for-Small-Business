import React, {useCallback, useEffect, useState} from "react";
import {
    Grid,
    Button,
    Typography,
    Divider,
    ListItem,
    IconButton,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    FormControl
} from "@material-ui/core";
import {closeModal, renderModal} from '../../../../data/store/auxiliary/auxiliaryActions';
import {useDispatch} from 'react-redux';
import {AddOrderProduct} from '../../AddOrderProduct/AddOrderProduct';
import {useProducts} from '../../../../utils/hooks/productHooks';
import isEmpty from 'lodash/isEmpty';
import CloseIcon from "@material-ui/icons/Close";
import RemoveIcon from '@material-ui/icons/Remove';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import AddIcon from '@material-ui/icons/Add';
import {useTranslation} from "react-i18next";
import {useCart, useEditCart} from "../../../../utils/hooks/cartHooks";

export const ProductForm = ({
                                getProducts,
                                orderedProducts,
                                classes,
                                isEdit,
                                history
                            }) => {
    const dispatch = useDispatch();
    const [products] = useProducts();
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const cart = useCart();
    const cartUtils = useEditCart();
    const {t} = useTranslation();

    useEffect(() => {
        if (!isEdit) {
            getProducts(cart.products);
        }
    }, [isEdit, cart.products, orderedProducts, getProducts]);

    const addProduct = useCallback((product) => {
        if (isEdit) {
            orderedProducts.push(product);
        } else {
            cartUtils.addProduct(product);
        }
        dispatch(closeModal());
    }, [dispatch, orderedProducts, isEdit, cartUtils]);

    const openAddOrderProductModal = useCallback(() => {
        dispatch(renderModal({
            isOpen: true,
            classes: {},
            children: (
                <AddOrderProduct
                    products={products.filter((product) => (
                        !cart.products.find(({productId}) => productId === product.productId)
                    ))}
                    submit={addProduct}
                />
            ),
            onCloseHandler: () => dispatch(closeModal()),
        }));
        forceUpdate()
    }, [dispatch, forceUpdate, products, addProduct, cart.products]);

    const validateAmount = useCallback((value) => {
        const regexp = /^((?!(0))\d+$)/;
        return regexp.test(value);
    }, []);

    const onAmountChange = useCallback((value, productId) => {
        if (validateAmount(value)) {
            const newArr = [...cart.products];
            const ind = newArr.findIndex(item => item.productId === productId);
            const price = newArr[ind].price;
            newArr[ind].amount = validateAmount(value) ? value : newArr[ind].amount;
            newArr[ind].totalPrice = price * parseInt(value);
            if (isEdit) {
                getProducts(newArr);
            }
        }
    }, [cart.products, validateAmount, getProducts, isEdit]);

    const decrement = useCallback((product) => {
        if (isEdit) {
            product.totalPrice = product.price * --product.amount;
            forceUpdate();
        } else {
            product.totalPrice = product.price * --product.amount;
            cartUtils.editProduct(product);
        }
    }, [isEdit, forceUpdate, cartUtils]);

    const increment = useCallback((product) => {
        if (isEdit) {
            product.totalPrice = product.price * ++product.amount;
            forceUpdate();
        } else {
            product.totalPrice = product.price * ++product.amount;
            cartUtils.editProduct(product);
        }
    }, [forceUpdate, isEdit, cartUtils]);

    const calculateTotalPoints = useCallback(() => {
        if (isEdit) {
            return `${orderedProducts.reduce((a, b) => a + b.totalPrice, 0)} ${orderedProducts[0] && orderedProducts[0].currency}`;
        }
        return `${cart.products.reduce((a, b) => a + b.totalPrice, 0)} ${cart.products[0].currency}`;
    }, [cart.products, isEdit, orderedProducts]);

    const removeProduct = useCallback((product) => {
        if (isEdit) {
            const index = orderedProducts.findIndex(item => item.productId === product.productId);
            orderedProducts.splice(index, 1);
        } else {
            cartUtils.deleteProduct(product);
        }
    }, [orderedProducts, isEdit, cartUtils]);

    const renderSelectedProducts = useCallback(() => {
        if (isEmpty(orderedProducts) && isEmpty(cart.products)) {
            return null;
        }

        return (orderedProducts || cart.products).map((item) => {
            const {productId, name, price, amount, totalPrice, currency} = item;
            return (
                <ListItem key={productId}
                          className={classes.productList}>
                    <Grid container item xs={12} sm={12} className={classes.productContainer}>
                        <Grid item xs={12} sm={1} className={classes.productContainerItem}>
                            <Grid className={classes.removeProduct}>
                                <IconButton disabled={isEdit} onClick={() => removeProduct(item)} size='medium'>
                                    <CloseIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={6} className={classes.productContainerItem}>
                            <Grid className={classes.productTitle}>
                                <Typography variant='body1' className={classes.productTitleName}
                                            onClick={() => history.push(`/products/${productId}`)}>
                                    {name}
                                </Typography>
                                <Typography variant='body1'>
                                    {price} {currency}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={2} className={classes.productContainerItem}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>{t('AMOUNT')}</InputLabel>
                                <OutlinedInput
                                    className={classes.amount}
                                    type='text'
                                    label={t('AMOUNT')}
                                    name='amount'
                                    value={amount}
                                    onChange={(event) => onAmountChange(event.target.value, productId)}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconButton
                                                className={classes.amountButton}
                                                fontSize="small"
                                                onClick={() => decrement(item)} disabled={amount === 1}>
                                                <RemoveIcon/>
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                className={classes.amountButton}
                                                fontSize="small"
                                                onClick={() => increment(item)}>
                                                <AddIcon/>
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2} className={classes.productContainerItem}>
                            <Grid className={classes.productContainerTotal}>
                                <Typography variant='subtitle1'>
                                    {t('SUMMARY')}:
                                </Typography>
                                <Typography variant='h6'>
                                    {totalPrice} {currency}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </ListItem>
            );
        })
    }, [t, history, classes, cart.products, onAmountChange, decrement, increment, removeProduct, orderedProducts]);

    const handleResetCart = useCallback(() => {
        cart.setProducts([])
    }, [cart]);

    return (
        <>
            <Grid item xs={12} sm={12} style={{display: 'flex'}}>
                <Typography variant='h6'>
                    {t('CART')}
                </Typography>
                {!isEdit ? <Button onClick={handleResetCart}>
                    <RotateLeftIcon/>
                </Button> : null}
                <Divider/>
            </Grid>
            <Grid container item xs={12} sm={12}>
                {renderSelectedProducts()}
                <Grid className={classes.productContainerMeta}>
                    <Grid item xs={12} sm={6}>
                        <Button variant='outlined'
                                disabled={isEdit}
                                onClick={() => openAddOrderProductModal()}
                        >
                            {t('ADD_PRODUCT')}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.productContainerTotal}>
                        {!isEmpty(cart.products) ? (
                            <>
                                <Typography variant='subtitle1'>
                                    {t('TOTAL')}:
                                </Typography>
                                <Typography variant='h6'>
                                    {calculateTotalPoints()}
                                </Typography>
                            </>
                        ) : null}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

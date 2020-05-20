import React, {useCallback, useEffect, useState} from "react";
import {
    Grid,
    Typography,
    Divider,
    ListItem,
    IconButton,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    FormControl,
    Chip
} from "@material-ui/core";
import {AddOrderProduct} from '../../AddOrderProduct/AddOrderProduct';
import {useProducts} from '../../../../utils/hooks/productHooks';
import isEmpty from 'lodash/isEmpty';
import CloseIcon from "@material-ui/icons/Close";
import RemoveIcon from '@material-ui/icons/Remove';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import AddIcon from '@material-ui/icons/Add';
import {useTranslation} from "react-i18next";
import {useCart, useEditCart} from "../../../../utils/hooks/cartHooks";
import Button from '@material-ui/core/Button';

export const ProductForm = ({
                                getProducts,
                                orderedProducts,
                                classes,
                                isEdit,
                                history
                            }) => {
    const [products] = useProducts();
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const cartUtils = useEditCart();
    const {t} = useTranslation();
    const cart = useCart(products);

    useEffect(() => {
        if (!isEdit) {
            getProducts(cart.products);
        }
    }, [isEdit, cart.products, orderedProducts, getProducts]);

    const addProduct = useCallback((product) => {
        if (isEdit) {
            orderedProducts.push(product);
            forceUpdate();
        } else {
            cartUtils.addProduct(product);
        }
    }, [orderedProducts, isEdit, cartUtils, forceUpdate]);

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
            forceUpdate();
        } else {
            cartUtils.deleteProduct(product);
        }
    }, [orderedProducts, isEdit, cartUtils, forceUpdate]);

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
                        <Grid item xs={2} sm={1} className={classes.productContainerItem}>
                            <Grid  className={classes.removeProduct}>
                                <IconButton disabled={isEmpty(orderedProducts) ? null : orderedProducts.length === 1} onClick={() => removeProduct(item)} size='medium'>
                                    <CloseIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={11} className={classes.productInfo}>
                            <Grid container item xs={12} sm={12} className={classes.productContainerItem}>
                                <Grid className={classes.productTitle}>
                                    <Typography variant='body1'
                                                className={classes.productTitleName}
                                                onClick={() => history.push(`/products/${productId}`)}
                                    >
                                        {name}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.productMeta}>
                                <Grid item xs={12} sm={4} className={classes.productContainerItemPrice}>
                                    <Chip classes={{
                                        label: classes.productMetaPrice
                                    }} className={classes.chip} size="medium" color="primary" label={
                                        <React.Fragment>
                                            <Typography variant='body1' style={{lineHeight: 1.2}}>
                                                {price}
                                            </Typography>
                                            <Typography variant='body2' style={{lineHeight: 1.3}}>
                                                &nbsp; {currency}
                                            </Typography>
                                        </React.Fragment>}/>
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.productMetaAmountAndTotal}>
                                    <Grid item xs={12} sm={6} className={classes.productMetaAmount}>
                                        <Grid item xs={6} sm={12} className={classes.productMetaAmountContainer}>
                                            <FormControl variant="outlined" fullWidth className={classes.productMetaAmountForm}>
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
                                                                onClick={() => decrement(item)}
                                                                disabled={amount === 1}>
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
                                    </Grid>
                                    <Grid item xs={12} sm={6} className={classes.productMetaAmountAndTotal}>
                                        <Grid item xs={12} sm={12} className={classes.productMetaSummary}>
                                            <Grid className={classes.productContainerSummary}>
                                                <Typography variant='subtitle1'>
                                                    {t('SUMMARY')}:
                                                </Typography>
                                                <Typography variant='body1'>
                                                    {totalPrice} {currency}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
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
                <AddOrderProduct
                    products={products}
                    selectedProducts={cart.products}
                    submit={addProduct}
                    isEdit={isEdit}
                    orderedProducts={orderedProducts}
                />
                {renderSelectedProducts()}
                <Grid item xs={12} sm={12} className={classes.productContainerTotal}>
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
        </>
    );
};

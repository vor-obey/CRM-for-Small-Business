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
    InputBase,
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
import {closeDialog, renderDialog} from "../../../../data/store/auxiliary/auxiliaryActions";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";

import {useDispatch} from "react-redux";

export const ProductForm = ({
                                getProducts,
                                orderedProducts,
                                classes,
                                isEdit,
                                history
                            }) => {
    const [products] = useProducts();
    const dispatch = useDispatch();
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const cartUtils = useEditCart();
    const {t} = useTranslation();
    const cart = useCart(products);

    const [edit, setEdit] = useState({
        id: '',
        priceValue: ''
    });

    useEffect(() => {
        if (!isEdit) {
            getProducts(cart.products);
        }
    }, [isEdit, cart.products, getProducts]);

    const addProduct = useCallback((product) => {
        if (isEdit) {
            orderedProducts.push({...product, action: 'add'});
            forceUpdate();
        } else {
            cartUtils.addProduct(product);
        }
    }, [orderedProducts, isEdit, cartUtils, forceUpdate]);

    const validate = useCallback((value) => {
        const regexp = /^((?!(0))\d+$)/;
        return regexp.test(value);
    }, []);

    const onAmountChange = useCallback((value, productId) => {
        if (validate(value)) {
            const newArr = [...cart.products];
            const ind = newArr.findIndex(item => item.productId === productId);
            const price = newArr[ind].price;
            newArr[ind].amount = validate(value) ? value : newArr[ind].amount;
            newArr[ind].totalPrice = price * parseInt(value);
            if (isEdit) {
                getProducts(newArr);
            }
        }
    }, [cart.products, validate, getProducts, isEdit]);

    const onPriceChange = useCallback((product, value, productId) => {
        if (validate(value)) {
            const newArr = isEdit ? [...orderedProducts] : [...cart.products];
            const ind = newArr.findIndex(item => item.productId === productId);
            setEdit({
                id: edit.id,
                priceValue: validate(value) ? value : product.price
            });
            newArr[ind].price = validate(value) ? value : newArr[ind].price;
            newArr[ind].totalPrice = product.price * newArr[ind].amount;
            forceUpdate();
        }
    }, [validate, forceUpdate, edit, cart, isEdit, orderedProducts]);

    const decrement = useCallback((product) => {
        if (isEdit) {
            product.totalPrice = edit.priceValue * --product.amount;
            const newArr = [...orderedProducts];
            const ind = newArr.findIndex(item => item.productId === product.productId);
            newArr[ind] = {
                ...product,
                action: product.action === 'add' ? 'add' : 'edit'
            };
            orderedProducts[ind] = newArr[ind];
            forceUpdate();
        } else {
            product.totalPrice = product.price * --product.amount;
            cartUtils.editProduct(product);
        }
    }, [isEdit, orderedProducts, forceUpdate, cartUtils, edit]);

    const increment = useCallback((product) => {
        if (isEdit) {
            product.totalPrice = edit.priceValue * ++product.amount;
            const newArr = [...orderedProducts];
            const ind = newArr.findIndex(item => item.productId === product.productId);
            newArr[ind] = {
                ...product,
                action: product.action === 'add' ? 'add' : 'edit'
            };
            orderedProducts[ind] = newArr[ind];
            forceUpdate();
        } else {
            product.totalPrice = product.price * ++product.amount;
            cartUtils.editProduct(product);
        }
    }, [forceUpdate, isEdit, orderedProducts, cartUtils, edit]);

    const calculateTotalPoints = useCallback(() => {
        if (isEdit) {
            const newArr = orderedProducts.filter((item) => {
                return item.action === 'remove' ? null : item.totalPrice
            });
            return `${newArr.reduce((a, b) => a + b.totalPrice, 0)} ${orderedProducts[0] && orderedProducts[0].currency}`;
        }
        return `${cart.products.reduce((a, b) => a + b.totalPrice, 0)} ${cart.products[0].currency}`;
    }, [cart.products, isEdit, orderedProducts]);

    const removeProduct = useCallback((product) => {
        if (isEdit) {
            const index = orderedProducts.findIndex(item => item.productId === product.productId);
            const newArr = [...orderedProducts];
            const ind = newArr.findIndex(item => item.productId === product.productId);
            newArr[ind] = {
                ...product,
                action: 'remove'
            };
            dispatch(closeDialog());
            orderedProducts[ind] = newArr[ind];
            if (product.action === 'add') {
                orderedProducts.splice(index, 1)
            }
            forceUpdate();
        } else {
            cartUtils.deleteProduct(product);
        }
    }, [orderedProducts, isEdit, cartUtils, dispatch, forceUpdate]);

    const editHandleClick = useCallback((product) => {
        setEdit({
            id: product.productId,
            priceValue: product.price
        })
    }, []);

    const deleteChange = useCallback((product) => {
        setEdit({
            id: edit.id,
            priceValue: product.price
        });
        forceUpdate()
    }, [forceUpdate, edit]);

    const saveHandleClick = useCallback((product) => {
        if (edit.id) {
            product.price = edit.priceValue;
        }
        setEdit({
            id: '',
            priceValue: edit.priceValue
        });
        cartUtils.editProduct(product)
    }, [edit, cartUtils]);

    const renderButton = useCallback((product) => {
        if (edit.id === product.productId) {
            return (
                <IconButton onClick={() => saveHandleClick(product)}>
                    <CheckIcon className={classes.editButton}/>
                </IconButton>
            );
        } else {
            return (
                <IconButton onClick={() => editHandleClick(product)}>
                    <EditIcon className={classes.editButton}/>
                </IconButton>
            );
        }
    }, [editHandleClick, saveHandleClick, edit, classes]);

    const openProductDeleteDialog = useCallback((product) => {
        dispatch(renderDialog({
            isShow: true,
            onCloseHandler: () => dispatch(closeDialog()),
            closeText: t('DISAGREE'),
            children: `${t('DELETE_PRODUCT')} "${product.name}"?`,
            actionText: t('AGREE'),
            onActionHandler: () => removeProduct(product),
        }));
    }, [removeProduct, t, dispatch]);

    const click = useCallback((product) => {
        if (product.action !== 'add' && isEdit) {
            openProductDeleteDialog(product)
        } else if (edit.id) {
            deleteChange(product);
            setEdit({id: '', priceValue: product.price})
        } else {
            removeProduct(product)
        }
    }, [isEdit, openProductDeleteDialog, deleteChange, edit, removeProduct]);

    const renderPrice = useCallback((product) => {
        if (edit.id === product.productId) {
            return (
                <div style={{display: 'flex'}}>
                    <InputBase
                        className={classes.margin}
                        onChange={(event) => onPriceChange(product, event.target.value, product.productId)}
                        value={edit.priceValue}
                        inputProps={{'aria-label': 'naked'}}
                    />
                    <Typography style={{marginTop: 5}}>
                        &nbsp; {product.currency}
                    </Typography>
                </div>
            );
        }
        return (
            <div style={{display: 'flex'}}>
                <Typography variant='body1' style={{lineHeight: 1.2}}>
                    {product.price}
                </Typography>
                <Typography variant='body2' style={{lineHeight: 1.3}}>
                    &nbsp; {product.currency}
                </Typography>
            </div>
        )
    }, [classes, onPriceChange, edit]);

    const renderAmountButton = useCallback((product) => {
        return (
            <Grid item xs={6} sm={12} className={classes.productMetaAmountContainer}>
                <FormControl variant="outlined" fullWidth
                             className={classes.productMetaAmountForm}>
                    <InputLabel>{t('AMOUNT')}</InputLabel>
                    <OutlinedInput
                        className={classes.amount}
                        type='text'
                        disabled={edit.id !== product.productId}
                        label={t('AMOUNT')}
                        name='amount'
                        value={product.amount}
                        onChange={(event) => onAmountChange(event.target.value, product.productId)}
                        startAdornment={
                            <InputAdornment position="start">
                                <IconButton
                                    className={classes.amountButton}
                                    fontSize="small"
                                    onClick={() => decrement(product)}
                                    disabled={product.amount === 1 || edit.id !== product.productId}>
                                    <RemoveIcon/>
                                </IconButton>
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    className={classes.amountButton}
                                    fontSize="small"
                                    disabled={edit.id !== product.productId}
                                    onClick={() => increment(product)}>
                                    <AddIcon/>
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
            </Grid>
        )
    }, [t, classes, increment, decrement, edit, onAmountChange]);

    const renderSelectedProducts = useCallback(() => {
        if (isEmpty(orderedProducts) && isEmpty(cart.products)) {
            return null;
        }

        return (orderedProducts || cart.products).map((item) => {
            const {productId, action, name, totalPrice, currency} = item;
            if (action === 'remove') {
                return null;
            }
            return (
                <ListItem disabled={action === 'remove'} key={productId} className={classes.productList}>
                    <Grid container item xs={12} sm={12} className={classes.productContainer}>
                        <Grid item xs={2} sm={1} className={classes.productContainerItem}>
                            <Grid className={classes.editProduct}>
                                {renderButton(item)}
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
                                            {renderPrice(item)}
                                        </React.Fragment>}/>
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.productMetaAmountAndTotal}>
                                    <Grid item xs={12} sm={6} className={classes.productMetaAmount}>
                                        {renderAmountButton(item)}
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
                                <Grid item xs={1} sm={1} className={classes.productContainerItem}>
                                    <Grid className={classes.removeProduct}>
                                        <IconButton
                                            onClick={() => click(item)}
                                            size='medium'>
                                            <CloseIcon/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </ListItem>
            );
        })
    }, [t, renderAmountButton, history, classes, click, renderButton, renderPrice, cart.products, orderedProducts]);

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

import React, {useCallback, useEffect} from "react";
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
import AddIcon from '@material-ui/icons/Add';
import {useTranslation} from "react-i18next";
import {
    addProductToCart,
    deleteProductFromCart,
    editProductFromCart, setProductsToCart,
} from "../../../../data/store/order/orderActions";
import {useSelector} from "react-redux";

export const ProductForm = ({
                                getProducts,
                                orderedProducts,
                                classes,
                                isEdit
                            }) => {
    const dispatch = useDispatch();
    const [products] = useProducts();

    const orderCart = useSelector(state => state.orderReducer.cart);
    const {t} = useTranslation();

    useEffect(() => {
        if (!isEdit) {
            getProducts(orderCart);
        }
    }, [isEdit, orderCart, getProducts]);

    const addProduct = useCallback((product) => {
        dispatch(addProductToCart(product));
        dispatch(closeModal());
    }, [dispatch]);

    const openAddOrderProductModal = useCallback(() => {
        dispatch(renderModal({
            isOpen: true,
            classes: {},
            children: (
                <AddOrderProduct
                    products={products.filter((product) => (
                        !orderCart.find(({productId}) => productId === product.productId)
                    ))}
                    submit={addProduct}
                />
            ),
            onCloseHandler: () => dispatch(closeModal()),
        }))
    }, [dispatch, products, addProduct, orderCart]);

    const validateAmount = useCallback((value) => {
        const regexp = /^((?!(0))\d+$)/;
        return regexp.test(value);
    }, []);

    const onAmountChange = useCallback((value, productId) => {
        if (validateAmount(value)) {
            const newArr = [...orderCart];
            const ind = newArr.findIndex(item => item.productId === productId);
            const price = newArr[ind].price;
            newArr[ind].amount = validateAmount(value) ? value : newArr[ind].amount;
            newArr[ind].totalPrice = price * parseInt(value);
            dispatch(addProductToCart(newArr));
            if (isEdit) {
                getProducts(newArr);
            }
        }
    }, [dispatch, orderCart, validateAmount, getProducts, isEdit]);

    const decrement = useCallback((product) => {
        product.totalPrice = product.price * --product.amount;
        dispatch(editProductFromCart(product));
    }, [dispatch]);

    const increment = useCallback((product) => {
        product.totalPrice = product.price * ++product.amount;
        dispatch(editProductFromCart(product));
    }, [dispatch]);

    const calculateTotalPoints = useCallback(() => {
        return `${orderCart.reduce((a, b) => a + b.totalPrice, 0)} ${orderCart[0].currency}`;
    }, [orderCart]);

    const removeProduct = useCallback((product) => {
        dispatch(deleteProductFromCart(product));
    }, [dispatch]);

    const renderSelectedProducts = useCallback(() => {
        if (isEmpty(orderedProducts) && isEmpty(orderCart)) {
            return null;
        }

        return (orderedProducts || orderCart).map((item) => {
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
                                <Typography variant='body1' className={classes.productTitleName}>
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
    }, [t, classes, orderCart, onAmountChange, decrement, increment, removeProduct, isEdit, orderedProducts]);

    return (
        <>
            <Grid item xs={12} sm={12}>
                <Typography variant='h6'>
                    {t('CART')}
                </Typography>
                <Divider/>
            </Grid>
            <Grid container item xs={12} sm={12}>
                {renderSelectedProducts()}
                <Grid className={classes.productContainerMeta}>
                    <Grid item xs={12} sm={6}>
                        <Button variant='outlined'
                                onClick={() => openAddOrderProductModal()}
                                disabled={isEdit}
                        >
                            {t('ADD_PRODUCT')}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.productContainerTotal}>
                        {!isEmpty(orderCart) ? (
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

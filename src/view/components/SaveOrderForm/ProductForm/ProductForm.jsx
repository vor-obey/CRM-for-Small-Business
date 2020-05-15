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
    FormControl,
    Chip
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

export const ProductForm = ({
                                getProducts,
                                orderedProducts,
                                classes,
                                isEdit
                            }) => {
    const dispatch = useDispatch();
    const [products, setProducts] = useProducts();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const {t} = useTranslation();

    useEffect(() => {
        if (orderedProducts) {
            setSelectedProducts(orderedProducts);
        }
    }, [orderedProducts]);

    useEffect(() => {
        if (!isEdit) {
            getProducts(selectedProducts);
        }
    }, [isEdit, selectedProducts, getProducts]);

    const addProduct = useCallback((product) => {
        setSelectedProducts(prevState => ([
            ...prevState,
            {
                ...product,
                price: parseInt(product.price)
            }
        ]));
        const newArr = [...products];
        const ind = newArr.findIndex(item => item.productId === product.productId);
        newArr.splice(ind, 1);
        setProducts(newArr);
        dispatch(closeModal());
    }, [products, setProducts, dispatch]);

    const openAddOrderProductModal = useCallback(() => {
        dispatch(renderModal({
            isOpen: true,
            classes: {},
            children: (
                <AddOrderProduct
                    products={products}
                    submit={addProduct}
                />
            ),
            onCloseHandler: () => dispatch(closeModal()),
        }))
    }, [dispatch, products, addProduct]);

    const validateAmount = useCallback((value) => {
        const regexp = /^((?!(0))\d+$)/;
        return regexp.test(value);
    }, []);

    const onAmountChange = useCallback((value, productId) => {
        if (validateAmount(value)) {
            const newArr = [...selectedProducts];
            const ind = newArr.findIndex(item => item.productId === productId);
            const price = newArr[ind].price;
            newArr[ind].amount = validateAmount(value) ? value : newArr[ind].amount;
            newArr[ind].totalPrice = price * parseInt(value);
            setSelectedProducts(newArr);
            if (isEdit) {
                getProducts(newArr);
            }
        }
    }, [selectedProducts, validateAmount, getProducts, isEdit]);

    const decrement = useCallback((productId) => {
        const newArr = [...selectedProducts];
        const ind = newArr.findIndex(item => item.productId === productId);
        const {price} = newArr[ind];
        newArr[ind].amount = --newArr[ind].amount;
        newArr[ind].totalPrice = price * newArr[ind].amount;
        setSelectedProducts(newArr);
        if (isEdit) {
            getProducts(newArr);
        }
    }, [selectedProducts, getProducts, isEdit]);

    const increment = useCallback((productId) => {
        const newArr = [...selectedProducts];
        const ind = newArr.findIndex(item => item.productId === productId);
        const {price} = newArr[ind];
        newArr[ind].amount = ++newArr[ind].amount;
        newArr[ind].totalPrice = price * newArr[ind].amount;
        setSelectedProducts(newArr);
        if (isEdit) {
            getProducts(newArr);
        }
    }, [selectedProducts, getProducts, isEdit]);

    const calculateTotalPoints = useCallback(() => {
        return `${selectedProducts.reduce((a, b) => a + b.totalPrice, 0)} ${selectedProducts[0].currency}`;
    }, [selectedProducts]);

    const removeProduct = useCallback((product) => {
        const newArr = [...selectedProducts];
        const ind = newArr.findIndex(item => item.productId === product.productId);
        newArr.splice(ind, 1);
        setSelectedProducts(newArr);
        setProducts(prevState => ([...prevState, product]));
    }, [selectedProducts, setProducts]);

    const renderSelectedProducts = useCallback(() => {
        if (isEmpty(selectedProducts)) {
            return null;
        }

        return selectedProducts.map((item) => {
            const {productId, name, price, amount, totalPrice, currency} = item;
            return (
                <ListItem key={productId}
                          className={classes.productList}>
                    <Grid container item xs={12} sm={12} className={classes.productContainer}>
                        <Grid item xs={1} sm={1} className={classes.productContainerItem}>
                            <Grid className={classes.removeProduct}>
                                <IconButton disabled={isEdit} onClick={() => removeProduct(item)} size='medium'>
                                    <CloseIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={11} className={classes.productInfo}>
                            <Grid container item xs={12} sm={12} className={classes.productContainerItem}>
                                <Grid className={classes.productTitle}>
                                    <Typography variant='body1'
                                                className={classes.productTitleName}>
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
                                                                onClick={() => decrement(productId)}
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
                                                                onClick={() => increment(productId)}>
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
    }, [t, classes, selectedProducts, onAmountChange, decrement, increment, removeProduct, isEdit]);

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
                        {!isEmpty(selectedProducts) ? (
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

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
    TextField,
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
import {StorageService} from "../../../../services";
import {setOrderDescription} from "../../../../data/store/order/orderActions";
import {OrderDescriptionInput} from "../OrderDescriptionInput/OrderDescriptionInput";

export const ProductForm = ({
                                setOrderedProducts,
                                getProducts,
                                orderedProducts,
                                classes,
                                isEdit,
                                history,
                                description,
                            }) => {
    const [products] = useProducts();
    const dispatch = useDispatch();

    const cartUtils = useEditCart();
    const {t} = useTranslation();
    const cart = useCart(products);

    const [editDetailsProduct, setEditDetailsProduct] = useState({
        id: '',
        price: '',
        amount: '',
        totalPrice: '',
    });

    useEffect(() => {
        if (!isEdit) {
            getProducts(cart.products);
        }
    }, [isEdit, cart.products, getProducts]);

    const addProduct = useCallback((product) => {
        if (isEdit) {
            const newArr = [...orderedProducts];
            const ind = newArr.findIndex(item => item.productId === product.productId);
            if (orderedProducts.find(item => item.productId === product.productId)) {
                newArr[ind] = {
                    ...product,
                    action: 'edit',
                    orderProductId: orderedProducts[ind].orderProductId,
                };
                setOrderedProducts(newArr)
            } else {
                newArr.push({...product, action: 'add'});
                setOrderedProducts(newArr);
            }
        } else {
            cartUtils.addProduct(product);
        }
    }, [orderedProducts, setOrderedProducts, isEdit, cartUtils]);

    const validate = useCallback((value) => {
        const regexp = /^((?!(0))\d+$)/;
        return regexp.test(value);
    }, []);

    const onAmountChange = useCallback((value) => {
        if (validate(value)) {
            setEditDetailsProduct(prevState => {
                return {
                    ...prevState,
                    amount: value,
                    totalPrice: validate(value) ? value * editDetailsProduct.price : editDetailsProduct.price * editDetailsProduct.amount
                }
            });
        }
    }, [validate, editDetailsProduct]);

    const onPriceChange = useCallback((product, value) => {
        if (validate(value)) {
            setEditDetailsProduct(prevState => {
                return {
                    ...prevState,
                    price: validate(value) ? value : product.price,
                    totalPrice: validate(value) ? value * editDetailsProduct.amount : product.price * editDetailsProduct.amount
                }
            });
        }
    }, [validate, editDetailsProduct]);

    const decrement = useCallback(() => {
        setEditDetailsProduct(prevState => {
            return {
                ...prevState,
                amount: editDetailsProduct.amount - 1,
                totalPrice: editDetailsProduct.price * (editDetailsProduct.amount - 1)
            }
        });
    }, [editDetailsProduct]);

    const increment = useCallback(() => {
        setEditDetailsProduct(prevState => {
            return {
                ...prevState,
                amount: editDetailsProduct.amount + 1,
                totalPrice: editDetailsProduct.price * (editDetailsProduct.amount + 1)
            }
        });
    }, [editDetailsProduct]);

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
            const newArr = [...orderedProducts];
            const ind = newArr.findIndex(item => item.productId === product.productId);
            if (product.action === 'add') {
                newArr.splice(ind, 1);
                setOrderedProducts(newArr);
            } else {
                newArr[ind] = {
                    ...product,
                    action: 'remove'
                };
                setOrderedProducts(newArr);
                dispatch(closeDialog());
            }
        } else {
            cartUtils.deleteProduct(product);
        }
    }, [orderedProducts, setOrderedProducts,  isEdit, cartUtils, dispatch]);

    const editHandleClick = useCallback((product) => {
        setEditDetailsProduct({
            id: product.productId,
            price: product.price,
            amount: product.amount,
            totalPrice: product.totalPrice
        });
    }, []);

    const deleteChange = useCallback((product) => {
        setEditDetailsProduct({
            id: product.id,
            price: product.price,
            amount: product.amount,
            totalPrice: product.totalPrice,
        });
    }, []);

    const saveHandleClick = useCallback((product) => {
        if (editDetailsProduct.id) {
            if (isEdit) {
                const newArr = [...orderedProducts];
                const ind = newArr.findIndex(item => item.productId === product.productId);
                newArr[ind] = {
                    ...product,
                    price: editDetailsProduct.price,
                    amount: editDetailsProduct.amount,
                    action: product.action === 'add' ? 'add' : 'edit'
                };
                setOrderedProducts(newArr);
                setEditDetailsProduct(prevState => ({...prevState, id: ''}));
            } else {
                product.price = editDetailsProduct.price;
                product.amount = editDetailsProduct.amount;
                product.totalPrice = product.price * product.amount;
                cartUtils.editProduct(product);
                setEditDetailsProduct(prevState => ({...prevState, id: ''}));
            }
        } else {
            return null;
        }
    }, [cartUtils, editDetailsProduct, setOrderedProducts, isEdit, orderedProducts]);

    const renderButton = useCallback((product) => {
        if (editDetailsProduct.id === product.productId) {
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
    }, [editHandleClick, saveHandleClick, editDetailsProduct, classes]);

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

    const clickHandlerAction = useCallback((product) => {
        if (product.action !== 'add' && editDetailsProduct.id.length === 0 && isEdit) {
            openProductDeleteDialog(product)
        } else if (editDetailsProduct.id) {
            deleteChange(product);
            setEditDetailsProduct(prevState => ({...prevState, id: ''}));
        } else {
            removeProduct(product)
        }
    }, [isEdit, openProductDeleteDialog, deleteChange, editDetailsProduct, removeProduct]);

    const renderPrice = useCallback((product) => {
        if (editDetailsProduct.id === product.productId) {
            return (
                <div style={{display: 'flex', marginBottom: 4}}>
                    <TextField
                        className={classes.margin}
                        onChange={(event) => onPriceChange(product, event.target.value, product.productId)}
                        value={editDetailsProduct.id === product.productId ? editDetailsProduct.price : product.price}
                        autoFocus
                        InputProps={{classes: {underline: classes.underline}}}/>
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
                <Typography variant='body2' style={{lineHeight: 1.4}}>
                    &nbsp; {product.currency}
                </Typography>
            </div>
        )
    }, [classes, onPriceChange, editDetailsProduct]);

    const renderAmountButton = useCallback((product) => {
        return (
            <Grid item xs={6} sm={12} className={classes.productMetaAmountContainer}>
                <FormControl variant="outlined" fullWidth
                             className={classes.productMetaAmountForm}>
                    <InputLabel>{t('AMOUNT')}</InputLabel>
                    <OutlinedInput
                        className={classes.amount}
                        type='text'
                        disabled={editDetailsProduct.id !== product.productId}
                        label={t('AMOUNT')}
                        name='amount'
                        value={editDetailsProduct.id === product.productId ? editDetailsProduct.amount : product.amount}
                        onChange={(event) => onAmountChange(event.target.value, product.productId)}
                        startAdornment={
                            <InputAdornment position="start">
                                <IconButton
                                    className={classes.amountButton}
                                    fontSize="small"
                                    onClick={decrement}
                                    disabled={editDetailsProduct.amount === 1 || editDetailsProduct.id !== product.productId}>
                                    <RemoveIcon/>
                                </IconButton>
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    className={classes.amountButton}
                                    fontSize="small"
                                    disabled={editDetailsProduct.id !== product.productId}
                                    onClick={increment}>
                                    <AddIcon/>
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
            </Grid>
        )
    }, [t, classes, increment, decrement, onAmountChange, editDetailsProduct]);

    const renderTotalPrice = useCallback((product) => {
        return (
            <Grid item xs={12} sm={12} className={classes.productMetaSummary}>
                <Grid className={classes.productContainerSummary}>
                    <Typography variant='subtitle1'>
                        {t('SUMMARY')}:
                    </Typography>
                    <Typography variant='body1'>
                        {product.productId === editDetailsProduct.id ? editDetailsProduct.totalPrice : product.totalPrice} {product.currency}
                    </Typography>
                </Grid>
            </Grid>
        )
    }, [t, editDetailsProduct, classes]);

    const renderSelectedProducts = useCallback(() => {
        if (isEmpty(orderedProducts) && isEmpty(cart.products)) {
            return null;
        }

        return (orderedProducts || cart.products).map((item) => {
            const {productId, action, name} = item;
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
                                        {renderTotalPrice(item)}
                                    </Grid>
                                </Grid>
                                <Grid item xs={1} sm={1} className={classes.productContainerItem}>
                                    <Grid className={classes.removeProduct}>
                                        <IconButton
                                            onClick={() => clickHandlerAction(item)}
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
    }, [renderAmountButton, history, classes, renderTotalPrice, clickHandlerAction, renderButton, renderPrice, cart.products, orderedProducts]);

    const handleResetCart = useCallback(() => {
        cart.setProducts([]);
        dispatch(setOrderDescription(''));
        StorageService.setItem('description', '');
    }, [cart, dispatch]);

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
            <OrderDescriptionInput isEdit={isEdit} description={description}/>
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

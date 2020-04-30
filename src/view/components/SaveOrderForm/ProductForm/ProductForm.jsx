import React, {useCallback, useEffect, useState} from "react";
import {Grid, TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {closeModal, renderModal} from '../../../../data/store/auxiliary/auxiliaryActions';
import {useDispatch} from 'react-redux';
import {AddOrderProduct} from '../../AddOrderProduct/AddOrderProduct';
import {useProducts} from '../../../../utils/hooks/productHooks';
import isEmpty from 'lodash/isEmpty';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

export const ProductForm = ({getProducts}) => {
    const dispatch = useDispatch();
    const [products, setProducts] = useProducts();
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        getProducts(selectedProducts);
    }, [selectedProducts, getProducts]);

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
        }
    }, [selectedProducts, validateAmount]);

    const decrement = useCallback((productId) => {
        const newArr = [...selectedProducts];
        const ind = newArr.findIndex(item => item.productId === productId);
        const {price} = newArr[ind];
        newArr[ind].amount = --newArr[ind].amount;
        newArr[ind].totalPrice = price * newArr[ind].amount;
        setSelectedProducts(newArr);
    }, [selectedProducts]);

    const increment = useCallback((productId) => {
        const newArr = [...selectedProducts];
        const ind = newArr.findIndex(item => item.productId === productId);
        const {price} = newArr[ind];
        newArr[ind].amount = ++newArr[ind].amount;
        newArr[ind].totalPrice = price * newArr[ind].amount;
        setSelectedProducts(newArr);
    }, [selectedProducts]);

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
                <ListItem key={productId} style={{
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    borderRadius: 5,
                    marginTop: 5,
                    marginBottom: 5
                }}>
                    <Grid container item xl={12} lg={12}>
                        <Grid item xl={1} lg={1} style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            marginTop: 'auto',
                            marginBottom: 'auto',
                        }}>
                            <IconButton onClick={() => removeProduct(item)} size='medium'>
                                <CloseIcon/>
                            </IconButton>
                        </Grid>
                        <Grid container item xl={11} lg={11}>
                            <Grid item xl={12} lg={12}>
                                {name}
                            </Grid>
                            <Grid item xl={4} lg={4} style={{
                                marginTop: 'auto',
                                marginBottom: 'auto'
                            }}>
                                {price} {currency}
                            </Grid>
                            <Grid item xl={4} lg={4}>
                                <IconButton onClick={() => decrement(productId)} disabled={amount === 1}>
                                    <RemoveIcon/>
                                </IconButton>
                                <TextField
                                    value={amount}
                                    label='Amount'
                                    name='amount'
                                    type='text'
                                    variant='outlined'
                                    onChange={(event) => onAmountChange(event.target.value, productId)}
                                />
                                <IconButton onClick={() => increment(productId)}>
                                    <AddIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item xl={4} lg={4} style={{textAlign: 'center'}}>
                                <Typography variant='body1' style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <span style={{fontWeight: 'bold'}}>Summary:</span> {totalPrice} {currency}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </ListItem>
            );
        })
    }, [selectedProducts, onAmountChange, decrement, increment, removeProduct]);

    return (
        <>
            <Grid item xl={12} lg={12}>
                <Typography variant='h6'>
                    Product(s)
                </Typography>
                <Divider/>
            </Grid>
            <List style={{width: '100%'}}>
                {renderSelectedProducts()}
                <ListItem style={{paddingLeft: 0, paddingRight: 0}}>
                    <Grid item xl={12} lg={12} style={{marginTop: 10}}>
                        <Button
                            variant='outlined'
                            onClick={() => openAddOrderProductModal()}
                        >
                            Add product
                        </Button>
                    </Grid>
                </ListItem>
                {!isEmpty(selectedProducts) ? (
                    <ListItem>
                        <Grid container item xl={12} lg={12} style={{textAlign: 'right'}}>
                            <Typography variant='body1'>
                                <span style={{fontWeight: 'bold'}}>Total:</span> {calculateTotalPoints()}
                            </Typography>
                        </Grid>
                    </ListItem>
                ) : null}
            </List>
        </>
    );
};

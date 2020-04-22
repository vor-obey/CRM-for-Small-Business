import React, {useCallback, useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, Container, ListItemIcon, ListItemText} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {AbstractProductService} from '../../../services';
import {useParams} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import isEmpty from 'lodash/isEmpty';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

export const AbstractProductDetailsPage = ({history}) => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [abstractProductDetails, setAbstractProductDetails] = useState({});

    useEffect(() => {
        const fetchAbstractProductDetailsById = async (id) => {
            try {
                dispatch(setIsLoading(true));
                const response = await AbstractProductService.findOneById(id);
                setAbstractProductDetails(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
            }
        };
        fetchAbstractProductDetailsById(id);
    }, [dispatch, id]);

    const renderAttributes = useCallback(() => {
        const {productType: {productTypeToAttributes = {}} = {}} = abstractProductDetails;
        if (isEmpty(productTypeToAttributes)) {
            return null;
        }

        return productTypeToAttributes.map(({attribute}) => {
            const {attributeValues, attributeId, name} = attribute;
            return (
                <Grid item xl={4} lg={4} key={attributeId}>
                    <Card>
                        <CardHeader
                            title={
                                <Typography variant='body1'>
                                    {name}
                                </Typography>
                            }
                            style={{
                                padding: 5,
                                border: '1px solid rgba(0, 0, 0, 0.12)'
                            }}
                        />
                        <CardContent style={{maxHeight: 100, overflow: 'auto', padding: 0}}>
                            <List>
                                {attributeValues.map((attrValue) => (
                                        <ListItem key={attrValue.attributeValueId}>
                                            <ListItemText
                                                primary={attrValue.value}
                                            />
                                        </ListItem>
                                    )
                                )}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            );
        });
    }, [abstractProductDetails]);

    const renderProducts = useCallback(() => {
        const {products = {}} = abstractProductDetails;

        if (isEmpty(products)) {
            return null;
        }

        return products.map((product) => {
            const {productId, name, price} = product;
            return (
                <ListItem
                    key={productId}
                >
                    <ListItemIcon
                        onClick={() => history.push(`/products/${productId}`)}
                        style={{cursor: 'pointer'}}
                    >
                        <ShoppingBasketIcon/>
                    </ListItemIcon>
                    <ListItemText
                        primary={name}
                        secondary={`Price: ${price}`}
                    />
                </ListItem>
            );
        })
    }, [abstractProductDetails, history]);

    return (
        <Container maxWidth='md' style={{marginTop: 30}}>
            <Paper style={{padding: 15}}>
                <Grid container item xl={12} lg={12}>
                    <Grid item style={{marginTop: 15, marginBottom: 15, textAlign: 'center', width: '100%'}}>
                        <Typography variant='h6'>
                            Abstract Product Details
                        </Typography>
                    </Grid>
                    <Grid container item xl={12} lg={12}>
                        <Grid item xl={12} lg={12} style={{flexDirection: 'column'}}>
                            <Typography variant='h6'>
                                Name
                            </Typography>
                            <Typography variant='body1'>
                                {abstractProductDetails.name}
                            </Typography>
                        </Grid>
                        <Grid item xl={12} lg={12} style={{flexDirection: 'column', margin: '15px 0 15px 0'}}>
                            <Typography variant='h6'>
                                Description
                            </Typography>
                            <Typography variant='body1'>
                                {abstractProductDetails.description}
                            </Typography>
                        </Grid>
                        <Grid item xl={12} lg={12} style={{flexDirection: 'column'}}>
                            <Typography variant='h6'>
                                Price
                            </Typography>
                            <Typography variant='body1'>
                                {abstractProductDetails.price}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xl={12} lg={12} style={{marginTop: 30}}>
                        <Grid item xl={12} lg={12}>
                            <Typography variant='h6'>
                                Product Type
                            </Typography>
                            <Typography variant='body1'>
                                {abstractProductDetails.productType && abstractProductDetails.productType.name}
                            </Typography>
                        </Grid>
                        <Grid item xl={12} lg={12} style={{marginTop: 15}}>
                            <Typography variant='h6'>
                                Product Type Description
                            </Typography>
                            <Typography variant='body1'>
                                {abstractProductDetails.productType && abstractProductDetails.productType.description}
                            </Typography>
                        </Grid>
                        <Grid container item xl={12} lg={12} style={{marginTop: 15}}>
                            <Grid item xl={12} lg={12}>
                                <Typography variant='h6'>Attributes</Typography>
                            </Grid>
                            {renderAttributes()}
                        </Grid>
                    </Grid>
                    <Grid container item xl={12} lg={12} style={{marginTop: 30}}>
                        <Grid item xl={12} lg={12}>
                            <Typography variant='h6'>
                                Products
                            </Typography>
                            <List>
                                {renderProducts()}
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useParams} from "react-router-dom";
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {ProductService} from '../../../services';
import {Container} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import isEmpty from 'lodash/isEmpty';

export const ProductDetailsPage = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [productDetails, setProductDetails] = useState({});

    useEffect(() => {
        const fetchProductDetailsById = async (id) => {
            try {
                dispatch(setIsLoading(true));
                const response = await ProductService.findOneById(id);
                setProductDetails(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
            }
        };
        fetchProductDetailsById(id);
    }, [dispatch, id]);

    const renderAttributes = useCallback(() => {
        const {productToAttributeValues} = productDetails;
        if (isEmpty(productToAttributeValues)) {
            return null;
        }

        return productToAttributeValues.map(({attributeValue}) => {
            const {attribute: {name = {}}, attributeValueId, value} = attributeValue;
            return (
                <Typography variant='body1' key={attributeValueId}>
                    {name}: {value}
                </Typography>
            );
        });
    }, [productDetails]);

    return (
        <Container maxWidth='md' style={{marginTop: 30}}>
            <Paper style={{padding: 15}}>
                <Grid container item xl={12} lg={12}>
                    <Grid item style={{marginTop: 15, marginBottom: 15, textAlign: 'center', width: '100%'}}>
                        <Typography variant='h6'>
                            Product Details
                        </Typography>
                    </Grid>
                    <Grid container item xl={12} lg={12}>
                        <Grid item xl={12} lg={12}>
                            <Typography variant='h6'>
                                Name
                            </Typography>
                            <Typography variant='body1'>
                                {productDetails.name}
                            </Typography>
                        </Grid>
                        <Grid item xl={12} lg={12} style={{marginTop: 15}}>
                            <Typography variant='h6'>
                                Price
                            </Typography>
                            <Typography variant='body1'>
                                {productDetails.price}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xl={12} lg={12} style={{marginTop: 30}}>
                        <Grid item xl={12} lg={12}>
                            <Typography variant='h6'>
                                Abstract Product
                            </Typography>
                            <Link
                                to={`/abstract-products/${productDetails.abstractProduct && productDetails.abstractProduct.abstractProductId}`}>
                                <Typography variant='body1'>
                                    {productDetails.abstractProduct && productDetails.abstractProduct.name}
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item xl={12} lg={12} style={{marginTop: 15}}>
                            <Typography variant='h6'>
                                Product Type
                            </Typography>
                            <Typography variant='body1'>
                                {productDetails.abstractProduct && productDetails.abstractProduct.productType.name}
                            </Typography>
                        </Grid>
                        <Grid item xl={12} lg={12} style={{marginTop: 15}}>
                            <Grid item xl={12} lg={12}>
                                <Typography variant='h6'>Attributes</Typography>
                                {renderAttributes()}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};
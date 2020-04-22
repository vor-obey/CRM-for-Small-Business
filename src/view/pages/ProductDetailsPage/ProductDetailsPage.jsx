import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useParams} from "react-router-dom";
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {ProductService} from '../../../services';
import {Container} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import isEmpty from 'lodash/isEmpty';
import Button from '@material-ui/core/Button';
import {CustomDialog} from '../../components/CustomDialog/CustomDialog';
import {useTranslation} from 'react-i18next';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';
import {useProductDetailsById} from '../../../utils/hooks/productHooks';

export const ProductDetailsPage = ({history}) => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [productDetails] = useProductDetailsById(id);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const {t} = useTranslation('');

    const toggleDialog = useCallback(() => setIsDialogOpen(prevState => !prevState), []);

    const deleteProduct = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            const response = await ProductService.delete(id);
            if (response.success) {
                dispatch(setIsLoading(false));
                history.push('/products');
            } else {
                toggleDialog();
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
        }
    }, [id, history, dispatch, toggleDialog]);

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
                    <Grid container item xl={12} lg={12} style={{marginTop: 30}}>
                        <Button onClick={toggleDialog}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <CustomDialog
                title='Delete product'
                isShow={isDialogOpen}
                onClose={toggleDialog}
                closeText={t('DISAGREE')}
                actionText={t('AGREE')}
                onAction={deleteProduct}
            >
                {t('CONFIRM_DELETE')}
            </CustomDialog>
        </Container>
    );
};
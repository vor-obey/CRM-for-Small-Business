import React, {useCallback, useState} from 'react';
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
import {CustomDialog} from '../../components/CustomDialog/CustomDialog';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';
import {useTranslation} from 'react-i18next';
import Button from '@material-ui/core/Button';
import {useAbstractProductDetailsById} from '../../../utils/hooks/productHooks';

export const AbstractProductDetailsPage = ({history}) => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [abstractProductDetails] = useAbstractProductDetailsById(id);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const {t} = useTranslation('');

    const toggleDialog = useCallback(() => setIsDialogOpen(prevState => !prevState), []);

    const deleteAbstractProduct = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            const response = await AbstractProductService.delete(id);
            if (response.success) {
                dispatch(setIsLoading(false));
                history.push('/abstract-products');
            } else {
                toggleDialog();
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: false, message: response.message, success: false}));
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
        }
    }, [id, history, dispatch, toggleDialog]);

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
                onAction={deleteAbstractProduct}
            >
                {t('CONFIRM_DELETE')}
            </CustomDialog>
        </Container>
    );
};
import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {
    Paper,
    Typography,
    Container,
    Grid,
    makeStyles,
    Fab
} from "@material-ui/core";
import {useParams} from "react-router-dom";
import {
    closeDialog,
    renderDialog,

} from '../../../data/store/auxiliary/auxiliaryActions';
import isEmpty from 'lodash/isEmpty';
import {useTranslation} from 'react-i18next';
import {useProductDetailsById, useProductsState} from '../../../utils/hooks/productHooks';
import {productDetailsPageStyles} from "./ProductDetailsPage.Style";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from "@material-ui/icons/Edit";
import {useCart, useEditCart} from "../../../utils/hooks/cartHooks";
import {PRODUCTS} from "../../../constants/routes";
import {deleteProduct} from "../../../data/store/product/productActions";

const useStyles = makeStyles(productDetailsPageStyles);

export const ProductDetailsPage = ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {id} = useParams();
    const {products} = useProductsState();
    const cart = useCart(products);
    const {productDetails} = useProductDetailsById(id);
    const cartUtils = useEditCart();
    const {t} = useTranslation('');

    const onDeleteProduct = useCallback(async () => {
        if (cart.products.find(({productId}) => productId === id)) {
            cartUtils.deleteProduct(cart.products.find(({productId}) => productId === id));
        }
        dispatch(deleteProduct(id))

    }, [id, dispatch, cart, cartUtils]);

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

    const openProductDeleteDialog = useCallback(() => {
        dispatch(renderDialog({
            isShow: true,
            onCloseHandler: () => dispatch(closeDialog()),
            closeText: t('DISAGREE'),
            children: `${t('DELETE_PRODUCT')} "${productDetails.name}"?`,
            actionText: t('AGREE'),
            onActionHandler: () => onDeleteProduct(),
        }));
    }, [productDetails, dispatch, onDeleteProduct, t]);

    if(!productDetails){
        return null;
    }
    return (
        <Container maxWidth='md' className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container item xl={12} lg={12} className={classes.container}>
                    <Grid item className={classes.containerTitle}>
                        <Typography variant='h5'>
                            {t('DETAILS_PRODUCT')}
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} sm={6} className={classes.containerProduct}>
                        <Grid item xs={12} sm={12} className={classes.containerProductItem}>
                            <Typography variant='h6'>
                                {t('PRODUCT_NAME')}
                            </Typography>
                            <Typography variant='body1'>
                                {productDetails.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.containerProductItem}>
                            <Typography variant='h6'>
                                {t('PRICE')}
                            </Typography>
                            <Typography variant='body1'>
                                {productDetails.price}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={6} className={classes.containerProduct}>
                        <Grid item xl={12} lg={12} className={classes.containerProductItem}>
                            <Typography variant='h6'>
                                {t('PRODUCT_TYPE')}
                            </Typography>
                            <Typography variant='body1'>
                                {productDetails.abstractProduct && productDetails.abstractProduct.productType.name}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.containerProduct}>
                        <Grid item xl={12} lg={12} className={classes.containerProductItem}>
                            <Grid item xl={12} lg={12}>
                                <Typography variant='h6'>{t('ATTRIBUTES')}</Typography>
                                {renderAttributes()}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xl={12} lg={12} className={classes.buttonContainer}>
                        <Fab
                            className={classes.buttonFab}
                            onClick={() => history.push(`${PRODUCTS}/${id}/edit`)}
                            color="primary"
                            aria-label="edit"
                            size="small">
                            <EditIcon/>
                        </Fab>
                        <Fab
                            className={classes.buttonFab}
                            onClick={openProductDeleteDialog}
                            color="primary"
                            disabled={productDetails.name === undefined}
                            aria-label="delete"
                            size="small">
                            <DeleteIcon/>
                        </Fab>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

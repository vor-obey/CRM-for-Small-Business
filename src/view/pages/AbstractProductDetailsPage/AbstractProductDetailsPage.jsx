import React, {useCallback} from 'react';
import {
    Grid,
    Container,
    ListItemIcon,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Fab
} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {
    closeDialog,
    renderDialog,
    setIsLoading,
    setSnackBarStatus
} from '../../../data/store/auxiliary/auxiliaryActions';
import {AbstractProductService} from '../../../services';
import {useParams} from "react-router-dom";
import isEmpty from 'lodash/isEmpty';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';
import {useTranslation} from 'react-i18next';
import {useAbstractProductDetailsById} from '../../../utils/hooks/productHooks';
import {abstractProductDetailsPageStyles} from "./AbstractProductDetailsPage.style";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(abstractProductDetailsPageStyles);

export const AbstractProductDetailsPage = ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {id} = useParams();
    const {abstractProductDetails} = useAbstractProductDetailsById(id);
    const {t} = useTranslation('');

    const deleteAbstractProduct = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            const response = await AbstractProductService.delete(id);
            if (response.success) {
                dispatch(setIsLoading(false));
                dispatch(closeDialog());
                history.push('/abstract-products');
            } else {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
        }
    }, [id, history, dispatch]);

    const renderAttributes = useCallback(() => {
        const {productType: {productTypeToAttributes = {}} = {}} = abstractProductDetails;
        if (isEmpty(productTypeToAttributes)) {
            return null;
        }

        return productTypeToAttributes.map(({attribute}) => {
            const {attributeValues, attributeId, name} = attribute;
            return (
                <React.Fragment key={attributeId}>
                    <Grid container item xs={12} sm={6}>
                        <ListItem>
                            <ListItemIcon>
                                <ArrowRightIcon/>
                            </ListItemIcon>
                            <ListItemText
                                className={classes.attributeValue}
                                primary={name}
                                secondary={
                                    <React.Fragment>
                                        {attributeValues.map((attrValue) => (
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.attributeValueItem}
                                                    key={attrValue.attributeValueId}>
                                                    {attrValue.value}
                                                </Typography>
                                            )
                                        )}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </Grid>
                </React.Fragment>
            );
        });
    }, [abstractProductDetails, classes]);

    const renderProducts = useCallback(() => {
        const {products = {}} = abstractProductDetails;

        if (isEmpty(products)) {
            return null;
        }

        return products.map((product) => {
            const {productId, name, price} = product;
            return (
                <React.Fragment key={productId}>
                    <Grid container item xs={12} sm={6}>
                        <ListItem
                            onClick={() => history.push(`/products/${productId}`)}
                            style={{cursor: 'pointer'}}
                        >
                            <ListItemIcon>
                                <ShoppingBasketIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary={name}
                                secondary={`Price: ${price}`}
                            />
                        </ListItem>
                    </Grid>
                </React.Fragment>
            );
        })
    }, [abstractProductDetails, history]);

    const openAbstractProductDeleteDialog = useCallback(() => {
        dispatch(renderDialog({
            isShow: true,
            onCloseHandler: () => dispatch(closeDialog()),
            closeText: t('DISAGREE'),
            actionText: t('AGREE'),
            children: `${t('DELETE_PRODUCT_TEMPLATE') } "${abstractProductDetails.name}"?`,
            onActionHandler: () => deleteAbstractProduct(),
        }));
    }, [dispatch, abstractProductDetails, deleteAbstractProduct, t]);

    return (
        <Container maxWidth='md' className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container item xl={12} lg={12} className={classes.container}>
                    <Grid item className={classes.containerTitle}>
                        <Typography variant='h5'>
                            {t('PRODUCT_TEMPLATE_DETAILS')}
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} sm={12} className={classes.containerProduct}>
                        <Grid item xs={12} sm={6} className={classes.containerProductItem}>
                            <Typography variant='h6'>
                                {t('PRODUCT_NAME')}
                            </Typography>
                            <Typography variant='body1'>
                                {abstractProductDetails.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.containerProductItem}>
                            <Typography variant='h6'>
                                {t('PRICE')}
                            </Typography>
                            <Typography variant='body1'>
                                {abstractProductDetails.price}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.containerProductItem}>
                            <Typography variant='h6'>
                                {t('DESCRIPTION')}
                            </Typography>
                            <Typography variant='body1'>
                                {abstractProductDetails.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.containerProductItem}>
                            <Typography variant='h6'>
                                {t('PRODUCT_TYPE')}
                            </Typography>
                            <Typography variant='body1'>
                                {abstractProductDetails.productType && abstractProductDetails.productType.name}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} className={classes.containerProduct}>
                        {!isEmpty(abstractProductDetails.products) ? (
                            <Grid item xs={12} sm={12} className={classes.containerProductItem}>
                                <Grid item sm={12} xs={12} className={classes.containerTypeItem}>
                                    <Typography variant='h6'>
                                        {t('PRODUCTS')}
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} xs={12}>
                                    <List className={classes.containerProductList}>
                                        {renderProducts()}
                                    </List>
                                </Grid>
                            </Grid>
                        ) : null}
                        <Grid item xs={12} sm={12} className={classes.containerProductItem}>
                            <Grid item xl={12} lg={12}>
                                <Typography variant='h6'>
                                    {t('ATTRIBUTES')}
                                </Typography>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                                <List className={classes.containerProductList}>
                                    {renderAttributes()}
                                </List>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} className={classes.buttonContainer}>
                        <Fab
                            className={classes.buttonFab}
                            onClick={() => history.push(`/abstract-products/${id}/edit`)}
                            color="primary"
                            aria-label="edit"
                            size="small">
                            <EditIcon/>
                        </Fab>
                        <Fab
                            className={classes.buttonFab}
                            onClick={openAbstractProductDeleteDialog}
                            color="primary"
                            aria-label="delete"
                            disabled={abstractProductDetails.name === undefined}
                            size="small">
                            <DeleteIcon/>
                        </Fab>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

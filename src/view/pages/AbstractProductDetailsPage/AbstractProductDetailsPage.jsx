import React, {useCallback} from 'react';
import {
    Grid,
    Divider,
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
import {useLastLocation} from 'react-router-last-location';

const useStyles = makeStyles(abstractProductDetailsPageStyles);

export const AbstractProductDetailsPage = ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {id} = useParams();
    const [abstractProductDetails] = useAbstractProductDetailsById(id);
    const {t} = useTranslation('');
    const lastLocation = useLastLocation();

    const deleteAbstractProduct = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            const response = await AbstractProductService.delete(id);
            if (response.success) {
                dispatch(setIsLoading(false));
                dispatch(closeDialog());
                history.push(`${lastLocation ? lastLocation.pathname : '/abstract-products'}`);
            } else {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
        }
    }, [id, history, dispatch, lastLocation]);

    const renderAttributes = useCallback(() => {
        const {productType: {productTypeToAttributes = {}} = {}} = abstractProductDetails;
        if (isEmpty(productTypeToAttributes)) {
            return null;
        }

        return productTypeToAttributes.map(({attribute}) => {
            const {attributeValues, attributeId, name} = attribute;
            return (
                <React.Fragment key={attributeId}>
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
                    <Divider/>
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

    const openAbstractProductDeleteDialog = useCallback(() => {
        dispatch(renderDialog({
            title: t('DELETE_CATEGORY_PRODUCT'),
            isShow: true,
            onCloseHandler: () => dispatch(closeDialog()),
            closeText: t('DISAGREE'),
            actionText: t('AGREE'),
            onActionHandler: () => deleteAbstractProduct(),
        }));
    }, [dispatch, deleteAbstractProduct, t]);

    return (
        <Container maxWidth='md' className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container item xl={12} lg={12} className={classes.container}>
                    <Grid item className={classes.containerTitle}>
                        <Typography variant='h6'>
                            {t('PRODUCT_CATEGORY_DETAILS')}
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} sm={6} className={classes.containerProduct}>
                        <Grid item xs={12} sm={12} className={classes.containerProductItem}>
                            <Typography variant='h6'>
                                {t('NAME')}
                            </Typography>
                            <Typography variant='body1'>
                                {abstractProductDetails.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} className={classes.containerProductItem}>
                            <Typography variant='h6'>
                                {t('DESCRIPTION')}
                            </Typography>
                            <Typography variant='body1'>
                                {abstractProductDetails.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} className={classes.containerProductItem}>
                            <Typography variant='h6'>
                                {t('PRICE')}
                            </Typography>
                            <Typography variant='body1'>
                                {abstractProductDetails.price}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={6} className={classes.containerProduct}>
                        <Grid item xs={12} sm={12} className={classes.containerProductItem}>
                            <Typography variant='h6'>
                                {t('PRODUCT_TYPE')}
                            </Typography>
                            <Typography variant='body1'>
                                {abstractProductDetails.productType && abstractProductDetails.productType.name}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} className={classes.containerProduct}>
                        <Grid item xs={12} sm={6} className={classes.containerProductItem}>
                            <Grid item xl={12} lg={12}>
                                <Typography variant='h6'>
                                    {t('ATTRIBUTES')}
                                </Typography>
                            </Grid>
                            {renderAttributes()}
                        </Grid>
                        <Grid item sm={12} xs={12} xl={12} lg={12} className={classes.containerProductItem}>
                            <Typography variant='h6'>
                                {t('PRODUCTS')}
                            </Typography>
                            <List>
                                {renderProducts()}
                            </List>
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
                            size="small">
                            <DeleteIcon/>
                        </Fab>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

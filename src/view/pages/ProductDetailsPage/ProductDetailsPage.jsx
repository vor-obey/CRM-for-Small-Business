import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Paper, Typography, Container, Grid, makeStyles, Fab, ListItem, ListItemText, ListItemIcon} from "@material-ui/core";
import {useParams} from "react-router-dom";
import {
    closeDialog,
    renderDialog,
    setIsLoading,
    setSnackBarStatus
} from '../../../data/store/auxiliary/auxiliaryActions';
import {ProductService} from '../../../services';
import isEmpty from 'lodash/isEmpty';
import {useTranslation} from 'react-i18next';
import {useProductDetailsById} from '../../../utils/hooks/productHooks';
import {productDetailsPageStyles} from "./ProductDetailsPage.Style";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from "@material-ui/icons/Edit";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';

const useStyles = makeStyles(productDetailsPageStyles);

export const ProductDetailsPage = ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {id} = useParams();
    const [productDetails] = useProductDetailsById(id);
    const {t} = useTranslation('');

    const deleteProduct = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            const response = await ProductService.delete(id);
            if (response.success) {
                dispatch(setIsLoading(false));
                dispatch(closeDialog());
                history.push('/products');
            } else {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        }
    }, [id, history, dispatch]);

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
            onActionHandler: () => deleteProduct(),
        }));
    }, [productDetails, dispatch, deleteProduct, t]);

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
                        <Grid item xs={12} sm={12} className={classes.containerProductItem}>
                            <Typography variant='h6'>
                                {t('PRODUCT_CATEGORY')}
                            </Typography>
                            <ListItem
                                onClick={() => history.push(`/abstract-products/${productDetails.abstractProduct && productDetails.abstractProduct.abstractProductId}`)}
                                className={classes.productNavigation}>
                                <ListItemIcon
                                className={classes.productNavigationIcon}
                                ><AssignmentOutlinedIcon/></ListItemIcon>
                                <ListItemText
                                    primary={productDetails.abstractProduct && productDetails.abstractProduct.name}
                                />
                            </ListItem>
                        </Grid>
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
                            onClick={() => history.push(`/products/${id}/edit`)}
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

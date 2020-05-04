import React, {useCallback} from 'react';
import {useParams} from 'react-router-dom';
import {useProductTypeById} from '../../../utils/hooks/productHooks';
import {
    ListItemText,
    Container,
    Paper,
    Grid,
    Typography,
    List,
    ListItemIcon,
    ListItem,
    Divider,
    Fab,
    makeStyles
} from '@material-ui/core';
import {productTypeDetailsPageStyles} from "./ProductTypeDetailsPage.style";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import isEmpty from 'lodash/isEmpty';
import {useTranslation} from "react-i18next";
import {
    closeDialog,
    renderDialog,
    setIsLoading,
    setSnackBarStatus
} from '../../../data/store/auxiliary/auxiliaryActions';
import {ProductTypeService} from '../../../services';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';
import {useLastLocation} from 'react-router-last-location';
import {useDispatch} from 'react-redux';

const useStyles = makeStyles(productTypeDetailsPageStyles);

export const ProductTypeDetailsPage = ({history}) => {
    const classes = useStyles();
    const {id} = useParams();
    const [productType] = useProductTypeById(id);
    const {t} = useTranslation();
    const lastLocation = useLastLocation();
    const dispatch = useDispatch();

    const renderAbstractProducts = useCallback(() => {
        const {abstractProducts = {}} = productType;

        if (isEmpty(abstractProducts)) {
            return null;
        }

        return abstractProducts.map((abstractProduct) => {
            const {abstractProductId, name, price, description} = abstractProduct;
            return (
                <Grid container item xs={12} sm={6} className={classes.containerType} key={abstractProductId}>
                    <Grid item sm={12} xs={12} xl={12} lg={12} className={classes.containerTypeItem}>
                        <Typography variant='h6'>
                            {t('PRODUCT_CATEGORY')}
                        </Typography>
                    </Grid>
                    <Grid item sm={12} xs={12} xl={12} lg={12}>
                        <List>
                            <ListItem className={classes.abstractProducts}>
                                <ListItemText
                                    primary={name}
                                    secondary={`${description}, ${price}`}
                                />
                            </ListItem>
                            <Divider/>
                        </List>
                    </Grid>
                </Grid>
            );
        });
    }, [t, productType, classes]);

    const renderAttributes = useCallback(() => {
        const {productTypeToAttributes = {}} = productType;
        if (isEmpty(productTypeToAttributes)) {
            return null;
        }

        return productTypeToAttributes.map(({attribute}) => {
            const {attributeId, name, attributeValues} = attribute;
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
                                                key={attrValue.attributeValueId}
                                            >
                                                {attrValue.value}
                                            </Typography>
                                        )
                                    )}
                                </React.Fragment>
                            }/>
                    </ListItem>
                    < Divider/>
                </React.Fragment>
            );
        });
    }, [productType, classes]);

    const deleteProductType = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            const response = await ProductTypeService.delete(id);
            if (response.success) {
                history.push(`${lastLocation ? lastLocation.pathname : '/product-types'}`);
            } else {
                dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
            }
        } catch (e) {
            dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
        } finally {
            dispatch(setIsLoading(false));
            dispatch(closeDialog());
        }
    }, [dispatch, history, id, lastLocation]);

    const openDeleteProductTypeDialog = useCallback(() => {
        dispatch(renderDialog({
            title: 'delete product type',
            isShow: true,
            onCloseHandler: () => dispatch(closeDialog()),
            closeText: 'DISAGREE',
            actionText: 'AGREE',
            onActionHandler: () => deleteProductType(),
            children: 'delete product type'
        }));
    }, [dispatch, deleteProductType]);

    return (
        <Container maxWidth='md' className={classes.root}>
            <Paper className={classes.container}>
                <Grid container item xl={12} lg={12}>
                    <Grid item className={classes.containerTitle}>
                        <Typography variant='h5'>
                            {t('PRODUCT_TYPE_DETAILS')}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12} sm={6} className={classes.containerType}>
                    <Grid item sm={12} xs={12} xl={12} lg={12} className={classes.containerTypeItem}>
                        <Typography variant='h6'>
                            {t('PRODUCT_NAME')}
                        </Typography>
                        <Typography variant='body1'>
                            {productType.name}
                        </Typography>
                    </Grid>
                </Grid>
                {renderAbstractProducts()}
                <Grid container item xs={12} sm={6} className={classes.containerType}>
                    <Grid item sm={12} xs={12} xl={12} lg={12} className={classes.containerTypeItem}>
                        <Typography variant='h6'>
                            {t('ATTRIBUTES')}
                        </Typography>
                    </Grid>
                    {renderAttributes()}
                </Grid>
                <Grid container item xs={12} className={classes.buttonContainer}>
                    <Fab
                        className={classes.buttonFab}
                        color="primary"
                        aria-label="edit"
                        size="small"
                        onClick={() => history.push(`/product-types/${id}/edit`)}
                    >
                        <EditIcon/>
                    </Fab>
                    <Fab
                        className={classes.buttonFab}
                        color="primary"
                        aria-label="delete"
                        size="small"
                        onClick={() => openDeleteProductTypeDialog()}
                    >
                        <DeleteIcon/>
                    </Fab>
                </Grid>
            </Paper>
        </Container>
    );
};

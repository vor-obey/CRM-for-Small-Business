import React, {useCallback} from 'react';
import {
    Typography,
    Grid,
    List,
    ListItem,
    Divider,
} from '@material-ui/core';
import {useTranslation} from "react-i18next";
import {useHistory} from 'react-router-dom';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {EditOrderStatus} from "../../../components/EditOrderStatus/EditOrderStatus";

export const OrderDetails = ({
                                 classes,
                                 orderDetails,
                                 renderShippingAddress,
                                 submit
                             }) => {
    const history = useHistory();
    const {t} = useTranslation('');
    const {orderToProducts, customer, manager, shippingDetails: {shippingMethod, address: {isCustom} = {}} = {}, currency} = orderDetails;
    const calculateTotalPoints = useCallback(() => {
        return `${orderToProducts.reduce((a, {orderProductPrice, amount}) => a + (orderProductPrice * amount), 0)} ${currency}`;
    }, [orderToProducts, currency]);

    const renderProducts = useCallback(() => {
        if (!orderToProducts) {
            return null;
        }

        return (
            <List className={classes.productContainer}>
                {orderToProducts.map(({orderProductId, orderProductPrice, amount, product}) => {
                    const {name, productId} = product;
                    return (
                        <React.Fragment key={orderProductId}>
                            <ListItem>
                                <Grid container className={classes.productList}>
                                    <Grid item xs={12} sm={1} className={classes.productIcon}>
                                        <ShoppingBasketIcon onClick={() => history.push(`/products/${productId}`)}/>
                                    </Grid>
                                    <Grid item xs={12} sm={7} className={classes.productName}>
                                        <Typography
                                            variant='body1'
                                            color='primary'
                                            onClick={() => history.push(`/products/${productId}`)}>
                                            {name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={2} className={classes.productAmountPrice}>
                                        <Typography variant='body1'>
                                            {t('AMOUNT')}: {amount}
                                        </Typography>
                                        <Typography variant='body1'>
                                            {t('PRICE')}: {orderProductPrice} {currency}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={2} className={classes.productSummary}>
                                        <Typography variant='body1'>
                                            {t('SUMMARY')}:
                                        </Typography>
                                        <Typography variant='body1'>
                                            {amount * orderProductPrice} {currency}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Divider/>
                        </React.Fragment>
                    );
                })}
                <ListItem className={classes.productTotalPrice}>
                    <Grid item xs={12} sm={12} className={classes.productSummary}>
                        <Typography variant='body1'>
                            {t('TOTAL')}: {calculateTotalPoints()}
                        </Typography>
                    </Grid>
                </ListItem>
            </List>
        );
    }, [t, classes, orderToProducts, currency, history, calculateTotalPoints]);

    return (
        <Grid container item xs={12} sm={12} className={classes.container}>
            <Grid item xl={12} sm={12} className={classes.containerTitle}>
                <Typography variant='h5'>
                    {t('ORDER_DETAILS')}
                </Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
                <Typography variant='h5'>
                    {t('CART')}
                </Typography>
                {renderProducts()}
            </Grid>
            <Grid container item xs={12} sm={12} className={classes.containerItem}>
                <Grid item xl={12} sm={12}>
                    <Typography variant='h5'>
                        {t('STATUS')}
                    </Typography>
                </Grid>
                <Grid container item xs={12} sm={12} justify={"space-between"} alignItems={"center"} direction={"row"}>
                    <Grid item xs={12} sm={12}>
                        <EditOrderStatus
                            status={orderDetails.status}
                            submit={submit}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xs={12} sm={12}>
                <Grid container item xs={12} sm={6} className={classes.containerItem}>
                    <Grid item xl={12} sm={12}>
                        <Typography variant='h5'>
                            {t('SHIPPING_DETAILS')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        {renderShippingAddress()}
                        <Grid item xs={12} sm={12} className={classes.containerFieldsItem}>
                            <Typography
                                variant='body2'
                                color='textSecondary'>
                                {t('SHIPPING_METHOD')}
                            </Typography>
                            <Typography
                                variant='body1'
                                className={classes.orderItem}>
                                {(shippingMethod && shippingMethod.name) || ''}
                            </Typography>
                        </Grid>

                    </Grid>
                </Grid>
                {isCustom ? null : (
                    <Grid container item xs={12} sm={6} className={classes.containerItem}>
                        <Grid item xl={12} sm={12}>
                            <Typography variant='h5'>
                                {t('CUSTOMER')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Grid item xs={12} sm={12} className={classes.containerFieldsItem}>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'>
                                    {t('USERNAME')}
                                </Typography>
                                <Typography
                                    variant='body1'
                                    className={classes.orderItem}>
                                    {(customer && customer.username) || ''}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.containerFieldsItem}>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'>
                                    {t('FULL_NAME')}
                                </Typography>
                                <Typography
                                    variant='body1'
                                    className={classes.orderItem}>
                                    {(customer && customer.name) || ''}
                                </Typography>
                            </Grid>
                            {!(customer && customer.contactNumber) ? null : (
                                <Grid item xs={12} sm={12} className={classes.containerFieldsItem}>
                                    <Typography
                                        variant='body2'
                                        color='textSecondary'>
                                        {t('NUMBER')}
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        className={classes.orderItem}>
                                        {customer.contactNumber}
                                    </Typography>
                                </Grid>
                            )}
                            {!(customer && customer.contactEmail) ? null : (
                                <Grid item xs={12} sm={12} className={classes.containerFieldsItem}>
                                    <Typography
                                        variant='body2'
                                        color='textSecondary'>
                                        {t('EMAIL')}
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        className={classes.orderItem}>
                                        {customer.contactEmail}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                )}
                <Grid container item xs={12} sm={6} className={classes.containerItem}>
                    <Grid item xl={12} sm={12}>
                        <Typography variant='h5'>
                            {t('MANAGER')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Grid item xs={12} sm={12} className={classes.containerFieldsItem}>
                            <Typography
                                variant='body2'
                                color='textSecondary'>
                                {t('NAME')}
                            </Typography>
                            <Typography
                                variant='body1'
                                className={classes.orderItem}>
                                {(manager && `${manager.firstName} ${manager.middleName} ${manager.lastName}`) || ''}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

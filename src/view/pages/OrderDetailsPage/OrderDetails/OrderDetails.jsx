import React, {useCallback} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {TextField} from '@material-ui/core';
import {EOrderStatus} from '../../../../constants/statuses';
import {useTranslation} from "react-i18next";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {useHistory} from 'react-router-dom';

export const OrderDetails = ({
                                 classes,
                                 orderDetails,
                                 renderShippingAddress
                             }) => {
    const history = useHistory();
    const {t} = useTranslation('');
    const {orderToProducts, customer, manager, shippingDetails: {shippingMethod, address: {isCustom} = {}} = {}, currency, status} = orderDetails;

    const calculateTotalPoints = useCallback(() => {
        return `${orderToProducts.reduce((a, {orderProductPrice, amount}) => a + (orderProductPrice * amount), 0)} ${currency}`;
    }, [orderToProducts, currency]);

    const renderProducts = useCallback(() => {
        if (!orderToProducts) {
            return null;
        }

        return (
            <List>
                {orderToProducts.map(({orderProductId, orderProductPrice, amount, product}) => {
                    const {name, productId} = product;
                    return (
                        <ListItem key={orderProductId}>
                            <Grid container>
                                <Grid item xl={12} lg={12}>
                                    <Typography variant='body1' style={{cursor: 'pointer'}}
                                                onClick={() => history.push(`/products/${productId}`)}>
                                        {name}
                                    </Typography>
                                </Grid>
                                <Grid item xl={4} lg={4}>
                                    <Typography variant='body1'>
                                        Price: {orderProductPrice} {currency}
                                    </Typography>
                                </Grid>
                                <Grid item xl={4} lg={4}>
                                    <Typography variant='body1'>
                                        Amount: {amount}
                                    </Typography>
                                </Grid>
                                <Grid item xl={4} lg={4}>
                                    <Typography variant='body1'>
                                        Summary: {amount * orderProductPrice} {currency}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                    );
                })}
                <ListItem>
                    <Typography variant='body1'>
                        Total: {calculateTotalPoints()}
                    </Typography>
                </ListItem>
            </List>
        );

    }, [orderToProducts, currency, history, calculateTotalPoints]);

    return (
        <Grid container>
            <Grid container item xl={6} lg={6} md={6} sm={6} xs={12} className={classes.wrapper}>
                <Typography variant='h5'>{t('ORDER')}</Typography>
                <Grid container item>
                    <Grid item xl={12} lg={12} md={10} sm={10} xs={12} className={classes.orderDescription}>
                        {renderProducts()}
                    </Grid>
                    {renderShippingAddress()}
                    <Grid item xs={12}>
                        <TextField
                            label={t('SHIPPING_METHOD')}
                            margin="normal"
                            name="shippingMethod"
                            type="text"
                            value={(shippingMethod && shippingMethod.name) || ''}
                            inputProps={{
                                readOnly: true
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <TextField
                            label={t('STATUS')}
                            margin="normal"
                            name="status"
                            type="text"
                            value={t(EOrderStatus[status]) || ''}
                            inputProps={{
                                readOnly: true
                            }}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xl={6} lg={6} md={6} sm={6} xs={12} className={classes.wrapper}>
                <Typography variant='h5'>{t('CUSTOMER')}</Typography>
                <Grid container item className={isCustom ? null : classes.customerGrid}>
                    <Grid item xs={12}>
                        <TextField
                            label={t('USERNAME')}
                            margin="normal"
                            name="username"
                            type="text"
                            value={(customer && customer.username) || ''}
                            inputProps={{
                                readOnly: true
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={t('FULL_NAME')}
                            margin="normal"
                            name="name"
                            type="text"
                            value={(customer && customer.name) || ''}
                            inputProps={{
                                readOnly: true
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={t('NUMBER')}
                            margin="normal"
                            name="contactNumber"
                            type="text"
                            value={(customer && customer.contactNumber) || ''}
                            inputProps={{
                                readOnly: true
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={t('EMAIL')}
                            margin="normal"
                            name="contactEmail"
                            type="text"
                            value={(customer && customer.contactEmail) || ''}
                            inputProps={{
                                readOnly: true
                            }}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xl={6} lg={6} md={6} sm={6} xs={12} className={classes.managerGrid}>
                <Grid container item xs={12}>
                    <Grid item xs={12}>
                        <Typography variant='h5'>{t('MANAGER')}</Typography>
                    </Grid>
                    <Grid item xl={12} lg={12} xs={12} className={classes.inputManager}>
                        <TextField
                            label={t('NAME')}
                            margin="normal"
                            name="name"
                            type="text"
                            value={(manager && `${manager.firstName} ${manager.middleName} ${manager.lastName}`) || ''}
                            inputProps={{
                                readOnly: true
                            }}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

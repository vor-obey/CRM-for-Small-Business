import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {TextField} from '@material-ui/core';
import React from 'react';
import {EOrderStatus} from '../../../../constants/statuses';

export const OrderDetails = ({
                                 classes,
                                 orderDetails,
                                 renderShippingAddress
                             }) => {
    const {customer, manager, shippingDetails: {shippingMethod} = {}, ...order} = orderDetails;
    return (
        <Grid container>
            <Grid container item xl={6} lg={6} md={6} sm={6} xs={12} className={classes.wrapper}>
                <Typography variant='h5'>Order</Typography>
                <Grid container item className={classes.orderContainer}>
                    <Grid item xl={10} xs={12} className={classes.orderDescription}>
                        <TextField
                            label="Description"
                            margin="normal"
                            name="description"
                            type="text"
                            value={order.description || ''}
                            inputProps={{
                                readOnly: true
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xl={2} xs={12} className={classes.orderCurrency}>
                        <TextField
                            label="Currency"
                            margin="normal"
                            name="currency"
                            type="text"
                            value={order.currency || ''}
                            inputProps={{
                                readOnly: true
                            }}
                            fullWidth
                        />
                    </Grid>
                    {renderShippingAddress()}
                    <Grid item xs={12}>
                        <TextField
                            label="Shipping Method"
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
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.orderStatus}>
                        <TextField
                            label="Status"
                            margin="normal"
                            name="status"
                            type="text"
                            value={EOrderStatus[order.status] || ''}
                            inputProps={{
                                readOnly: true
                            }}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xl={6} lg={6} md={6} sm={6} xs={12} className={classes.customerContainer}>
                <Typography variant='h5'>Customer</Typography>
                <Grid container item>
                    <Grid item xs={12}>
                        <TextField
                            label="Username"
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
                            label="Name"
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
                            label="Contact Number"
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
                            label="Contact Email"
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
            <Grid container item xl={6} lg={6} md={6} sm={12} xs={12} className={classes.managerContainer}>
                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.managerRender}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.managerHeading}>
                        <Typography variant='h5'>Manager</Typography>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <TextField
                            label="Name"
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
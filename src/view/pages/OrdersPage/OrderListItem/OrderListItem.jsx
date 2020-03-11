import React, {useEffect, useState} from 'react';

import {
    Grid,
    ListItem,
} from "@material-ui/core";

import ListItemText from "@material-ui/core/ListItemText";

export const OrderListItem = (props) => {

    const {
        order,
        classes,
        minWidth350,
        navigationToOrderDetails
    } = props;

    const [status, setStatus] = useState('');

    useEffect(() => {
        // eslint-disable-next-line default-case
        switch (order.status) {
            case 0: setStatus('New'); break;
            case 1: setStatus('In Progress'); break;
            case 2: setStatus('Ready For Shipping'); break;
            case 3: setStatus('Shipping'); break;
            case 4: setStatus('Completed'); break;
            case 5: setStatus('Cancelled'); break;
        }
    }, [order.status]);
    return (
        <ListItem key={order.orderId} disableGutters divider button
                  onClick={() => navigationToOrderDetails(order.orderId)}>
            <Grid container>
                <Grid item xs={5} className={classes.orderGrid}>
                    <ListItemText primary={order.description} secondary={order.currency}/>
                </Grid>
                <Grid item xs={5} className={classes.customerGrid}>
                    <ListItemText primary={order.customer.name} secondary={minWidth350 && order.customer.contactEmail}/>
                </Grid>
                <Grid item xs={2} className={classes.statusGrid}>
                    <ListItemText>{status}</ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    )
};

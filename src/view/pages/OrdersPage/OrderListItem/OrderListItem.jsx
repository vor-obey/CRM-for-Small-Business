import React from 'react';
import {
    Grid,
    ListItem,
} from "@material-ui/core";

import ListItemText from "@material-ui/core/ListItemText";

const EStatus = {
    0: 'New',
    1: 'In Progress',
    2: 'Ready For Shipping',
    3: 'Shipping',
    4: 'Completed',
    5: 'Cancelled'
};

export const OrderListItem = ({
                                  order,
                                  classes,
                                  minWidth350,
                                  navigationToOrderDetails
                              }) => {
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
                    <ListItemText>{EStatus[order.status]}</ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    )
};

import React from 'react';
import {
    Grid,
    ListItem,
} from "@material-ui/core";

import ListItemText from "@material-ui/core/ListItemText";
import {EOrderStatus} from '../../../../constants/statuses';
import {useTranslation} from 'react-i18next';

export const OrderListItem = ({
                                  order,
                                  classes,
                                  minWidth350,
                                  navigationToOrderDetails
                              }) => {
    const {t} = useTranslation();
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
                    <ListItemText>{t(EOrderStatus[order.status])}</ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    )
};

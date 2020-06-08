import React, {useCallback} from 'react';

import {
    Grid,
    ListItem,
    Typography,
} from "@material-ui/core";

import {useTranslation} from 'react-i18next';
import ListItemText from "@material-ui/core/ListItemText";
import {EOrderStatus} from '../../../../constants/statuses';
import moment from "moment";

export const OrderListItem = ({
                                  order,
                                  classes,
                                  minWidth600,
                                  navigationToOrderDetails,
                                  selectedCustomer
                              }) => {
    const {t} = useTranslation();

    const calculateTotalPoints = useCallback(() => {
        return `${order.orderToProducts.reduce((a, {orderProductPrice, amount}) => a + (orderProductPrice * amount), 0)} ${order.currency}`;
    }, [order]);

    const displayProduct = useCallback(() => {
        if (order.orderToProducts.length > 0) {
            return order.orderToProducts[0].product.name;
        } else if (!order.orderToProducts[0] && order.description.length) {
            return order.description;
        } else {
            return 'deleted product';
        }
    }, [order]);

    return (
        <ListItem key={order.orderId} disableGutters divider button
                  onClick={() => navigationToOrderDetails(order.orderId)}>
            <Grid container>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={12} className={classes.gridList}>
                    <Typography className={classes.textList}>
                        {t('ORDER_NUMBER')}:
                    </Typography>
                    <ListItemText primary={order.orderNum}/>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={12} className={classes.gridList}>
                    <Typography className={classes.textList}>
                        {t('DESCRIPTION')}:
                    </Typography>
                    <ListItemText primary={displayProduct()}/>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={3} xs={12} className={classes.grid}>
                    <ListItemText primary={order.customer.name}
                                  secondary={minWidth600 && order.customer.contactEmail}
                                  className={classes.textCustomer}/>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={12} className={classes.gridList}>
                    <Typography className={classes.textList}>
                        {t('CUSTOMER')}:
                    </Typography>
                    {minWidth600 === true ? t(EOrderStatus[order.status]) : <ListItemText primary={order.customer.name}
                                                                                          secondary={minWidth600 && order.customer.contactEmail}/>}
                </Grid>

                <Grid item xl={2} lg={2} md={2} sm={2} xs={12} className={classes.gridList}>
                    <Typography className={classes.textList}>
                        {t('STATUS')}:
                    </Typography>
                    <ListItemText>
                        {minWidth600 === true ? calculateTotalPoints() : t(EOrderStatus[order.status])}
                    </ListItemText>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={1} xs={12} className={classes.gridList}>
                    <Typography className={classes.textList}>
                        {t('DATE')}:
                    </Typography>
                    <ListItemText primary={moment(order.orderedAt).format('DD.MM.YY')}/>
                </Grid>
                {selectedCustomer ? null : <Grid item xs={12} className={classes.totalGrid}>
                    <Typography className={classes.textList}>
                        {t('TOTAL')}:
                    </Typography>
                    <ListItemText>
                        {calculateTotalPoints()}
                    </ListItemText>
                </Grid>
                }
            </Grid>
        </ListItem>
    )
};

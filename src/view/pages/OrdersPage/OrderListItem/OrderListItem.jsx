import React, {useCallback} from 'react';

import {
    Grid,
    ListItem,
    Typography,
} from "@material-ui/core";

import {useTranslation} from 'react-i18next';
import ListItemText from "@material-ui/core/ListItemText";
import {EOrderStatus} from '../../../../constants/statuses';

export const OrderListItem = ({
                                  order,
                                  classes,
                                  minWidth600,
                                  navigationToOrderDetails
                              }) => {
    const {t} = useTranslation();

    const calculateTotalPoints = useCallback(() => {
        return `${order.orderToProducts.reduce((a, {orderProductPrice, amount}) => a + (orderProductPrice * amount), 0)} ${order.currency}`;
    }, [order]);

    return (
        <ListItem key={order.orderId} disableGutters divider button
                  onClick={() => navigationToOrderDetails(order.orderId)}>
            <Grid container>
                <Grid item xl={4} lg={4} md={4} sm={3} xs={12} className={classes.gridList}>
                    <Typography className={classes.textList}>
                        {t('DESCRIPTION')}:
                    </Typography>
                    <ListItemText primary={order.orderToProducts[0].product.name}
                                  secondary={minWidth600 && order.currency}/>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={4} xs={12} className={classes.grid}>
                    <ListItemText primary={order.customer.name} secondary={minWidth600 && order.customer.contactEmail}/>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={3} xs={12} className={classes.gridList}>
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
                <Grid item xs={12} className={classes.totalGrid}>
                    <Typography className={classes.textList}>
                        {t('TOTAL')}:
                    </Typography>
                    <ListItemText>
                        {calculateTotalPoints()}
                    </ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    )
};

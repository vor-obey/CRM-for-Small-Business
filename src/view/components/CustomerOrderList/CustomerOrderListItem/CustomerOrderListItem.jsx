import React, {useCallback} from 'react';

import {Grid, ListItem, Typography} from "@material-ui/core";

import {useTranslation} from 'react-i18next';
import ListItemText from "@material-ui/core/ListItemText";
import {EOrderStatus} from '../../../../constants/statuses';
import moment from "moment";

export const CustomerOrderListItem = ({
                                          order,
                                          classes,
                                          minWidth1150,
                                          navigationToOrderDetails,
                                      }) => {
    const {t} = useTranslation();
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
        <ListItem key={order.orderId} divider onClick={() => navigationToOrderDetails(order.orderId)}>
            <Grid container className={classes.flexContainer}>
                <Grid item xl={3} lg={3} md={3} sm={3} className={classes.gridList}>
                    <Typography className={!minWidth1150 ? classes.textList : classes.hide}>
                        {t('ORDER_NUMBER')}:
                    </Typography>
                    <ListItemText primary={order.orderNum}/>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} className={classes.gridList}>
                    <Typography className={!minWidth1150 ? classes.textList : classes.hide}>
                        {t('DESCRIPTION')}:
                    </Typography>
                    <Typography style={{overflow: 'hidden', marginRight: '10px',}}>{displayProduct()}</Typography>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={3} className={classes.gridList}>
                    <Typography className={!minWidth1150 ? classes.textList : classes.hide}>
                        {t('STATUS')}:
                    </Typography>
                    <ListItemText>
                        {t(EOrderStatus[order.status])}
                    </ListItemText>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} className={classes.gridList}>
                    <Typography className={!minWidth1150 ? classes.textList : classes.hide}>
                        {t('DATE')}:
                    </Typography>
                    <ListItemText primary={moment(order.orderedAt).format('DD.MM.YY')}/>
                </Grid>
            </Grid>
        </ListItem>
    )
};

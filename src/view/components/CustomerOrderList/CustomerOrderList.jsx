import React, {useCallback} from "react";
import {Container, Grid, List, ListItem, Typography, makeStyles, useMediaQuery} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useOrders} from "../../../utils/hooks/orderHooks";
import isEmpty from "lodash/isEmpty";
import {CustomerOrderListItem} from './CustomerOrderListItem/CustomerOrderListItem'
import {customerOrderListStyle} from "./CustomerOrderList.style";

const useStyles = makeStyles(customerOrderListStyle);

export const CustomerOrderList = ({history, selectedСustomerInChat}) => {
    const classes = useStyles();
    const {t} = useTranslation('');
    const minWidth1150 = useMediaQuery('(min-width:1150px)');
    const selectedCustomer = (selectedСustomerInChat && selectedСustomerInChat.username);
    const [orderList] = useOrders();

    const navigationToOrderDetails = useCallback((orderId) => {
        history.push(`/orders/${orderId}`);
    }, [history]);

    const renderRows = useCallback(() => {
        if (isEmpty(orderList)) {
            return null
        }

        return orderList.map((order) => {
            if (order.customer.username === selectedCustomer) {
                return (
                    <CustomerOrderListItem
                        key={order.orderId}
                        order={order}
                        minWidth1150={minWidth1150}
                        classes={classes}
                        navigationToOrderDetails={navigationToOrderDetails}
                    />
                );
            }
            return null
        });
    }, [orderList, minWidth1150, navigationToOrderDetails, classes, selectedCustomer]);

    return (
        <Container className={classes.root}>
            <List>
                <ListItem divider>
                    <Grid container className={classes.gridOrderContainer}>
                        <Grid item xl={3} lg={3} md={3} sm={3}>
                            <Typography>{t('ORDER_NUMBER')}</Typography>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4}>
                            <Typography>{t('DESCRIPTION')}</Typography>
                        </Grid>
                        <Grid item xl={3} lg={3} md={3} sm={3}>
                            <Typography>{t('STATUS')}</Typography>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2}>
                            <Typography>{t('DATE')}</Typography>
                        </Grid>
                    </Grid>
                </ListItem>
                {renderRows()}
            </List>
        </Container>
    )
}
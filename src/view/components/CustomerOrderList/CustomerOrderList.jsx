import React, {useCallback, useEffect, useState} from "react";
import {Container, Grid, List, ListItem, Typography, makeStyles, useMediaQuery, Button} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useOrders} from "../../../utils/hooks/orderHooks";
import isEmpty from "lodash/isEmpty";
import {CustomerOrderListItem} from './CustomerOrderListItem/CustomerOrderListItem'
import {customerOrderListStyle} from "./CustomerOrderList.style";
import {ORDERS} from "../../../constants/routes";

const useStyles = makeStyles(customerOrderListStyle);

export const CustomerOrderList = ({history, selectedCustomerInChat, handleDrawerIcon}) => {
    const classes = useStyles();
    const {t} = useTranslation('');
    const minWidth1150 = useMediaQuery('(min-width:1150px)');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const {orderList, loading} = useOrders();
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        if (!isEmpty(selectedCustomerInChat)) {
            setSelectedCustomer(selectedCustomerInChat.username);
        }
    }, [selectedCustomerInChat]);

    useEffect(() => {
        if (!loading && orderList.length > 0 && selectedCustomer) {
            const filteredArray = orderList.filter((order) => order.customer.username === selectedCustomer);
            setCustomerList(filteredArray);
        }
    }, [loading, orderList, selectedCustomer]);

    const navigationToOrderDetails = useCallback((orderId) => {
        history.push(`${ORDERS}/${orderId}`);
    }, [history]);

    const renderRows = useCallback(() => {
        if (isEmpty(customerList)) {
            return null
        }

        return customerList.map((order) => {
            return (
                <CustomerOrderListItem
                    key={order.orderId}
                    order={order}
                    minWidth1150={minWidth1150}
                    classes={classes}
                    navigationToOrderDetails={navigationToOrderDetails}
                />
            );
        });

    }, [customerList, minWidth1150, navigationToOrderDetails, classes]);

    if (isEmpty(customerList)) {
        return (
            <Grid
                container
                item
                spacing={0}
                className={classes.noContent}
            >
                <Grid container item xs={12} className={classes.noContentInfo} style={{height: '100vh', alignContent: 'center'}}>
                    <Typography variant='h5'
                                style={{paddingBottom: 18, paddingRight: 20,}}>{t('NO_NEW_ORDERS')}</Typography>
                    <Button
                        type='submit'
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        onClick={handleDrawerIcon(1, true)}
                    >
                        {t('CREATE')}
                    </Button>
                </Grid>
            </Grid>
        )
    }

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

import React, {useEffect, useState, useCallback} from "react";
import {OrderListItem} from "./OrderListItem/OrderListItem";
import {ordersPageStyles} from "./OrdersPage.style";
import isEmpty from 'lodash/isEmpty';
import {useTranslation} from "react-i18next";
import {filter} from "../../../utils/helpers";
import {Link, useLocation} from "react-router-dom";
import {InputFilter} from "../../components/Filter/InputFilter";
import {SelectFilter} from "../../components/Filter/SelectFilter";
import {useOrders} from '../../../utils/hooks/orderHooks';
import {
    Button,
    ListItem,
    Typography,
    makeStyles,
    Grid,
    Container,
    List,
    useMediaQuery,
} from "@material-ui/core";

const useStyles = makeStyles(ordersPageStyles);

export const OrdersPage = ({history}) => {
    const classes = useStyles();
    const {t} = useTranslation('');
    const location = useLocation();
    const minWidth600 = useMediaQuery('(min-width:600px)');

    const [orderList,, loading] = useOrders();
    const [inputFilter, setInputFilter] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        if (location.state) {
            const status = location.state.status.toString();
            setSelectedOption(status)
        }
    }, [location]);

    const navigationToOrderDetails = useCallback((orderId) => {
        history.push(`/orders/${orderId}`);
    }, [history]);

    const onFilterChangedHandler = useCallback((event) => {
        const {value} = event.target;
        setInputFilter(value)
    }, []);

    const onSelectHandler = useCallback((event) => {
        const {value} = event.target;
        setSelectedOption(value);
    }, []);

    const filterStatus = useCallback(() => {
        let filteredStatus = filter(orderList, inputFilter, ['customer']);

        if (!selectedOption) {
            return filteredStatus;
        }

        return filter(filteredStatus, selectedOption, null, 'status');
    }, [inputFilter, selectedOption, orderList]);

    const renderSelect = useCallback(() => {
        return (
            <SelectFilter
                classes={classes}
                label={t('SORT_BY_STATUS')}
                value={selectedOption}
                onChange={onSelectHandler}
            />
        )
    }, [classes, t, selectedOption, onSelectHandler]);

    const renderRows = useCallback(() => {
        if (isEmpty(orderList)) {
            return null;
        }
        return filterStatus().map((order) => {
            return (
                <OrderListItem
                    key={order.orderId}
                    order={order}
                    classes={classes}
                    minWidth600={minWidth600}
                    navigationToOrderDetails={navigationToOrderDetails}
                />
            );
        })
    }, [orderList, navigationToOrderDetails, filterStatus, minWidth600, classes]);

    if (isEmpty(orderList) && !loading) {
        return (
            <Grid
                container
                item
                spacing={0}
                className={classes.noContent}
            >
                <Grid container item xs={8} sm={2} className={classes.noContentInfo}>
                    <Typography variant='h5' style={{paddingBottom: 18}}>{t('NO_NEW_ORDERS')}</Typography>
                    <Button
                        type='submit'
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        component={Link}
                        to='/create-order'
                    >
                        {t('CREATE')}
                    </Button>
                </Grid>
            </Grid>
        )
    }

    return (
        <Container className={classes.root}>
            <Grid className={classes.searchBox}>
                <InputFilter
                    classes={classes}
                    value={inputFilter}
                    label={t('FILTER')}
                    onChange={onFilterChangedHandler}
                />
                {renderSelect()}
            </Grid>

            <List>
                <ListItem disableGutters divider>
                    <Grid container className={classes.gridOrderContainer}>
                        <Grid item xl={2} lg={2} md={2} sm={2}>
                            <Typography className={classes.textOrderNumber}>{t('ORDER_NUMBER')}</Typography>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2}>
                            <Typography>{t('DESCRIPTION')}</Typography>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={3}>
                            <Typography>{t('CUSTOMER')}</Typography>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2}>
                            <Typography>{t('STATUS')}</Typography>
                        </Grid>
                        <Grid item xl={2} ld={2} md={2} sm={2}>
                            <Typography>{t('TOTAL')}</Typography>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={1}>
                            <Typography>{t('DATE')}</Typography>
                        </Grid>
                    </Grid>
                </ListItem>
                {renderRows()}
            </List>

        </Container>
    );
};

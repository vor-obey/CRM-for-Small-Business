import React, {useEffect, useState, useCallback} from "react";
import {Container, List, useMediaQuery} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {OrderListItem} from "./OrderListItem/OrderListItem";
import {makeStyles} from "@material-ui/core/styles";
import {ordersPageStyles} from "./OrdersPage.style";
import isEmpty from 'lodash/isEmpty';
import {useTranslation} from "react-i18next";
import {filter} from "../../../utils/helpers";
import {useLocation} from "react-router-dom";
import {InputFilter} from "../../components/Filter/InputFilter";
import {SelectFilter} from "../../components/Filter/SelectFilter";
import {useOrders} from '../../../utils/customHooks';

const useStyles = makeStyles(ordersPageStyles);

export const OrdersPage = ({history}) => {
    const classes = useStyles();
    const {t} = useTranslation('');
    const location = useLocation();
    const minWidth600 = useMediaQuery('(min-width:600px)');

    const orderList = useOrders();
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

    const filterStatus= useCallback(() => {
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
    }, [orderList, navigationToOrderDetails, filterStatus,  minWidth600, classes]);

    return (
        <Container className={classes.root}>
            <Grid className={classes.searchBox}>
                <InputFilter
                    className={classes.search}
                    value={inputFilter}
                    label={t('FILTER')}
                    onChange={onFilterChangedHandler}
                />
                {renderSelect()}
            </Grid>

            <List>
                <ListItem disableGutters divider>
                    <Grid container className={classes.gridOrderContainer}>
                        <Grid item xl={5} lg={5} md={5} sm={4} >
                            <Typography>{t('DESCRIPTION')}</Typography>
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} >
                            <Typography>{t('CUSTOMER')}</Typography>
                        </Grid>
                        <Grid item xl={2} ld={2} md={2} sm={3} >
                            <Typography>{t('STATUS')}</Typography>
                        </Grid>
                    </Grid>
                </ListItem>
                {renderRows()}
            </List>
        </Container>
    );
};

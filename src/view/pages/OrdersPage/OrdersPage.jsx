import React, {useEffect, useState, useCallback} from "react";
import {Container, List, useMediaQuery} from "@material-ui/core";
import {useDispatch} from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {OrderListItem} from "./OrderListItem/OrderListItem";
import {makeStyles} from "@material-ui/core/styles";
import {OrderService} from "../../../services/index";
import {ordersPageStyles} from "./OrdersPage.style";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";
import isEmpty from 'lodash/isEmpty';
import {useTranslation} from "react-i18next";
import {filter} from "../../../utils/helpers";
import {FilterInput} from "../../components/Filter/FilterInput/FilterInput";
import {ListSelector} from "../../components/ListSelector/ListSelector";
import {useLocation} from "react-router-dom";

const useStyles = makeStyles(ordersPageStyles);

export const OrdersPage = ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {t} = useTranslation('');
    const location = useLocation();
    const minWidth350 = useMediaQuery('(min-width:350px)');

    const [orderList, setOrderList] = useState([]);
    const [inputFilter, setInputFilter] = useState('');
    const [select, setSelect] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                dispatch(setIsLoading(true));
                const response = await OrderService.list();
                setOrderList(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
            }
        };
        fetchOrders();
    }, [dispatch]);

    useEffect(() => {
        if (location.state) {
            const status = location.state.status;
            setSelect(status.toString())
        }
    }, [location]);

    const navigationToOrderDetails = useCallback((orderId) => {
        history.push(`/orders/${orderId}`);
    }, [history]);

    const onChangeHandler = useCallback((event) => {
        const {value} = event.target;
        setInputFilter(value)
    }, []);

    const onChangeSelect = useCallback((event) => {
        const {value} = event.target;
        setSelect(value);
    }, []);

    const filterStatus = useCallback(() => {
        let filteredStatus = filter(orderList, inputFilter, ['customer']);

        if (!select) {
            return filteredStatus;
        }

        return filter(filteredStatus, select, null, 'status');
    }, [inputFilter, select, orderList]);

    const renderSelect = useCallback(() => {
        return (
            <ListSelector
                classes={classes}
                label={t('SORT_BY_STATUS')}
                value={select}
                statuses={true}
                onChange={onChangeSelect}
            />
        )
    }, [classes, t, select, onChangeSelect]);

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
                    minWidth350={minWidth350}
                    navigationToOrderDetails={navigationToOrderDetails}
                />
            );
        })
    }, [orderList, navigationToOrderDetails, filterStatus, minWidth350, classes]);

    return (
        <Container className={classes.root}>
            <Grid className={classes.searchBox}>
                <FilterInput
                    className={classes.search}
                    value={inputFilter}
                    label={t('FILTER')}
                    onChange={onChangeHandler}
                />
               {renderSelect()}
            </Grid>

            <List>
                <ListItem disableGutters divider>
                    <Grid container>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={4}>
                            <Typography>{t('DESCRIPTION')}</Typography>
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                            <Typography>{t('CUSTOMER')}</Typography>
                        </Grid>
                        <Grid item xl={2} ld={2} md={2} sm={2} xs={2} className={classes.textStatus}>
                            <Typography>{t('STATUS')}</Typography>
                        </Grid>
                    </Grid>
                </ListItem>
                {renderRows()}
            </List>
        </Container>
    );
};

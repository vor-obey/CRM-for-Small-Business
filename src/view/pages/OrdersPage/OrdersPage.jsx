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

const useStyles = makeStyles(ordersPageStyles);

export const OrdersPage = ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {t} = useTranslation('');

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

    const filterStatus= useCallback(() => {
        let filteredStatus = filter(orderList, inputFilter);

        if (!select) {
            return filteredStatus;
        }

        return filter(filteredStatus, select, ['customer']);
    }, [inputFilter, select, orderList]);

    const renderSelect = useCallback(() => {
        return (
            <ListSelector
                        classes={classes}
                        label={t('SORT_BY_STATUS')}
                        value={select}
                        onChange={onChangeSelect}
                    />
        )
    }, [orderList, classes, t, select, onChangeSelect]);

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
    }, [orderList, navigationToOrderDetails, filterStatus,  minWidth350, classes]);

    return (
        <Container className={classes.root}>
            <Grid className={classes.searchBox}>
                <FilterInput
                    className={classes.search}
                    value={inputFilter}
                    label={t('FILTER')}
                    onChange={onChangeHandler}
                />
                {orderList ? renderSelect() : null}
            </Grid>

            <List>
                <ListItem disableGutters divider>
                    <Grid container>
                        <Grid item xs={5}>
                            <Typography>{t('DESCRIPTION')}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography>{t('CUSTOMER')}</Typography>
                        </Grid>
                        <Grid item xs={2} className={classes.textStatus}>
                            <Typography>{t('STATUS')}</Typography>
                        </Grid>
                    </Grid>
                </ListItem>
                {renderRows()}
            </List>
        </Container>
    );
};

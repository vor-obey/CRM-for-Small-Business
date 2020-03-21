import React, {useCallback, useEffect, useState} from "react";

import {
    Card,
    Grid,
    Container,
    CardHeader,
    makeStyles,
    Typography,
    CardActionArea,
    CardContent,
} from "@material-ui/core";

import {HomeStyles} from "./Home.style";
import {Graph} from '../../components/Graph/Graph'
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {OrderService} from "../../../services";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";

const useStyles = makeStyles(HomeStyles);

export const Home = ({history}) => {
        const [orderArray, setOrderArray] = useState([]);

        const classes = useStyles();
        const dispatch = useDispatch();
        const {t} = useTranslation('');

        useEffect(() => {
            const fetchOrders = async () => {
                try {
                    dispatch(setIsLoading(true));
                    const response = await OrderService.list();
                    setOrderArray(response);
                    dispatch(setIsLoading(false));
                } catch (e) {
                    dispatch(setIsLoading(false));
                    dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
                }
            };
            fetchOrders();
        }, [dispatch]);

        const filterStatusOrderArr = useCallback((status) => {
            const statusOrder = orderArray.filter(order => order.status === status);
            return <div>{statusOrder.length}</div>;
        }, [orderArray]);

        const redirectToOrder = useCallback((status) => {
            history.push({
                pathname: '/orders',
                state: {
                    status: status,
                }
            })
        }, [history]);


        return (
            <Container className={classes.container}>
                <Grid container className={classes.root}>
                    <Grid item xl={5} lg={5} md={5} sm={6} xs={6} className={classes.grid}>
                        <Card className={classes.card}>
                            <CardActionArea onClick={() => redirectToOrder(0)} className={classes.cardAction}>
                                <CardContent>
                                    <Typography variant='h5' className={classes.typography}>
                                        {t('NEW_ORDERS')}
                                    </Typography>
                                    <Typography variant='h4'>
                                        {filterStatusOrderArr(0)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xl={5} lg={5} md={5} sm={6} xs={6} className={classes.grid}>
                        <Card className={classes.card}>
                            <CardActionArea onClick={() => redirectToOrder(1)} className={classes.cardAction}>
                                <CardContent>
                                    <Typography variant='h5' className={classes.typography}>
                                        {t('IN_PROGRESS')}
                                    </Typography>
                                    <Typography variant='h4'>
                                        {filterStatusOrderArr(1)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} sm={6} xs={6} className={classes.grid}>
                        <Card className={classes.card}>
                            <CardActionArea onClick={() => redirectToOrder(2)} className={classes.cardAction}>
                                <CardContent>
                                    <Typography variant='h5' className={classes.typography}>
                                        {t('READY_TO_SHIPPING')}
                                    </Typography>
                                    <Typography variant='h4'>
                                        {filterStatusOrderArr(2)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item lg={5} md={5} sm={6} xs={6} className={classes.gridChat}>
                        <Card className={classes.chat}>
                            <CardHeader
                                title={t('CHAT')}
                                className={classes.header}
                            />
                            <CardContent>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} className={classes.gridGraph}>
                        <Card className={classes.graph}>
                            <CardHeader
                                title={t('STATISTIC')}
                                className={classes.header}
                            />
                            <CardContent>
                                <Graph/>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        );
    }
;


import React, {useCallback} from "react";

import {
    Card,
    Grid,
    Container,
    CardHeader,
    makeStyles,
    Typography,
    CardActionArea,
    CardContent, Hidden,
} from "@material-ui/core";

import {HomeStyles} from "./Home.style";
import {Graph} from '../../components/Graph/Graph'
import {useTranslation} from "react-i18next";
import {useOrders} from '../../../utils/customHooks';
import {Chat} from '../../components/Chat/Chat';
import {useDispatch} from 'react-redux';
import {openChatWidget} from '../../../data/store/user/userActions';

const useStyles = makeStyles(HomeStyles);

export const Home = ({history}) => {
    const classes = useStyles();
    const {t} = useTranslation('');
    const orders = useOrders();
    const dispatch = useDispatch();

    const renderOrdersCountByStatus = useCallback((status) => {
        const filtered = orders.filter(order => order.status === status);
        return <div>{filtered.length}</div>;
    }, [orders]);

    const navigateToOrdersPage = useCallback((status) => {
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
                <Grid item xl={1} lg={1} implementation='css' component={Hidden}/>
                <Grid item xl={3} lg={3} md={5} sm={6} xs={6} className={classes.grid}>
                    <Card className={classes.card}>
                        <CardActionArea onClick={() => navigateToOrdersPage(0)} className={classes.cardAction}>
                            <CardContent>
                                <Typography variant='h5' className={classes.typography}>
                                    {t('NEW_ORDERS').toUpperCase()}
                                </Typography>
                                <Typography variant='h4'>
                                    {renderOrdersCountByStatus(0)}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xl={3} lg={3} md={5} sm={6} xs={6} className={classes.grid}>
                    <Card className={classes.card}>
                        <CardActionArea onClick={() => navigateToOrdersPage(1)} className={classes.cardAction}>
                            <CardContent>
                                <Typography variant='h5' className={classes.typography}>
                                    {t('IN_PROGRESS').toUpperCase()}
                                </Typography>
                                <Typography variant='h4'>
                                    {renderOrdersCountByStatus(1)}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xl={3} lg={3} md={2} sm={6} xs={6} className={classes.grid}>
                    <Card className={classes.card}>
                        <CardActionArea onClick={() => navigateToOrdersPage(2)} className={classes.cardAction}>
                            <CardContent>
                                <Typography variant='h5' className={classes.typography}>
                                    {t('READY_FOR_SHIPPING').toUpperCase()}
                                </Typography>
                                <Typography variant='h4'>
                                    {renderOrdersCountByStatus(2)}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xl={1} lg={1} implementation='css' component={Hidden}/>
                <Grid item xl={1} lg={1} implementation='css' component={Hidden}/>
                <Grid item xl={3} lg={3} md={5} sm={6} xs={6} className={classes.grid} style={{height: '100%'}}>
                    <Card className={classes.chatCard}>
                        <CardHeader
                            title={t('CHAT')}
                            className={classes.header}
                            style={{
                                cursor: 'pointer'
                            }}
                            onClick={() => dispatch(openChatWidget())}
                        />
                        <CardContent style={{
                            padding: 0,
                            minHeight: 344,
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Chat
                                style={{
                                    padding: 0,
                                    maxHeight: 343,
                                    overflow: 'auto',
                                    height: '100%'
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={7} md={7} sm={12} xs={12} className={classes.grid}>
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
};


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
import {useOrders} from '../../../utils/hooks/orderHooks';
import {useDispatch} from 'react-redux';
import {openChatWidget} from '../../../data/store/chat/chatActions';
import {ORDERS} from "../../../constants/routes";

const useStyles = makeStyles(HomeStyles);

export const Home = ({history}) => {
    const classes = useStyles();
    const {t} = useTranslation('');
    const {orderList} = useOrders();
    const dispatch = useDispatch();

    const renderOrdersCountByStatus = useCallback((status) => {
        const filtered = orderList.filter(order => order.status === status);
        return <div>{filtered.length}</div>;
    }, [orderList]);

    const navigateToOrdersPage = useCallback((status) => {
        history.push({
            pathname: ORDERS,
            state: {
                status: status,
            }
        })
    }, [history]);

   return (
      <Container className={classes.container}>
         <Grid container>
            <Grid item xl={1} lg={1} md={1} implementation='css' component={Hidden}/>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12} className={classes.grid}>
               <Card className={classes.card}>
                  <CardActionArea onClick={() => navigateToOrdersPage(0)} className={classes.cardAction}>
                     <CardContent>
                        <Typography variant='h6' className={classes.typography}>
                           {t('NEW_ORDERS').toUpperCase()}
                        </Typography>
                        <Typography variant='h1' className={classes.number}>
                           {renderOrdersCountByStatus(0)}
                        </Typography>
                     </CardContent>
                  </CardActionArea>
               </Card>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12} className={classes.grid}>
               <Card className={classes.card}>
                  <CardActionArea onClick={() => navigateToOrdersPage(1)} className={classes.cardAction}>
                     <CardContent>
                        <Typography variant='h6' className={classes.typography}>
                           {t('IN_PROGRESS').toUpperCase()}
                        </Typography>
                        <Typography variant='h1' className={classes.number}>
                           {renderOrdersCountByStatus(1)}
                        </Typography>
                     </CardContent>
                  </CardActionArea>
               </Card>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12} className={classes.gridReady}>
               <Card className={classes.card}>
                  <CardActionArea onClick={() => navigateToOrdersPage(2)} className={classes.cardAction}>
                     <CardContent>
                        <Typography variant='h6' className={classes.typography}>
                           {t('READY_FOR_SHIPPING').toUpperCase()}
                        </Typography>
                        <Typography variant='h1' className={classes.number}>
                           {renderOrdersCountByStatus(2)}
                        </Typography>
                     </CardContent>
                  </CardActionArea>
               </Card>
            </Grid>
            <Grid item xl={1} lg={1} md={1} implementation='css' component={Hidden}/>
            <Grid item xl={1} lg={1} md={1} implementation='css' component={Hidden}/>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12} className={classes.grid}>
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


import React, {useEffect,  useState, useCallback} from "react";
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

const useStyles = makeStyles(ordersPageStyles);

export const OrdersPage = ({history}) => {
   const [orderList, setOrderList] = useState([]);
   const dispatch = useDispatch();
   const minWidth350 = useMediaQuery('(min-width:350px)');
   const classes = useStyles();
   const { t } = useTranslation('');

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

   const renderRows = useCallback(() => {
      if (isEmpty(orderList)) {
         return null;
      }
      return orderList.map((order) => {
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
   }, [orderList, navigationToOrderDetails, minWidth350, classes]);


   return (
      <Container className={classes.root}>
         <List>
            <ListItem disableGutters divider>
               <Grid container>
                  <Grid item xs={5}>
                     <Typography>{t('DESCRIPTION')}</Typography>
                  </Grid>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={4}>
                     <Typography>{t('CUSTOMER')}</Typography>
                  </Grid>
                  <Grid item  xl={2} lg={2} md={2} sm={2} xs={3} >
                     <Typography className={classes.textStatus}>{t('STATUS')}</Typography>
                  </Grid>
               </Grid>
            </ListItem>
            {renderRows()}
         </List>
      </Container>
   );
};

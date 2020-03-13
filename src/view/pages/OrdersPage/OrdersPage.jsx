import React, {useEffect,  useState, useCallback} from "react";
import {Container, List, useMediaQuery} from "@material-ui/core";
import {useDispatch} from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {OrderListItem} from "./OrderListItem/OrderListItem";
import {makeStyles} from "@material-ui/core/styles";
import OrdersService from "../../../services/OrdersService";
import {ordersPageStyles} from "./OrdersPage.style";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";
import isEmpty from 'lodash/isEmpty';

const useStyles = makeStyles(ordersPageStyles);

export const OrdersPage = (props) => {
   const [orderList, setOrderList] = useState([]);
   const dispatch = useDispatch();
   const minWidth350 = useMediaQuery('(min-width:350px)');
   const classes = useStyles();
   const {history} = props;

   useEffect(() => {
      const fetchOrders = async () => {
         try {
            dispatch(setIsLoading(true));
            const response = await OrdersService.list();
            setOrderList(response);
            dispatch(setIsLoading(false));
         } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE}))
         }
      };
      fetchOrders();
   }, [dispatch]);

   const navigationToOrderDetails = useCallback((orderId) => {
      history.push(`/orders/${orderId}`);
   }, [history]);

   const renderRows = useCallback(() => {
      if (isEmpty(orderList) || isEmpty(orderList)) {
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
                     <Typography>Description</Typography>
                  </Grid>
                  <Grid item xs={5}>
                     <Typography>Customer</Typography>
                  </Grid>
                  <Grid item xs={2} className={classes.textStatus}>
                     <Typography>Status</Typography>
                  </Grid>
               </Grid>
            </ListItem>
            {renderRows()}
         </List>
      </Container>
   );
};

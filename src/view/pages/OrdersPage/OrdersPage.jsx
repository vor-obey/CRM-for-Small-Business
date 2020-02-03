import React, {useEffect} from "react";
import {Container, List, useMediaQuery} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getOrders} from "../../../data/store/order/orderThunkActions";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";
import {ordersPageStyles} from "./OrdersPage.style";

const useStyles = makeStyles(ordersPageStyles);

export const OrdersPage = (props) => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orderReducer.orders);
    const minWidth350 = useMediaQuery('(min-width:350px)');
    const classes = useStyles();

    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch]);

    const onClickedHandler = (orderId) => {
      props.history.push(`/orders/${orderId}`);
    };

    const renderListItems = () => {
        return orders.map(order => {
          return (
              <ListItem key={order.orderId} disableGutters divider button onClick={() => onClickedHandler(order.orderId)}>
                  <Grid container>
                      <Grid item xs={6}>
                          <ListItemText primary={order.description} secondary={order.currency}/>
                      </Grid>
                      <Grid item xs={6}>
                          <ListItemText primary={order.customerUserName} secondary={minWidth350 && order.customerEmail}/>
                      </Grid>
                  </Grid>
              </ListItem>
          );
        });
    };

    return (
        <Container className={classes.root}>
            <List>
                <ListItem disableGutters divider>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography>Description</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Customer</Typography>
                        </Grid>
                    </Grid>
                </ListItem>
                {orders.length !== 0 && renderListItems()}
            </List>
        </Container>
    );
};
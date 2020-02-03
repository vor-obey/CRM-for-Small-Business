import React, {useEffect} from "react";
import {Container, List} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getOrders} from "../../../data/store/order/orderThunkActions";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";

export const OrdersPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orderReducer.orders);

    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch]);

    const renderListItems = () => {
        return orders.map(order => {
          return (
              <ListItem key={order.id} disableGutters divider button>
                  <Grid container>
                      <Grid item xs={6}>
                          <ListItemText primary={order.description} secondary={order.currency}/>
                      </Grid>
                      <Grid item xs={6}>
                          <ListItemText primary={order.customerUserName} secondary={order.customerEmail}/>
                      </Grid>
                  </Grid>
              </ListItem>
          );
        });
    };

    return (
        <Container>
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
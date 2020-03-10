import React from 'react';

import {
   Grid,
   ListItem, 
} from "@material-ui/core";

import ListItemText from "@material-ui/core/ListItemText";

export const OrderListItem = (props) =>{

   const {
      order,
      minWidth350,
      navigationToOrderDetails
   } = props;

   return (
      <ListItem key={order.orderId} disableGutters divider button onClick={() => navigationToOrderDetails(order.orderId)}>
         <Grid container>
            <Grid item xs={6}>
               <ListItemText primary={order.description} secondary={order.currency}/>
            </Grid>
            <Grid item xs={6}>
               <ListItemText primary={order.customerUserName} secondary={minWidth350 && order.customerEmail}/>
            </Grid>
         </Grid>
      </ListItem>


   )
};

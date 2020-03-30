import React from 'react';
import {
   Grid,
   ListItem,
   Typography,
} from "@material-ui/core";

import ListItemText from "@material-ui/core/ListItemText";
import {EOrderStatus} from '../../../../constants/statuses';
import {useTranslation} from 'react-i18next';

export const OrderListItem = ({
                                 order,
                                 classes,
                                 minWidth600,
                                 navigationToOrderDetails
                              }) => {
   const {t} = useTranslation();
   return (
      <ListItem key={order.orderId} disableGutters divider button
                onClick={() => navigationToOrderDetails(order.orderId)}>
         <Grid container>
            <Grid item xl={5} lg={5} md={5} sm={4} xs={12} className={classes.gridList}>
               <Typography className={classes.textList}>
                  {t('DESCRIPTION')}:
               </Typography>
               <ListItemText primary={order.description} secondary={minWidth600 && order.currency}/>
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={5} xs={12} className={classes.gridList}>
               <Typography className={classes.textList}>
                  {t('CUSTOMER')}:
               </Typography>
               <ListItemText primary={order.customer.name} secondary={minWidth600 && order.customer.contactEmail}/>
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={3} xs={12} className={classes.gridList}>
               <Typography className={classes.textList}>
                  {t('STATUS')}:
               </Typography>
               <ListItemText>
                  {t(EOrderStatus[order.status])}
               </ListItemText>
            </Grid>
         </Grid>
      </ListItem>
   )
};

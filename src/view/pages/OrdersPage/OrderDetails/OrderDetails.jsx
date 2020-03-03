import React, {useEffect, useState} from "react";
import OrdersService from "../../../../services/OrdersService";
import {Link, useParams} from 'react-router-dom';
import {Container, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {orderDetailsStyles} from "./OrderDetails.style";
import {isEmpty} from 'lodash';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(orderDetailsStyles);

export const OrderDetails = () => {
   const {id} = useParams();
   const [orderDetails, setOrderDetails] = useState({});
   const classes = useStyles();

   useEffect(() => {
      const fetchOrderById = async (id) => {
         const response = await OrdersService.getOrderById(id);
         setOrderDetails(response);
      };

      fetchOrderById(id);
   }, [id]);

   const renderCustomerDetails = () => {
      const {customer} = orderDetails;
      return (
         <Grid container item>
            <Grid item xs={12}>
               <TextField
                  label={"Username"}
                  margin={"normal"}
                  name={"username"}
                  type={"text"}
                  value={customer.username}
                  inputProps={{
                     readOnly: true
                  }}
                     fullWidth={true}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     label={"Name"}
                     margin={"normal"}
                     name={"name"}
                     type={"text"}
                     value={customer.name}
                     inputProps={{
                        readOnly: true
                     }}
                        fullWidth
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        label={"Contact Number"}
                        margin={"normal"}
                        name={"contactNumber"}
                        type={"text"}
                        value={customer.contactNumber}
                        inputProps={{
                           readOnly: true
                        }}
                           fullWidth
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           label={"Contact Email"}
                           margin={"normal"}
                           name={"contactEmail"}
                           type={"text"}
                           value={customer.contactEmail}
                           inputProps={{
                              readOnly: true
                           }}
                              fullWidth
                           />
                        </Grid>
                     </Grid>
      );
   };

   const renderOrderDetails = () => {
      return (
         <Grid container item className={classes.orderRender}>
            <Grid item xl={10} xs={12} className={classes.inputDesciption}>
               <TextField
                  label={"Description"}
                  margin={"normal"}
                  name={"description"}
                  type={"text"}
                  value={orderDetails.description}
                  inputProps={{
                     readOnly: true
                  }}
                     fullWidth
                  />
               </Grid>
               <Grid item xl={2} xs={12} className={classes.inputCurrency}>
                  <TextField
                     label={"Currency"}
                     margin={"normal"}
                     name={"currency"}
                     type={"text"}
                     value={orderDetails.currency}
                     inputProps={{
                        readOnly: true
                     }}
                        fullWidth
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        label={"Shipping Details"}
                        margin={"normal"}
                        name={"shippingDetails"}
                        type={"text"}
                        value={`г. Запорожье, отделение №18`}
                        inputProps={{
                           readOnly: true
                        }}
                           fullWidth
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           label={"Shipping Method"}
                           margin={"normal"}
                           name={"shippingMethod"}
                           type={"text"}
                           value={`Самовывоз`}
                           inputProps={{
                              readOnly: true
                           }}
                              fullWidth
                           />
                        </Grid>
                     </Grid>
      );
   };

   const renderManagerDetails = () => { 
      const {manager} = orderDetails;
      return (
         <Grid container item  xl={6} lg={6} md={6} sm={6} xs={12} className={classes.managerRender}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.typographyManager}>
               <Typography variant='h5'>Manager</Typography>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.inputName}>
               <TextField
                  label={"Name"}
                  margin={"normal"}
                  name={"name"}
                  type={"text"}
                  value={`${manager.firstName} ${manager.middleName} ${manager.lastName}`}
                  inputProps={{
                     readOnly: true
                  }}
                     fullWidth
                  />
               </Grid>
            </Grid>
      );
   };

   return (
      <Container className={classes.root}>
         <Grid container>
            <Grid container item xl={6} lg={6} md={6} sm={6} xs={12} className={classes.order}>
               <Typography variant='h5'>Order</Typography>
               {!isEmpty(orderDetails) && renderOrderDetails()}
            </Grid>
            <Grid container item xl={6} lg={6} md={6} sm={6} xs={12} className={classes.customer}>
               <Typography variant='h5'>Customer</Typography>
               {!isEmpty(orderDetails) && orderDetails.customer && renderCustomerDetails()}
            </Grid>
            <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.manager}>
               {!isEmpty(orderDetails) && orderDetails.manager && renderManagerDetails()}
            </Grid>
            <Grid container justify={"center"}>
               <Button
                  type='submit'
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  component={Link}
                  to={'/orders'}
               >
                  Back
               </Button>
            </Grid>
         </Grid>
      </Container>
   );
};

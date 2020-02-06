import React, {useCallback, useState, useEffect} from 'react';
import {makeStyles, Button, Grid, Container, Paper, Typography, Divider, TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {CreateOrderScreenStyle} from './CreateOrderScreen.style'
import {useSelector} from "react-redux";
import {ShippingDetails} from "../../components/ShippingDetails/ShippingDetails";
import NumberFormat from "react-number-format";

const useStyles = makeStyles(CreateOrderScreenStyle);

const currencies = [
   {
      value: 'USD',
      label: 'USD',
   },
   {
      value: 'EUR',
      label: 'EUR',
   },
   {
      value: 'UAN',
      label: 'UAN'
   }
];

const autocompleteBreakpoints = {
   xl: 6,
   lg: 6,
   sm: 6,
   xs: 12,
};

const CreateOrderPage = (props) => {

   const [currency, setCurrency] = React.useState('EUR');

   const classes = useStyles();
   const city = useSelector(state => state.autocompleteReducer.city);
   const warehouse = useSelector(state => state.autocompleteReducer.warehouse);

   const [customerDetails, setCustomerDetails] = useState({});
   const [orderDetails, setOrderDetails] = useState({});
   const [managerDetails, setManagerDetails] = useState({});

   const handleChange = event => {
      const {value} = event.target;
   };

   const submit = useCallback(() => {
      console.log(city, warehouse);
   }, [city, warehouse]);

   return (
      <Container maxWidth='lg' className={classes.root}>
         <Grid container>
            <Grid item container xl={12}>
               <Paper className={classes.paper} elevation={9}>
                  <form className={classes.form}>
                     <Grid item xl={12} xs={12}>
                        <Typography className={classes.textOrder} variant='h4'>
                           Order
                        </Typography>
                        <Divider/>
                     </Grid>
                     <Grid item lg={12} xs={12}>
                        <TextField
                           required
                           fullWidth
                           autoFocus
                           label='Product'
                           variant="outlined"
                           margin="normal"
                        />
                     </Grid>
                     <Grid item xl={3} lg={3} sm={3}>
                        <TextField
                           className={classes.inputQuantity}
                           required
                           autoFocus
                           label='Quantity'
                           variant="outlined"
                           margin="normal"
                        />
                     </Grid>
                     <Grid item xl={3} lg={3} sm={2} xs={5}>
                        <TextField
                           className={classes.inputPrice}
                           required
                           autoFocus
                           margin="normal"
                           variant="outlined"
                           label="Price"
                        />
                     </Grid>
                     <Grid item xl={1} lg={1} sm={2} xs={6}>
                        <TextField
                           className={classes.inputSelect}
                           id="outlined-select-currency-native"
                           select
                           fullWidth
                           value={currency}
                           onChange={handleChange}
                           SelectProps={{
                              native: true,
                           }}
                           variant="outlined"
                           margin="normal"
                        >
                           {currencies.map(option => (
                              <option key={option.value} value={option.value}>
                                 {option.label}
                              </option>
                           ))}
                        </TextField>
                     </Grid>
                     <ShippingDetails breakPoints={autocompleteBreakpoints} classes={{
                        city: classes.cityAutocomplete,
                        warehouse: classes.warehouseAutocomplete
                     }}/>
                  </form>
               </Paper>
            </Grid>
            <Grid item container xl={12} className={classes.rootGrid}>
               <Paper className={classes.paper} elevation={9}>
                  <form className={classes.form}>
                     <Grid item xl={12} xs={12}>
                        <Typography className={classes.textOrder} variant='h4'>
                           Customer
                        </Typography>
                        <Divider/>
                     </Grid>
                     <Grid item lg={12} xs={2} className={classes.gridCustomers}>
                     {/*   customer autocomplete*/}
                     </Grid>
                     <Grid item xl={12} xs={12} className={classes.gridText}>
                        <Divider/>
                     </Grid>
                        <Grid item lg={3} md={4} sm={6} xs={12}>
                           <TextField
                              className={classes.inputUserName}
                              required
                              autoFocus
                              margin="normal"
                              variant="outlined"
                              label="Username"
                           />
                        </Grid>
                        <Grid item lg={3} md={4} sm={6} xs={12}>
                           <TextField
                              className={classes.inputName}
                              required
                              autoFocus
                              margin="normal"
                              variant="outlined"
                              label="Name"
                           />
                        </Grid>
                        <Grid item lg={3} md={4} sm={6} xs={12}>
                           <TextField
                              className={classes.inputName}
                              required
                              autoFocus
                              margin="normal"
                              variant="outlined"
                              label="Email Address"
                           />
                        </Grid>
                        <Grid item lg={3} sm={6} xs={12}>
                           <NumberFormat
                              className={classes.inputNumber}
                              customInput={TextField}
                              label={"Contact number"}
                              name={"contactNumber"}
                              variant={"outlined"}
                              format={"+38 (###) ###-##-##"}
                              margin="normal"
                              required
                           />
                        </Grid>
                     <Grid item xs={12}>
                        <TextField
                           label={"Details"}
                           name={"details"}
                           variant={"outlined"}
                           required
                           fullWidth
                           rows="4"
                           multiline
                        />
                     </Grid>
                  </form>
               </Paper>
            </Grid>
            <Grid item container xl={12} className={classes.rootGrid}>
               <Paper className={classes.paper} elevation={9}>
                  <form className={classes.form}>
                     <Grid item xl={12} xs={12}>
                        <Typography className={classes.textOrder} variant='h4'>
                           Manager
                        </Typography>
                        <Divider/>
                     </Grid>
                     <Grid item lg={12} xs={2} className={classes.gridCustomers}>
                     {/*   manager autocomplete */}
                     </Grid>
                  </form>
               </Paper>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12} className={classes.gridButton}>
               <Button
                  onClick={submit}
                  fullWidth
                  className={classes.submit}
                  type={"submit"}
                  variant={"contained"}
                  color={"primary"}
               >
                  Create Order
               </Button>
            </Grid>
         </Grid>
      </Container>
   )
};

export default CreateOrderPage;

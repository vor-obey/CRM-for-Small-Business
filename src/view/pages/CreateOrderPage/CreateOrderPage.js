import React, {useState, useEffect} from 'react';
import {makeStyles, Button, Grid, Container, Paper} from '@material-ui/core';
import {CreateOrderScreenStyle} from './CreateOrderScreen.style'
import {ProductForm} from "./CreateOrder/ProductForm";
import {CustomerFormTemp} from "./CreateCustomer/CustomerFormTemp";
import {ManagerForm} from "./ManagerForm/ManagerForm";
import CustomerService from "../../../services/CustomerService";
import UserService from "../../../services/UserService";

const useStyles = makeStyles(CreateOrderScreenStyle);

const currencies = ['UAH', 'USD', 'EUR'];

const autocompleteBreakpoints = {
   xl: 6,
   lg: 6,
   sm: 6,
   xs: 12,
};

const CreateOrderPage = () => {

   const classes = useStyles();

   const [productDetails, setProductDetails] = useState({
      description: '',
      price: '',
      amount: '',
      currency: 'UAH'
   });
   const [customerDetails, setCustomerDetails] = useState({
      customerId: "",
      username: "",
      name: "",
      contactNumber: "",
      contactEmail: "",
      details: ""
   });
   const [managerDetails, setManagerDetails] = useState({
      userId: "",
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      contactNumber: ""
   });
   const [managers, setManagers] = useState([]);
   const [customers, setCustomers] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         const customers = await CustomerService.list();
         setCustomers(customers);

         const managers = await UserService.list();
         setManagers(managers);
      };
      fetchData();
   }, []);

   const onChangedProductInput = event => {
      const {value, name} = event.target;
      setProductDetails(prevState => {
         return {
            ...prevState,
            [name]: value
         };
      });
   };

   const onChangedCustomerInput = event => {
      const {value, name} = event.target;
      setCustomerDetails(prevState => {
         return {
            ...prevState,
            [name]: value
         };
      });
   };

   const onCustomerSelectHandler = async customer => {
      if (!customer) {
         setCustomerDetails({
            customerId: "",
            username: "",
            name: "",
            contactNumber: "",
            contactEmail: "",
            details: ""
         });
      } else {
         setCustomerDetails(customer);
      }
   };

   const onManagerSelectHandler = async manager => {
      console.log(manager);
      if (!manager) {
         setManagerDetails({
            userId: "",
            firstName: "",
            lastName: "",
            middleName: "",
            email: "",
            contactNumber: ""
         });
      } else {
         setManagerDetails(manager);
      }
   };

   console.log(managerDetails);

   return (
      <Container maxWidth='lg' className={classes.root}>
         <Grid container>
            <Grid container item>
               <Paper className={classes.paper}>
                  <form>
                     <Grid container item xl={12}>
                        <ProductForm
                           classes={classes}
                           currencies={currencies}
                           onChangedInput={onChangedProductInput}
                           productDetails={productDetails}
                        />
                     </Grid>
                     <Grid container item xl={12}>
                        <CustomerFormTemp
                           classes={classes}
                           autocompleteBreakpoints={autocompleteBreakpoints}
                           customers={customers}
                           customerDetails={customerDetails}
                           onSelectHandler={onCustomerSelectHandler}
                           onChangedInput={onChangedCustomerInput}
                        />
                     </Grid>
                     <Grid container item xl={12}>
                        <ManagerForm
                           managers={managers}
                           classes={classes}
                           autocompleteBreakpoints={autocompleteBreakpoints}
                           onSelectHandler={onManagerSelectHandler}
                        />
                     </Grid>
                  </form>
               </Paper>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12} className={classes.gridButton}>
               <Button
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

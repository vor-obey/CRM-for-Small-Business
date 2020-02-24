import React, {useState, useEffect} from 'react';
import {makeStyles, Button, Grid, Container, Paper} from '@material-ui/core';
import {createOrderPageStyles} from './CreateOrderScreen.style'
import {ProductForm} from "./ProductForm/ProductForm";
import {CustomerForm} from "./CreateCustomer/CustomerForm";
import {ShippingDetailsForm} from "./ShippingDetailsForm/ShippingDetailsForm";
import CustomerService from "../../../services/CustomerService";
import UserService from "../../../services/UserService";
import {useSelector} from "react-redux";

const useStyles = makeStyles(createOrderPageStyles);

const currencies = ['UAH', 'USD', 'EUR'];

const autocompleteBreakpoints = {
   xl: 6,
   lg: 6,
   sm: 6,
   xs: 12,
};

export const CreateOrderPage = () => {

   const classes = useStyles();


   const city = useSelector(state => state.autocompleteReducer.city);
   const warehouse = useSelector(state => state.autocompleteReducer.warehouse);

   const [productDetails, setProductDetails] = useState({
      description: '',
      price: '',
      amount: '',
      currency: 'UAH'
   });
   const [customerDetails, setCustomerDetails] = useState({
      customerId: "",
      username: '',
      name: '',
      contactNumber: '',
      contactEmail: '',
      details: '',
      sourceId: '',
   });
   const [managerId, setManagerId] = useState('');
   const [managers, setManagers] = useState([]);
   const [customers, setCustomers] = useState([]);
   const [open, setOpen] = useState(false);
   const [update, setUpdate] = useState(false);

   useEffect(() => {
      const fetchCustomers = async () => {
         try {
            const customers = await CustomerService.list();
            setCustomers(customers);
         } catch (e) {
            console.log(e)
         }
      };
      fetchCustomers();
   }, [update]);

   useEffect(() => {
      const fetchManagers = async () => {
         try {
            const managers = await UserService.list();
            setManagers(managers);
         } catch (e) {
            console.log(e)
         }
      };
      fetchManagers();
   }, []);

   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

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
         });
      } else {
         setCustomerDetails({
            ...customer
         });
      }
   };


   const onManagerSelectHandler = async manager => {
      if (!manager) {
         setManagerId('');
      } else {
         setManagerId(manager.userId);
      }
   };

   const onValidate = () => {
      if (!managerId || !city || !warehouse || !customerDetails) {
      } else {
         console.log({
            productDetails,
            customerDetails,
            shippingDetails: {city, warehouse},
            managerId
         });
      }
   };

   const onSubmitClicked = (e) => {
      e.preventDefault();
      onValidate();
   };

   return (
      <Container maxWidth='lg' className={classes.root}>
         <Grid container>
            <Grid container item>
               <Paper className={classes.paper}>
                  <form onSubmit={onSubmitClicked}>
                     <Grid container item xl={12}>
                        <ProductForm
                           classes={classes}
                           currencies={currencies}
                           onChangedInput={onChangedProductInput}
                           productDetails={productDetails}
                        />
                     </Grid>
                     <Grid container item xl={12}>
                        <CustomerForm
                           open={open}
                           setUpdate={setUpdate}
                           onClick={handleOpen}
                           onClose={handleClose}
                           classes={classes}
                           customers={customers}
                           customerDetails={customerDetails}
                           onSelectHandler={onCustomerSelectHandler}
                           onChangedInput={onChangedCustomerInput}
                           managers={managers}
                           setManagers={setManagers}
                           onManagerSelectHandler={onManagerSelectHandler}
                        />
                     </Grid>
                     <Grid container item xl={12}>
                        <ShippingDetailsForm
                           classes={classes}
                           autocompleteBreakpoints={autocompleteBreakpoints}
                        />
                     </Grid>
                     <Button
                        fullWidth
                        className={classes.submit}
                        type="submit"
                        variant="contained"
                        color="primary"
                     >
                        Create Order
                     </Button>
                  </form>
               </Paper>
            </Grid>
         </Grid>
      </Container>
   )
};


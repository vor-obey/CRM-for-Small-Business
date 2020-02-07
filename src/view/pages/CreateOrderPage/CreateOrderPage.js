import React, {useState, useEffect} from 'react';
import {makeStyles, Button, Grid, Container, Paper} from '@material-ui/core';
import {CreateOrderScreenStyle} from './CreateOrderScreen.style'
import {ProductForm} from "./CreateOrder/ProductForm";
import {CustomerFormTemp} from "./CreateCustomer/CustomerFormTemp";
import {ManagerForm} from "./ManagerForm/ManagerForm";
import CustomerService from "../../../services/CustomerService";
import UserService from "../../../services/UserService";
import SourcesService from "../../../services/SourcesService";

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
      details: "",
      sourceId: 'c7b1a81c-ebfa-4dc1-9420-41ffcf2569d5'
   });
   const [managerDetails, setManagerDetails] = useState({
      userId: "",
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      contactNumber: ""
   });
   const [open, setOpen] = useState(false);
   const [sources, setSources] = useState([]);
   const [managers, setManagers] = useState([]);
   const [customers, setCustomers] = useState([]);

   console.log(customerDetails);

   useEffect(() => {
      (async function () {
         try {
            const [customers, managers, sources] = await Promise.all(
               [
                  CustomerService.list(),
                  UserService.list(),
                  SourcesService.list()
               ]
            );
            setCustomers(customers);
            setManagers(managers);
            setSources(sources);
         } catch (e) {
            console.log(e);
         }
      })()
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


   const handleClose = () => {
      setOpen(false);
   };

   const onCustomerSelectHandler = async customer => {
      if (!customer) {
         setCustomerDetails({
            customerId: "",
            username: "",
            name: "",
            contactNumber: "",
            contactEmail: "",
            details: "",
            sourceId: 'c7b1a81c-ebfa-4dc1-9420-41ffcf2569d5'
         });
      } else {
         setCustomerDetails({
            ...customer,
            sourceId: 'c7b1a81c-ebfa-4dc1-9420-41ffcf2569d5'
         });
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

   const onSubmitClicked = (e) => {
      e.preventDefault();
      console.log('hello')
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
                           onClose={handleClose}
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
                           sources={sources}
                        />
                     </Grid>
                     <Grid container item xl={12}>
                        <ManagerForm
                           open={open}
                           managers={managers}
                           classes={classes}
                           autocompleteBreakpoints={autocompleteBreakpoints}
                        />
                     </Grid>
                     <Button
                        fullWidth
                        className={classes.submit}
                        type={"submit"}
                        variant={"contained"}
                        color={"primary"}
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

export default CreateOrderPage;

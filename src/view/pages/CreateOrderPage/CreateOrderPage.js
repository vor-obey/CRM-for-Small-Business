import React, {useState, useEffect} from 'react';
import {makeStyles, Button, Grid, Container, Paper} from '@material-ui/core';
import {CreateOrderScreenStyle} from './CreateOrderScreen.style'
import {ProductForm} from "./ProductForm/ProductForm";
import {CustomerFormTemp} from "./CreateCustomer/CustomerFormTemp";
import {ManagerForm} from "./ManagerForm/ManagerForm";
import {ShippingDetailsForm} from "./ShippingDetailsForm/ShippingDetailsForm";
import CustomerService from "../../../services/CustomerService";
import UserService from "../../../services/UserService";
import SourcesService from "../../../services/SourcesService";
import MethodService from "../../../services/MethodsService";
import {useSelector} from "react-redux";

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
      username: "",
      name: "",
      contactNumber: "",
      contactEmail: "",
      details: "",
   });
   const [managerId, setManagerId] = useState('');
   const [sourceId, setSourceId] = useState('');
   const [shippingMethodId, setShippingMethodId] = useState('');
   const [sources, setSources] = useState([]);
   const [managers, setManagers] = useState([]);
   const [methods, setMethods] = useState([]);
   const [customers, setCustomers] = useState([]);

   useEffect(() => {
      (async function () {
         try {
            const [customers, methods, managers, sources] = await Promise.all(
               [
                  CustomerService.list(),
                  MethodService.list(),
                  UserService.list(),
                  SourcesService.list(),
               ]
            );
            setCustomers(customers);
            setManagers(managers);
            setMethods(methods);
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

   const onCustomerSelectHandler = async customer => {
      if (!customer) {
         setCustomerDetails({
            customerId: "",
            username: "",
            name: "",
            contactNumber: "",
            contactEmail: "",
            details: "",
         });
      } else {
         setCustomerDetails({
            ...customer
         });
      }
   };

   const onSourceSelectHandler = (event) => {
      const {value} = event.target;
      if (!sources) {
         setSourceId('');
      } else {
         setSourceId(value);
      }
   };

   const onMethodSelectHandler = (event) => {
      const {value} = event.target;
      if (!methods) {
         setShippingMethodId('');
      } else {
         setShippingMethodId(value);
      }
   };

   const onManagerSelectHandler = async manager => {
      if (!manager) {
         setManagerId('')
      } else {
         setManagerId(manager.userId);
      }
   };

   const onValidate = () => {
      if (!sourceId || !managerId || !shippingMethodId || !city || !warehouse) {
         console.log('All Fields Must Be Filled')
      } else {
         console.log({
            productDetails,
            customerDetails,
            sourceId,
            shippingDetails: {city, warehouse},
            shippingMethodId,
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
                        <CustomerFormTemp
                           classes={classes}
                           customers={customers}
                           customerDetails={customerDetails}
                           onSelectHandler={onCustomerSelectHandler}
                           onChangedInput={onChangedCustomerInput}
                           sources={sources}
                           sourceId={sourceId}
                           onSourceSelectHandler={onSourceSelectHandler}
                        />
                     </Grid>
                     <Grid container item xl={12}>
                        <ShippingDetailsForm
                           classes={classes}
                           autocompleteBreakpoints={autocompleteBreakpoints}
                           onMethodSelectHandler={onMethodSelectHandler}
                           shippingMethodId={shippingMethodId}
                           methods={methods}
                        />
                     </Grid>
                     <Grid container item xl={12}>
                        <ManagerForm
                           managers={managers}
                           classes={classes}
                           onSelectHandler={onManagerSelectHandler}
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

import React, {useState, useEffect} from 'react';
import {makeStyles, Button, Grid, Container, Paper} from '@material-ui/core';
import {createOrderPageStyles} from './CreateOrderScreen.style'
import {ProductForm} from "./ProductForm/ProductForm";
import {CustomerForm} from "./CreateCustomer/CustomerForm";
import {ShippingDetailsForm} from "./ShippingDetailsForm/ShippingDetailsForm";
import CustomerService from "../../../services/CustomerService";
import UserService from "../../../services/UserService";
import {useDispatch,
   // useSelector
} from "react-redux";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";

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
   // const city = useSelector(state => state.autocompleteReducer.city);
   // const warehouse = useSelector(state => state.autocompleteReducer.warehouse);
   const [productDetails, setProductDetails] = useState({
      description: '',
      price: '',
      amount: '',
      currency: 'UAH'
   });

   // const [managerId, setManagerId] = useState('');
   const [managers, setManagers] = useState([]);
   const [customers, setCustomers] = useState([]);
   const [shouldUpdate, setShouldUpdate] = useState(false);
   const dispatch = useDispatch();

   useEffect(() => {
      const fetchCustomers = async () => {
         try {
            dispatch(setIsLoading(true));
            const customers = await CustomerService.list();
            setCustomers(customers);
            dispatch(setIsLoading(false));
         } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE}));
         }
      };
      fetchCustomers();
   }, [shouldUpdate, dispatch]);

   useEffect(() => {
      const fetchManagers = async () => {
         try {
            dispatch(setIsLoading(true));
            const managers = await UserService.list();
            setManagers(managers);
            dispatch(setIsLoading(false));
         } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE}));
         }
      };
      fetchManagers();
   }, [dispatch]);

   const onChangedProductInput = event => {
      const {value, name} = event.target;
      setProductDetails(prevState => {
         return {
            ...prevState,
            [name]: value
         };
      });
   };

   const onSubmitClicked = (e) => {
      e.preventDefault();
      console.log('clicked');
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
                           setUpdate={setShouldUpdate}
                           classes={classes}
                           customers={customers}
                           managers={managers}
                           setManagers={setManagers}
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


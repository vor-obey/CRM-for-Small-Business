import React, {useState, useEffect, useCallback} from 'react';
import {makeStyles, Button, Grid, Container, Paper} from '@material-ui/core';
import {createOrderPageStyles} from './CreateOrderScreen.style'
import {ProductForm} from "./ProductForm/ProductForm";
import {CustomerForm} from "./CustomerManagerForm/CustomerForm";
import {ShippingDetailsForm} from "./ShippingDetailsForm/ShippingDetailsForm";
import CustomerService from "../../../services/CustomerService";
import UserService from "../../../services/UserService";
import {useDispatch, useSelector} from "react-redux";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";
import isEmpty from 'lodash/isEmpty';
import OrdersService from '../../../services/OrdersService';

const useStyles = makeStyles(createOrderPageStyles);

const currencies = ['UAH', 'USD', 'EUR'];

const autocompleteBreakpoints = {
    xl: 6,
    lg: 6,
    sm: 6,
    xs: 12,
};

export const CreateOrderPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {history} = props;
    const [productDetails, setProductDetails] = useState({
        description: '',
        currency: 'UAH'
    });
    const [manager, setManager] = useState({});
    const [customer, setCustomer] = useState({});
    const [managers, setManagers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [createdCustomer, setCreatedCustomer] = useState({});
    const city = useSelector(state => state.autocompleteReducer.city);
    const warehouse = useSelector(state => state.autocompleteReducer.warehouse);
    const currentUser = useSelector(state => state.userReducer.currentUser);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                dispatch(setIsLoading(true));
                const customers = await CustomerService.list();
                setCustomers(customers);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
            }
        };
        fetchCustomers();
        if (!isEmpty(createdCustomer)) {
            setCustomer(createdCustomer);
        }
    }, [createdCustomer, dispatch]);

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                dispatch(setIsLoading(true));
                const managers = await UserService.list();
                setManagers(managers);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
            }
        };
        fetchManagers();
    }, [dispatch]);

    useEffect(() => {
        if (managers && currentUser) {
            const selectedManager = managers.find(manager => manager.userId === currentUser.userId);
            setManager(selectedManager);
        }
    }, [managers, currentUser]);

    const onChangedProductInput = useCallback((event) => {
        const {value, name} = event.target;
        setProductDetails(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    }, []);

    const onManagerSelectHandler = useCallback(async (manager) => {
        if (!manager) {
            setManager({});
        } else {
            setManager(manager);
        }
    }, []);

    const onCustomerSelectHandler = useCallback((async (customer) => {
        if (!customer) {
            setCustomer({});
        } else {
            setCustomer(customer);
        }
    }), []);

    const onSubmitHandler = useCallback(async (e) => {
        e.preventDefault();
        if (isEmpty(productDetails) || isEmpty(manager)
            || isEmpty(customer) || isEmpty(city) || isEmpty(warehouse)
        ) {
            dispatch(setSnackBarStatus({isOpen: true, message: 'Fill all the fields', success: false}));
        } else {
            try {
                dispatch(setIsLoading(true));
                const response = await OrdersService.create({
                    product: productDetails,
                    managerId: manager.userId,
                    customerId: customer.customerId,
                    shippingDetails: {city, warehouse},
                });
                if (response.success) {
                    dispatch(setIsLoading(false));
                    history.push('/orders');
                } else {
                    dispatch(setIsLoading(false));
                    dispatch(setSnackBarStatus({isOpen: true, message: 'Error', success: false}));
                }
            } catch {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: 'Error', success: false}));
            }
        }
    }, [
        city,
        customer,
        manager,
        productDetails,
        warehouse,
        dispatch,
        history
    ]);

    return (
        <Container maxWidth='lg' className={classes.root}>
            <Grid container>
                <Grid container item>
                    <Paper className={classes.paper}>
                        <form onSubmit={onSubmitHandler}>
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
                                    setCreatedCustomer={setCreatedCustomer}
                                    classes={classes}
                                    customers={customers}
                                    managers={managers}
                                    manager={manager}
                                    customer={customer}
                                    onCustomerSelectHandler={onCustomerSelectHandler}
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
                                type='submit'
                                variant='contained'
                                color='primary'
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


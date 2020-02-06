import React, {useCallback, useState, useEffect} from 'react';
import {makeStyles, Button, Grid, Container, Paper} from '@material-ui/core';
import {CreateOrderScreenStyle} from './CreateOrderScreen.style'
import {useSelector} from "react-redux";
import {ProductForm} from "./CreateOrder/ProductForm";
import {CustomerFormTemp} from "./CreateCustomer/CustomerFormTemp";
import {ManagerForm} from "./ManagerForm/ManagerForm";
import CustomerService from "../../../services/CustomerService";

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
        details: ""
    });
    // const [managerDetails, setManagerDetails] = useState({});
    const [customers, setCustomers] = useState([]);

    console.log('customerDetails', customerDetails);

    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await CustomerService.getCustomerList();
            setCustomers(response);
        };
        fetchCustomers();
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

    const onSelectHandler = async customer => {
        if (customer != null) {
            setCustomerDetails(customer);
        } else {
            setCustomerDetails({
                customerId: "",
                username: "",
                name: "",
                contactNumber: "",
                contactEmail: "",
                details: ""
            });
        }
    };


    const submit = useCallback(() => {
        console.log(city, warehouse);
    }, [city, warehouse]);

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
                                    onSelectHandler={onSelectHandler}
                                    onChangedInput={onChangedCustomerInput}
                                />
                            </Grid>
                            <Grid container item xl={12}>
                                <ManagerForm classes={classes}/>
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

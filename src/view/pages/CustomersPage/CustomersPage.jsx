import React, {useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import {CustomerService} from "../../../services";
import {
    Button,
    Grid,
    List,
    ListItem,
    Typography,
    Container,
    Hidden,
    makeStyles
} from '@material-ui/core';
import { customersPageStyle } from "./CustomersPage.style";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {CustomerListItem} from "./CustomerListItem/CustomerListItem";

const useStyles = makeStyles(customersPageStyle);

export const CustomersPage = (props) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        (async function () {
            try {
                const response = await CustomerService.getCustomerList();
                setCustomerList(response);
            } catch (e) {
            }
        })()
    }, [dispatch]);

    const navigateToCustomerDetails = useCallback((customerId) => {
        props.history.push(`/customers/${customerId}`)
    }, [props.history]);


    const renderRows = useCallback(() => {
        if (!customerList || !customerList.length) {
            return null;
        }
        return customerList.map((customer) => {
            return (
                <CustomerListItem
                    key={customer.customerId}
                    customer={customer}
                    classes={classes}
                    navigateToCustomerDetails={navigateToCustomerDetails}
                />
            )
        })
    }, [customerList, classes, navigateToCustomerDetails]);

    return (
        <Container className={classes.root}>
            <Typography variant="h5" className={classes.title}>
             Customers
            </Typography>
            <List className={classes.container}>
                <ListItem divider>
                    <Grid container className={classes.customerListContainer}>
                        <Grid item xs={5} md={2}>
                            <Typography className={classes.customerItemTitle}>
                                Username
                            </Typography>
                        </Grid>
                        <Grid item xs={5} md={2}>
                            <Typography className={classes.customerItemTitle}>
                                Name
                            </Typography>
                        </Grid>
                        <Hidden smDown>
                            <Grid item xs={3} md={2}>
                                <Typography className={classes.customerItemTitle}>
                                    Contact Number
                                </Typography>
                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <Grid item xs={3} md={2}>
                                <Typography className={classes.customerItemTitle}>
                                    Email
                                </Typography>
                            </Grid>
                        </Hidden>
                    </Grid>
                </ListItem>
                {renderRows()}
            </List>
            <Grid container justify={'center'}>
                <Button
                    type='submit'
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    component={Link}
                    to={'/create-customer'}>
                    <PersonAddIcon className={classes.addCustomer}/>
                    Create customer
                </Button>
            </Grid>
        </Container>
    )
};
import React from 'react';
import {Button, Container, Grid, Paper} from '@material-ui/core';
import {ProductForm} from './ProductForm/ProductForm';
import {CustomerForm} from './CustomerManagerForm/CustomerForm';
import {ShippingDetailsForm} from './ShippingDetailsForm/ShippingDetailsForm';

const currencies = ['UAH', 'USD', 'EUR'];

const autocompleteBreakpoints = {
    xl: 6,
    lg: 6,
    sm: 6,
    xs: 12,
};

export const SaveOrderForm = ({
                                  classes,
                                  onSubmitHandler,
                                  onChangedProductInput,
                                  productDetails,
                                  setCreatedCustomer,
                                  customers,
                                  managers,
                                  manager,
                                  customer,
                                  onCustomerSelectHandler,
                                  onManagerSelectHandler
                              }) => {
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
    );
};
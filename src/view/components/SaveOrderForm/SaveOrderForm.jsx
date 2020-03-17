import React, {useCallback} from 'react';
import {Button, Container, Grid, Paper} from '@material-ui/core';
import {ProductForm} from './ProductForm/ProductForm';
import {CustomerForm} from './CustomerManagerForm/CustomerForm';
import {ShippingDetailsForm} from './ShippingDetailsForm/ShippingDetailsForm';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {EOrderStatus} from '../../../constants/statuses';

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
                                  onManagerSelectHandler,
                                  isCustom,
                                  shippingMethod,
                                  shippingMethods,
                                  address,
                                  onChangedAddressInput,
                                  onShippingMethodSelectHandler,
                                  onStatusSelectHandler,
                                  buttonText,
                              }) => {
    const renderStatuses = useCallback(() => {
        const entries = Object.entries(EOrderStatus);
        return entries.map(([key, value]) => {
            return <option key={key} value={key}>{value}</option>
        });
    }, []);

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
                                    isCustom={isCustom}
                                    shippingMethod={shippingMethod}
                                    shippingMethods={shippingMethods}
                                    address={address}
                                    onChangedAddressInput={onChangedAddressInput}
                                    onShippingMethodSelectHandler={onShippingMethodSelectHandler}
                                />
                            </Grid>
                            <Grid item xl={12} xs={12} style={{marginTop: 16}}>
                                <FormControl
                                    variant="outlined"
                                    required
                                    fullWidth
                                >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Status
                                    </InputLabel>
                                    <Select
                                        native
                                        name="status"
                                        value={productDetails.status}
                                        labelWidth={70}
                                        required
                                        onChange={onStatusSelectHandler}
                                        inputProps={{
                                            name: 'status',
                                        }}>
                                        {renderStatuses()}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Button
                                fullWidth
                                className={classes.submit}
                                type='submit'
                                variant='contained'
                                color='primary'
                            >
                                {buttonText}
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
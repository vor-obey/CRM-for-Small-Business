import React, {useCallback} from 'react';
import {Button, Container, Grid, Paper, FormControl, InputLabel, Select} from '@material-ui/core';
import {ProductForm} from './ProductForm/ProductForm';
import {CustomerForm} from './CustomerManagerForm/CustomerForm';
import {ShippingDetailsForm} from './ShippingDetailsForm/ShippingDetailsForm';
import {EOrderStatus} from '../../../constants/statuses';
import {useTranslation} from 'react-i18next';

const autocompleteBreakpoints = {
    xl: 6,
    lg: 6,
    sm: 6,
    xs: 12,
};

export const SaveOrderForm = ({
                                  classes,
                                  setCreatedCustomer,
                                  customers,
                                  managers,
                                  manager,
                                  customer,
                                  onCustomerSelectHandler,
                                  onManagerSelectHandler,
                                  isCustom,
                                  customerLoading,
                                  managerLoading,
                                  shippingMethod,
                                  shippingMethods,
                                  address,
                                  onChangedAddressInput,
                                  onShippingMethodSelectHandler,
                                  onStatusSelectHandler,
                                  buttonText,
                                  getProducts,
                                  status,
                                  onSubmit,
                                  orderedProducts,
                                  isEdit,
                                  history
                              }) => {
    const {t} = useTranslation();
    const renderStatuses = useCallback(() => {
        const entries = Object.entries(EOrderStatus);
        return entries.map(([key, value]) => {
            return <option key={key} value={key}>{t(value)}</option>
        });
    }, [t]);

    return (
        <Container maxWidth='lg' className={classes.root}>
            <Grid container>
                <Grid container item>
                    <Paper className={classes.paper}>
                        <Grid container item xl={12}>
                            <ProductForm
                                getProducts={getProducts}
                                classes={classes}
                                orderedProducts={orderedProducts}
                                isEdit={isEdit}
                                history={history}
                            />
                        </Grid>
                        <Grid container item xl={12}>
                            <CustomerForm
                                setCreatedCustomer={setCreatedCustomer}
                                classes={classes}
                                customers={customers}
                                managers={managers}
                                customerLoading={customerLoading}
                                managerLoading={managerLoading}
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
                                    {t('STATUS')}
                                </InputLabel>
                                <Select
                                    native
                                    name="status"
                                    value={status}
                                    labelWidth={70}
                                    required
                                    onChange={(event) => onStatusSelectHandler(event.target.value)}
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
                            variant='contained'
                            color='primary'
                            onClick={onSubmit}
                        >
                            {buttonText}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

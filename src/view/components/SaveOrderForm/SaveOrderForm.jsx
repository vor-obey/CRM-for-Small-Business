import React, {useCallback} from 'react';
import {Button, Container, Grid, Paper, FormControl, Select, Typography, Divider} from '@material-ui/core';
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
                                  description,
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
                                  onNovaposhtaAddressSelectHandler,
                                  history,
                                  orderDescription,
                                  onOrderDescriptionChangeHandler,
                                  chat
                              }) => {
    const {t} = useTranslation();
    const renderStatuses = useCallback(() => {
        const entries = Object.entries(EOrderStatus);
        return entries.map(([key, value]) => {
            return <option key={key} value={key}>{t(value)}</option>
        });
    }, [t]);

    return (
        <Container className={classes.root}>
            <Grid container>
                <Grid container item>
                    <Paper className={classes.paper}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant='h6'>
                                {t('STATUS')}
                            </Typography>
                            <Divider/>
                        </Grid>
                        <Grid item xl={12} xs={12} className={classes.gridStatus}>
                            <FormControl
                                variant="outlined"
                                required
                            >
                                <Select
                                    native
                                    name="status"
                                    value={status}
                                    required
                                    onChange={(event) => onStatusSelectHandler(event.target.value)}
                                    inputProps={{
                                        name: 'status',
                                    }}>
                                    {renderStatuses()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid container item xl={12}>
                            <ProductForm
                                chat={chat}
                                getProducts={getProducts}
                                description={description}
                                classes={classes}
                                orderedProducts={orderedProducts}
                                isEdit={isEdit}
                                history={history}
                                orderDescription={orderDescription}
                                onOrderDescriptionChangeHandler={onOrderDescriptionChangeHandler}
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
                                onNovaposhtaAddressSelectHandler={onNovaposhtaAddressSelectHandler}
                            />
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

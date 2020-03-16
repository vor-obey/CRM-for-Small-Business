import {SaveOrderForm} from '../../components/SaveOrderForm/SaveOrderForm';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useCustomersAndSelectCreated, useManagers, useOrderDetailsById} from '../../../utils/customHooks';
import {makeStyles} from '@material-ui/core/styles';
import {editOrderStyles} from './EditOrder.style';
import isEmpty from 'lodash/isEmpty';
import {EOrderStatus} from '../../../constants/statuses';

const useStyles = makeStyles(editOrderStyles);

export const EditOrder = () => {
    const classes = useStyles();
    const {id} = useParams();
    const orderDetails = useOrderDetailsById(id);
    const managers = useManagers();
    const [manager, setManager] = useState({});
    const [customer, setCustomer] = useState({});
    const [productDetails, setProductDetails] = useState({});
    const [createdCustomer, setCreatedCustomer] = useState({});
    const [customers, customerToSelect] = useCustomersAndSelectCreated(createdCustomer);

    useEffect(() => {
       if (!isEmpty(orderDetails)) {
           const {description, status, currency} = orderDetails;
           setProductDetails({
               description,
               status: EOrderStatus[status],
               currency
           });
       }
    }, [orderDetails]);

    useEffect(() => {
       if (managers && (orderDetails && orderDetails.manager)) {
           const selectedManager = managers.find(manager => manager.userId === orderDetails.manager.userId);
           setManager(selectedManager);
       }
    }, [managers, orderDetails]);

    useEffect(() => {
       if (customers && (orderDetails && orderDetails.customer)) {
           const selectedCustomer = customers.find(customer => customer.customerId === orderDetails.customer.customerId);
           setCustomer(selectedCustomer);
       }
    }, [customers, orderDetails]);

    useEffect(() => {
       if (!isEmpty(customerToSelect)) {
           setCustomer(customerToSelect);
       }
    }, [customerToSelect]);

    const onSubmitHandler = () => {
        console.log('it works');
    };

    const onChangedProductInput = (event) => {
        const {value, name} = event.target;
        console.log(value, name);
    };

    const onCustomerSelectHandler = (event) => {
        console.log(event);
    };

    const onManagerSelectHandler = (event) => {
        console.log(event);
    };

    return (
        <SaveOrderForm
            classes={classes}
            onSubmitHandler={onSubmitHandler}
            onChangedProductInput={onChangedProductInput}
            productDetails={productDetails}
            setCreatedCustomer={setCreatedCustomer}
            customers={customers}
            managers={managers}
            customer={customer}
            manager={manager}
            onCustomerSelectHandler={onCustomerSelectHandler}
            onManagerSelectHandler={onManagerSelectHandler}
        />
    );
};
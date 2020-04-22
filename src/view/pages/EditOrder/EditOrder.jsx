import {SaveOrderForm} from '../../components/SaveOrderForm/SaveOrderForm';
import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {editOrderStyles} from './EditOrder.style';
import isEmpty from 'lodash/isEmpty';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {OrderService} from '../../../services';
import {useTranslation} from 'react-i18next';
import {useOrderDetailsById, useShippingMethods} from '../../../utils/hooks/orderHooks';
import {useManagers} from '../../../utils/hooks/userHooks';
import {useCustomers} from '../../../utils/hooks/customerHooks';

const useStyles = makeStyles(editOrderStyles);

export const EditOrder = ({history}) => {
    const classes = useStyles();
    const {id} = useParams();
    const dispatch = useDispatch();
    const orderDetails = useOrderDetailsById(id);
    const [productDetails, setProductDetails] = useState({});
    const [shippingMethods] = useShippingMethods();
    const [shippingMethod, setShippingMethod] = useState({});
    const [shippingMethodId, setShippingMethodId] = useState('');
    const [managers] = useManagers();
    const [manager, setManager] = useState({});
    const [customers, setCustomers] = useCustomers();
    const [customer, setCustomer] = useState({});
    const [createdCustomer, setCreatedCustomer] = useState({});
    const [address, setAddress] = useState('');
    const [isCustom, setIsCustom] = useState(false);
    const city = useSelector(state => state.autocompleteReducer.city);
    const warehouse = useSelector(state => state.autocompleteReducer.warehouse);
    const {t} = useTranslation();

    useEffect(() => {
        if (!isEmpty(orderDetails)) {
            const {description, status, currency, shippingDetails: {address: {address}}} = orderDetails;
            setProductDetails({
                description,
                status,
                currency
            });
            setAddress(JSON.parse(address));
        }
    }, [orderDetails]);

    useEffect(() => {
        if (!isEmpty(createdCustomer)) {
            setCustomers(prevState => {
                return [...prevState, createdCustomer];
            });
        }
    }, [createdCustomer, setCustomers]);

    useEffect(() => {
        if (managers && (orderDetails && orderDetails.manager)) {
            const selectedManager = managers.find(manager => manager.userId === orderDetails.manager.userId);
            setManager(selectedManager);
        }
    }, [managers, orderDetails]);

    useEffect(() => {
        if (customers && (orderDetails && orderDetails.customer)) {
            if (!isEmpty(createdCustomer)) {
                setCustomer(createdCustomer);
            } else {
                const selectedCustomer = customers.find(customer => customer.customerId === orderDetails.customer.customerId);
                setCustomer(selectedCustomer);
            }
        }
    }, [customers, orderDetails, createdCustomer]);

    useEffect(() => {
        if (shippingMethods && (orderDetails && orderDetails.shippingDetails)) {
            const {shippingMethodId} = orderDetails.shippingDetails.shippingMethod;
            const selectedShippingMethod = shippingMethods.find(method => method.shippingMethodId === shippingMethodId);
            if (selectedShippingMethod) {
                setShippingMethod(selectedShippingMethod);
                setShippingMethodId(selectedShippingMethod.shippingMethodId);
            }
        }
    }, [shippingMethods, orderDetails]);

    useEffect(() => {
        if (shippingMethod && shippingMethod.name === 'custom') {
            setIsCustom(true);
        } else {
            setIsCustom(false);
        }
    }, [shippingMethod]);

    const onChangedProductInput = useCallback((event) => {
        const {value, name} = event.target;
        setProductDetails(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    }, []);

    const onChangedAddressInput = useCallback((event) => {
        const {value} = event.target;
        setAddress(value);
    }, []);

    const onCustomerSelectHandler = useCallback((customer) => {
        if (!customer) {
            setCustomer({});
        } else {
            setCustomer(customer);
        }
    }, []);

    const onManagerSelectHandler = useCallback((manager) => {
        if (!manager) {
            setManager({});
        } else {
            setManager(manager);
        }
    }, []);

    const onShippingMethodSelectHandler = useCallback((event) => {
        const {value} = event.target;
        const selectedShippingMethod = shippingMethods.find(method => method.shippingMethodId === value);
        setShippingMethod(selectedShippingMethod);
        setShippingMethodId(value);
    }, [shippingMethods]);

    const onStatusSelectHandler = useCallback((event) => {
        const {value, name} = event.target;
        setProductDetails(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    }, []);

    const onSubmitHandler = useCallback(async (e) => {
        e.preventDefault();
        const {shippingDetails, orderId} = orderDetails;
        try {
            dispatch(setIsLoading(true));
            const response = await OrderService.update({
                orderId,
                product: productDetails,
                customerId: customer.customerId,
                managerId: manager.userId,
                shippingDetails: {
                    shippingDetailsId: shippingDetails.shippingDetailsId,
                    shippingMethodId,
                    address: {
                        addressId: shippingDetails.address.addressId,
                        address: isCustom ? address : {city, warehouse},
                        isCustom
                    },
                }
            });
            if (response.success) {
                dispatch(setIsLoading(false));
                history.push(`/orders/${orderId}`);
            } else {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: 'Error', success: false}));
            }
        } catch {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: 'Error', success: false}));
        }
    }, [
        address,
        customer,
        manager,
        productDetails,
        shippingMethodId,
        orderDetails,
        isCustom,
        city,
        warehouse,
        dispatch,
        history
    ]);

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
            isCustom={isCustom}
            address={address}
            shippingMethods={shippingMethods}
            shippingMethod={shippingMethod}
            onChangedAddressInput={onChangedAddressInput}
            onShippingMethodSelectHandler={onShippingMethodSelectHandler}
            onStatusSelectHandler={onStatusSelectHandler}
            buttonText={t('EDIT_ORDER')}
        />
    );
};
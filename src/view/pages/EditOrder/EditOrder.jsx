import {SaveOrderForm} from '../../components/SaveOrderForm/SaveOrderForm';
import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {editOrderStyles} from './EditOrder.style';
import isEmpty from 'lodash/isEmpty';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {useTranslation} from 'react-i18next';
import {useOrderDetailsById, useShippingMethods} from '../../../utils/hooks/orderHooks';
import OrderService from "../../../services/OrderService";
import {useManagers} from '../../../utils/hooks/userHooks';
import {useCustomers} from '../../../utils/hooks/customerHooks';

const useStyles = makeStyles(editOrderStyles);

export const EditOrder = ({history}) => {
    const classes = useStyles();
    const {id} = useParams();
    const dispatch = useDispatch();
    const [orderDetails] = useOrderDetailsById(id);
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
    const {t} = useTranslation();
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [status, setStatus] = useState(0);
    const orderStoreDescription = useSelector(state => state.orderReducer.description);

    const mapProducts = useCallback((orderToProducts, currency) => {
        return orderToProducts.map((orderToProduct) => {
            const {orderProductId, amount, orderProductPrice, product} = orderToProduct;
            const {productId, name} = product;
            return {
                orderProductId,
                productId,
                amount,
                price: orderProductPrice,
                totalPrice: orderProductPrice * amount,
                name,
                currency
            }
        });
    }, []);

    useEffect(() => {
        if (!isEmpty(orderDetails)) {
            setAddress(JSON.parse(orderDetails.shippingDetails.address.address));
            setOrderedProducts(mapProducts(orderDetails.orderToProducts, orderDetails.currency));
            setStatus(orderDetails.status);
        }
    }, [orderDetails, mapProducts]);

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

    const onChangedAddressInput = useCallback((input) => {
        const {city, warehouse, target} = input;
        if (city !== undefined) {
            setAddress(prevState => ({...prevState, city}));
        }
        if (warehouse !== undefined) {
            setAddress(prevState => ({...prevState, warehouse}));
        }
        if (target !== undefined) {
            setAddress(target.value);
        }
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

    const onSubmitHandler = useCallback(async (e) => {
        e.preventDefault();
        const {shippingDetails, orderId} = orderDetails;
        try {
            dispatch(setIsLoading(true));
            const response = await OrderService.update({
                orderId,
                description: orderStoreDescription,
                products: orderedProducts,
                customerId: customer.customerId,
                managerId: manager.userId,
                shippingDetails: {
                    shippingDetailsId: shippingDetails.shippingDetailsId,
                    shippingMethodId,
                    address: {
                        addressId: shippingDetails.address.addressId,
                        address: address,
                        isCustom
                    },
                },
                status
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
        history,
        address,
        orderStoreDescription,
        customer,
        manager,
        shippingMethodId,
        orderDetails,
        isCustom,
        dispatch,
        orderedProducts,
        status
    ]);

    const onStatusSelectHandler = useCallback((value) => {
        setStatus(value);
    }, []);

    return (
        <SaveOrderForm
            history={history}
            classes={classes}
            onSubmitHandler={onSubmitHandler}
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
            buttonText={t('SAVE')}
            getProducts={setOrderedProducts}
            status={status}
            onSubmit={onSubmitHandler}
            orderedProducts={orderedProducts}
            isEdit={true}
            orderDetails={orderDetails}
            onNovaposhtaAddressSelectHandler={onChangedAddressInput}
        />
    );
};

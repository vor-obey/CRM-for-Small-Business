import React, {useState, useEffect, useCallback} from 'react';
import {makeStyles} from '@material-ui/core';
import {createOrderPageStyles} from './CreateOrderPage.style'
import {useDispatch, useSelector} from "react-redux";
import isEmpty from 'lodash/isEmpty';
import {SaveOrderForm} from '../../components/SaveOrderForm/SaveOrderForm';
import {useTranslation} from 'react-i18next';
import {useShippingMethods} from '../../../utils/hooks/orderHooks';
import {useManagers} from '../../../utils/hooks/userHooks';
import {useCustomers} from '../../../utils/hooks/customerHooks';
import {setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import OrderService from '../../../services/OrderService';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';
import {setOrderDescription, setProductsToCart} from "../../../data/store/order/orderActions";

const useStyles = makeStyles(createOrderPageStyles);

export const CreateOrderPage = ({history, chat, selectedCustomerInChat}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const {shippingMethods} = useShippingMethods();
    const [shippingMethod, setShippingMethod] = useState({});
    const {managers, managerLoading} = useManagers();
    const [manager, setManager] = useState({});
    const {customers, setCustomers, customerLoading} = useCustomers();
    const [customer, setCustomer] = useState({});
    const [createdCustomer, setCreatedCustomer] = useState({});
    const [isCustom, setIsCustom] = useState(false);
    const [address, setAddress] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [status, setStatus] = useState(0);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const currentUser = useSelector(state => state.userReducer.currentUser);
    const orderDescription = useSelector(state => state.orderReducer.description);
    const [novaposhtaAddress, setNovaposhtaAddress] = useState({
        city: null,
        warehouse: null
    });

    useEffect(() => {
        if (!isEmpty(selectedCustomerInChat)) {
            setSelectedCustomer(selectedCustomerInChat);
        }
    }, [selectedCustomerInChat]);

    useEffect(() => {
        if (!isEmpty(createdCustomer)) {
            setCustomers(prevState => {
                return [...prevState, createdCustomer];
            });
            setCustomer(createdCustomer);
        }
    }, [createdCustomer, setCustomers]);

    useEffect(() => {
        if (managers && currentUser) {
            const selectedManager = managers.find(manager => manager.userId === currentUser.userId);
            setManager(selectedManager);
        }
    }, [managers, currentUser]);

    useEffect(() => {
        if (shippingMethods.length) {
            setShippingMethod(shippingMethods.find((item) => item.name === 'novaposta'));
        }
    }, [setShippingMethod, shippingMethods]);

    const onManagerSelectHandler = useCallback((manager) => {
        if (!manager) {
            setManager({});
        } else {
            setManager(manager);
        }
    }, []);

    const onCustomerSelectHandler = useCallback((customer) => {
        if (!customer) {
            setCustomer({});
        } else {
            setCustomer(customer);
        }
    }, []);

    const onShippingMethodSelectHandler = useCallback((event) => {
        const {value} = event.target;
        const selectedShippingMethod = shippingMethods.find(method => method.shippingMethodId === value);
        if (selectedShippingMethod.name === 'custom') {
            setIsCustom(true);
        } else {
            setIsCustom(false);
        }
        setShippingMethod(selectedShippingMethod);
    }, [shippingMethods]);

    const onChangedAddressInput = useCallback((event) => {
        const {value} = event.target;
        setAddress(value);
    }, []);

    const onSubmitHandler = useCallback(async (e) => {
        e.preventDefault();
        if ((isEmpty(orderDescription) && isEmpty(selectedProducts)) || isEmpty(manager)
            || isEmpty(customer) || ((isEmpty(novaposhtaAddress.city) || isEmpty(novaposhtaAddress.warehouse)) && (isEmpty(address)))
        ) {
            dispatch(setSnackBarStatus({isOpen: true, message: t('FILL_ALL_THE_FIELDS'), success: false}));
        } else {
            try {
                const response = await OrderService.create({
                    products: selectedProducts,
                    status: status,
                    managerId: manager.userId,
                    customerId: customer.customerId,
                    shippingDetails: {
                        isCustom,
                        address: isCustom ? address : novaposhtaAddress,
                        shippingMethodId: shippingMethod.shippingMethodId
                    },
                    description: orderDescription
                });
                if (response.success) {
                    if (chat) {
                        dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: true}));
                    } else {
                        history.push('/orders');
                    }
                    dispatch(setProductsToCart([]));
                    dispatch(setOrderDescription(''))
                } else {
                    dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
                }
            } catch {
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
            }
        }
    }, [
        t,
        customer,
        manager,
        dispatch,
        history,
        address,
        isCustom,
        shippingMethod,
        selectedProducts,
        status,
        novaposhtaAddress,
        orderDescription,
        chat
    ]);

    const onStatusSelectHandler = useCallback((value) => {
        setStatus(value);
    }, []);

    const onNovaposhtaAddressSelectHandler = useCallback((obj) => {
        const {city, warehouse} = obj;
        if (city !== undefined) {
            setNovaposhtaAddress(prevState => ({...prevState, city}));
        }
        if (warehouse !== undefined) {
            setNovaposhtaAddress(prevState => ({...prevState, warehouse}));
        }
    }, []);

    return (
        <SaveOrderForm
            selectedCustomer={selectedCustomer}
            chat={chat}
            history={history}
            classes={classes}
            customer={customer}
            customers={customers}
            manager={manager}
            managers={managers}
            customerLoading={customerLoading}
            managerLoading={managerLoading}
            onManagerSelectHandler={onManagerSelectHandler}
            onCustomerSelectHandler={onCustomerSelectHandler}
            setCreatedCustomer={setCreatedCustomer}
            shippingMethods={shippingMethods}
            shippingMethod={shippingMethod}
            onShippingMethodSelectHandler={onShippingMethodSelectHandler}
            onStatusSelectHandler={onStatusSelectHandler}
            isCustom={isCustom}
            address={address}
            onChangedAddressInput={onChangedAddressInput}
            buttonText={t('CREATE_ORDER')}
            getProducts={setSelectedProducts}
            status={status}
            onSubmit={onSubmitHandler}
            onNovaposhtaAddressSelectHandler={onNovaposhtaAddressSelectHandler}
        />
    )
};


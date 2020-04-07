import React, {useState, useEffect, useCallback} from 'react';
import {makeStyles} from '@material-ui/core';
import {createOrderPageStyles} from './CreateOrderPage.style'
import {useDispatch, useSelector} from "react-redux";
import {setIsLoading, setNotificationStatus, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import isEmpty from 'lodash/isEmpty';
import {OrderService} from '../../../services/index';
import {SaveOrderForm} from '../../components/SaveOrderForm/SaveOrderForm';
import {useCustomers, useManagers, useShippingMethods} from '../../../utils/customHooks';
import {useTranslation} from 'react-i18next';
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";
import 'react-notifications-component/dist/theme.css';

const useStyles = makeStyles(createOrderPageStyles);

export const CreateOrderPage = ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [productDetails, setProductDetails] = useState({
        description: '',
        currency: 'UAH',
        status: 0
    });
    const [shippingMethods] = useShippingMethods();
    const [shippingMethod, setShippingMethod] = useState({});
    const [managers, , managerLoading] = useManagers();
    const [manager, setManager] = useState({});
    const [customers, setCustomers, customerLoading] = useCustomers();
    const [customer, setCustomer] = useState({});
    const [createdCustomer, setCreatedCustomer] = useState({});
    const city = useSelector(state => state.autocompleteReducer.city);
    const warehouse = useSelector(state => state.autocompleteReducer.warehouse);
    const currentUser = useSelector(state => state.userReducer.currentUser);
    const [isCustom, setIsCustom] = useState(false);
    const [address, setAddress] = useState('');
    const {t} = useTranslation();

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

    const onChangedProductInput = useCallback((event) => {
        const {value, name} = event.target;
        setProductDetails(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    }, []);

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

    const onShippingMethodSelectHandler = (event) => {
        const {value} = event.target;
        const selectedShippingMethod = shippingMethods.find(method => method.shippingMethodId === value);
        if (selectedShippingMethod.name === 'custom') {
            setIsCustom(true);
        } else {
            setIsCustom(false);
        }
        setShippingMethod(selectedShippingMethod);
    };

    const onChangedAddressInput = useCallback((event) => {
        const {value} = event.target;
        setAddress(value);
    }, []);

    const onSubmitHandler = useCallback(async (e) => {
        e.preventDefault();
        if (isEmpty(productDetails) || isEmpty(manager)
            || isEmpty(customer) || isEmpty(city) || isEmpty(warehouse)
        ) {
            dispatch(setSnackBarStatus({isOpen: true, message: t('FILL_ALL_THE_FIElDS'), success: false}));
        } else if (productDetails.description.length > 150) {
            dispatch(setSnackBarStatus({isOpen: true, message: t('TOO_LONG_DESCRIPTION'), success: false}));
        } else {
            try {
                dispatch(setIsLoading(true));
                const response = await OrderService.create({
                    product: productDetails,
                    managerId: manager.userId,
                    customerId: customer.customerId,
                    shippingDetails: {
                        isCustom,
                        address: isCustom ? address : {city, warehouse},
                        shippingMethodId: shippingMethod.shippingMethodId
                    },
                });
                dispatch(setNotificationStatus({notification: 'New Order !'}));
                if (response.success) {
                    dispatch(setIsLoading(false));
                    history.push('/orders');
                } else {
                    dispatch(setIsLoading(false));
                    dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
                }
            } catch {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
            }
        }
    }, [
        t,
        city,
        customer,
        manager,
        productDetails,
        warehouse,
        dispatch,
        history,
        address,
        isCustom,
        shippingMethod
    ]);

    return (
        <SaveOrderForm
            classes={classes}
            customer={customer}
            customers={customers}
            manager={manager}
            managers={managers}
            customerLoading={customerLoading}
            managerLoading={managerLoading}
            onChangedProductInput={onChangedProductInput}
            onManagerSelectHandler={onManagerSelectHandler}
            onCustomerSelectHandler={onCustomerSelectHandler}
            onSubmitHandler={onSubmitHandler}
            setCreatedCustomer={setCreatedCustomer}
            productDetails={productDetails}
            shippingMethods={shippingMethods}
            shippingMethod={shippingMethod}
            onShippingMethodSelectHandler={onShippingMethodSelectHandler}
            onStatusSelectHandler={onChangedProductInput}
            isCustom={isCustom}
            address={address}
            onChangedAddressInput={onChangedAddressInput}
            buttonText={t('CREATE_ORDER')}
        />
    )
};


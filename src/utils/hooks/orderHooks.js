import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setIsLoading, setSnackBarStatus} from '../../data/store/auxiliary/auxiliaryActions';
import {OrderService, ShippingMethodService} from '../../services';
import {COMMON_ERROR_MESSAGE} from '../../constants/statuses';

export const useOrders = () => {
    const [orderList, setOrdersList] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                // dispatch(setIsLoading(true));
                const response = await OrderService.list();
                setOrdersList(response);
                // dispatch(setIsLoading(false));
                setLoading(false);
            } catch (e) {
                setLoading(false);
                // dispatch(setIsLoading(false));
                // dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
            }
        };
        fetchOrders();
    }, [dispatch]);

    return [orderList, setOrdersList, loading];
};

export const useOrderDetailsById = (id) => {
    const [orderDetails, setOrderDetails] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOrderById = async (id) => {
            try {
                dispatch(setIsLoading(true));
                const response = await OrderService.findOneById(id);
                setOrderDetails(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
                dispatch(setIsLoading(false))
            }
        };
        fetchOrderById(id);
    }, [id, dispatch]);

    return [orderDetails, setOrderDetails];
};

export const useShippingMethods = () => {
    const [methods, setMethods] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchShippingMethods = async () => {
            try {
                dispatch(setIsLoading(true));
                const methods = await ShippingMethodService.list();
                setMethods(methods);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
            }
        };
        fetchShippingMethods();
    }, [dispatch]);

    return [methods, setMethods];
};

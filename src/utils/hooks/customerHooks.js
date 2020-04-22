import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setIsLoading, setSnackBarStatus} from '../../data/store/auxiliary/auxiliaryActions';
import CustomerService from '../../services/CustomerService';
import {COMMON_ERROR_MESSAGE} from '../../constants/statuses';
import SourcesService from '../../services/SourcesService';

export const useCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                setLoading(true);
                dispatch(setIsLoading(true));
                const customers = await CustomerService.list();
                setCustomers(customers);
                dispatch(setIsLoading(false));
                setLoading(false);
            } catch (e) {
                setLoading(false);
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
            }
        };
        fetchCustomers();
    }, [dispatch]);

    return [customers, setCustomers, loading];
};

export const useCustomerById = (id) => {
    const [customer, setCustomer] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCustomerById = async (id) => {
            try {
                dispatch(setIsLoading(true));
                const response = await CustomerService.findOneById(id);
                setCustomer(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE}));
            }
        };

        fetchCustomerById(id);
    }, [dispatch, id]);

    return customer;
};

export const useSources = () => {
    const [sources, setSources] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSources = async () => {
            try {
                dispatch(setIsLoading(true));
                const sources = await SourcesService.list();
                setSources(sources);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
            }
        };
        fetchSources();
    }, [dispatch]);

    return sources;
};
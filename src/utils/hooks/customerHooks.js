import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setIsLoading, setSnackBarStatus} from '../../data/store/auxiliary/auxiliaryActions';
import CustomerService from '../../services/CustomerService';
import {COMMON_ERROR_MESSAGE} from '../../constants/statuses';
import SourcesService from '../../services/SourcesService';

export const useCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [customerLoading, setCustomerLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                setCustomerLoading(true);
                const customers = await CustomerService.list();
                setCustomers(customers);
                setCustomerLoading(false);
            } catch (e) {
                setCustomerLoading(false);
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
            }
        };
        fetchCustomers();
    }, [dispatch]);

    return {customers, setCustomers, customerLoading};
};

export const useCustomerById = (id) => {
    const [customerDetails, setCustomerDetails] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCustomerById = async (id) => {
            try {
                dispatch(setIsLoading(true));
                const response = await CustomerService.findOneById(id);
                setCustomerDetails(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE}));
            }
        };

        return () => fetchCustomerById(id);
    }, [dispatch, id]);

    return {customerDetails}
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

    return {sources, setSources};
};

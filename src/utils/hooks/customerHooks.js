import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCustomerById, getCustomers, getSources} from "../../data/store/customer/customerActions";

export const useCustomers = () => {
    const dispatch = useDispatch();
    const customers = useSelector(state => state.customerReducer.customers);
    const customersStatus = useSelector(state => state.customerReducer.customerStatus);

    useEffect(() => {
        if(customers.length < 1 && !customersStatus.isLoading && !customersStatus.isSuccess) {
                 dispatch(getCustomers())
        }
    }, [dispatch, customers, customersStatus.isLoading, customersStatus.isSuccess]);

    return {customers};
};

export const useCustomerById = (id) => {
    const dispatch = useDispatch();
    const customerDetails = useSelector(state => state.customerReducer.customerDetails);

    useEffect(() => {
        if(!customerDetails || customerDetails.customerId !== id){
            dispatch(getCustomerById(id))
            }
    }, [dispatch, id, customerDetails]);

    return {customerDetails}
};

export const useSources = () => {
    const dispatch = useDispatch();
    const sources = useSelector(state => state.customerReducer.sources)

    useEffect(() => {
        if(!sources) {
            dispatch(getSources())
        }
    }, [dispatch, sources]);

    return {sources};
};

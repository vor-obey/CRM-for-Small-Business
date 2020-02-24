import React, {useCallback, useEffect, useState} from 'react';

import {SaveCustomerForm} from "../../components/SaveCustomerForm/SaveCustomerForm";
import {CustomerService} from "../../../services";
import SourcesService from "../../../services/SourcesService";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";
import {useDispatch} from "react-redux";

export const CreateCustomer = (props) => {
    const {history} = props;
    const [customerDetails, setCustomerDetails] = useState({
        username: '',
        name: '',
        contactNumber: '',
        contactEmail: '',
        details: '',
        sourceId: '',
    });
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
                dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE}))
            }
        };
        fetchSources();
    }, [dispatch]);

    const onChangeHandler = useCallback((event) => {
        const {name, value} = event.target;
        setCustomerDetails(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }, []);

    const onSubmitHandler = useCallback(async (event, customerDetails) => {
        event.preventDefault();
        try {
            dispatch(setIsLoading(true));
            const response = await CustomerService.create(customerDetails);
            if (response) {
                history.push('/customers');
                dispatch(setIsLoading(false));
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE}))
        }
    }, [history, dispatch]);

    const renderSources = () => {
        if (!sources || !sources.length) {
            return null;
        }

        return sources.map(source => {
            return (
                <option key={source.sourceId} value={source.sourceId}>{source.name}</option>
            );
        })
    };

    return (
        <SaveCustomerForm
            details={customerDetails}
            renderSource={renderSources}
            titleText="Create Customer"
            onSubmit={onSubmitHandler}
            submitText="Add new customer"
            onChange={onChangeHandler}
        />
    )
};
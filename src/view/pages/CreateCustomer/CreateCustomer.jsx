import React, {useCallback, useEffect, useState} from 'react';

import {SaveCustomerForm} from "../../components/SaveCustomerForm/SaveCustomerForm";
import {CustomerService} from "../../../services";
import SourcesService from "../../../services/SourcesService";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";
import {useDispatch} from "react-redux";

export const CreateCustomer = ({
                                   history,
                                   updateCustomerList
                               }) => {
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
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
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
        event.stopPropagation();
        event.preventDefault();
        try {
            dispatch(setIsLoading(true));
            const response = await CustomerService.create(customerDetails);
            if (response) {
                if (typeof updateCustomerList === 'function') {
                    updateCustomerList(response);
                    dispatch(setIsLoading(false));
                } else {
                    history.push('/customers');
                    dispatch(setIsLoading(false));
                }
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
        }
    }, [history, dispatch, updateCustomerList]);

    const renderSources = useCallback(() => {
        if (!sources || !sources.length) {
            return null;
        }

        return sources.map(source => {
            return (
                <option key={source.sourceId} value={source.sourceId}>{source.name}</option>
            );
        })
    }, [sources]);

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

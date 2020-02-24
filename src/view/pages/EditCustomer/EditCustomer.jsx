import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { SaveCustomerForm} from '../../components/SaveCustomerForm/SaveCustomerForm';
import {CustomerService} from "../../../services";
import SourcesService from "../../../services/SourcesService";
import {useDispatch} from "react-redux";
import {setSnackBarStatus, setIsLoading} from "../../../data/store/auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";

export const EditCustomer = (props) => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const [customerDetails, setCustomerDetails] = useState({});
    const [sources, setSources] = useState([]);
    const {history} = props;

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setIsLoading(true));
                const [customerDetails, sources] = await Promise.all([CustomerService.findOneById(id), SourcesService.list()]);
                const {orders, source: {sourceId}, ...customer} = customerDetails;
                setCustomerDetails({sourceId, ...customer});
                setSources(sources);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE}))
            }
        };
        fetchData();
    }, [id, dispatch]);

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
            const response = await CustomerService.update(customerDetails);
            if (response) {
                history.goBack();
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
            onSubmit={onSubmitHandler}
            renderSource={renderSources}
            titleText="Edit Customer"
            submitText="Edit"
            details={customerDetails}
            onChange={onChangeHandler}
        />
    )
};

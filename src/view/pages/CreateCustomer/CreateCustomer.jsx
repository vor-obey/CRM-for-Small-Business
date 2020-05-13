import React, {useCallback, useState} from 'react';

import {SaveCustomerForm} from "../../components/SaveCustomerForm/SaveCustomerForm";
import {CustomerService} from "../../../services";
import {addCustomer, setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {useSources} from '../../../utils/hooks/customerHooks';
import isEmpty from 'lodash/isEmpty';
import {useSelector} from "react-redux";

export const CreateCustomer = ({
                                   modal,
                                   history,
                                   updateCustomerList
                               }) => {

    const info = useSelector(state => state.auxiliaryReducer.info);
    const [customerDetails, setCustomerDetails] = useState({
        username: '',
        name: '',
        contactNumber: '',
        contactEmail: '',
        details: '',
        sourceId: '',
    });
    const sources = useSources();
    const dispatch = useDispatch();
    const {t} = useTranslation('');

    const onChangeHandler = useCallback((event) => {
        const {name, value} = event.target;
        setCustomerDetails(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
        if (modal === true) {
            dispatch(addCustomer({[name]: value}));
        }
    }, [dispatch, modal]);

    const onSubmitHandler = useCallback(async (event, customerDetails) => {
        event.stopPropagation();
        event.preventDefault();
        if (customerDetails.contactNumber && (customerDetails.contactNumber.length < 10 || customerDetails.contactNumber.length > 12)) {
            dispatch(setSnackBarStatus({isOpen: true, message: t('INVALID_NUMBER'), success: false}))
        } else {
            try {
                dispatch(setIsLoading(true));
                const response = await CustomerService.create(customerDetails);
                if (response) {
                    if (typeof updateCustomerList === 'function') {
                        updateCustomerList(response);
                        dispatch(setIsLoading(false));
                        dispatch(addCustomer({}));
                    } else {
                        history.push('/customers');
                        dispatch(setIsLoading(false));
                    }
                }
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
            }
        }
    }, [t, history, dispatch, updateCustomerList]);

    const renderSources = useCallback(() => {
        if (isEmpty(sources)) {
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
            setCustomerDetails={setCustomerDetails}
            renderSource={renderSources}
            titleText={t('CREATE_CUSTOMER')}
            onSubmit={onSubmitHandler}
            submitText={t('CREATE')}
            onChange={onChangeHandler}
            info={info}
            modal={modal}
        />
    )
};

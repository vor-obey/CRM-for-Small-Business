import React, {useCallback} from 'react';

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
                                   history,
                                   updateCustomerList
                               }) => {

    const info = useSelector(state => state.auxiliaryReducer.info);
    const sources = useSources();
    const dispatch = useDispatch();
    const {t} = useTranslation('');

    console.log('info', info);

    const onChangeHandler = useCallback((event) => {
        const {name, value} = event.target;
        dispatch(addCustomer({[name]: value}));
    }, [dispatch]);

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
            details={info}
            renderSource={renderSources}
            titleText={t('CREATE_CUSTOMER')}
            onSubmit={onSubmitHandler}
            submitText={t('CREATE')}
            onChange={onChangeHandler}
        />
    )
};

import React, {useCallback} from 'react';

import {SaveCustomerForm} from "../../components/SaveCustomerForm/SaveCustomerForm";
import {CustomerService} from "../../../services";
import {closeModal, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {useSources} from '../../../utils/hooks/customerHooks';
import isEmpty from 'lodash/isEmpty';
import {useSelector} from "react-redux";
import {addCustomerDetail} from "../../../data/store/customer/customerActions";

export const CreateCustomer = ({
                                   history,
                                   updateCustomerList
                               }) => {

    const details = useSelector(state => state.customerReducer.details);
    const sources = useSources();
    const dispatch = useDispatch();
    const {t} = useTranslation('');

    const onChangeHandler = useCallback((event) => {
        const {name, value} = event.target;
        dispatch(addCustomerDetail({[name]: value}));
    }, [dispatch]);

    const onSubmitHandler = useCallback(async (event, customerDetails) => {
        event.preventDefault();
        if (customerDetails.contactNumber && (customerDetails.contactNumber.length < 10 || customerDetails.contactNumber.length > 12)) {
            dispatch(setSnackBarStatus({isOpen: true, message: t('INVALID_NUMBER'), success: false}))
        } else {
            try {
                const response = await CustomerService.create(customerDetails);
                if (response) {
                    if (typeof updateCustomerList === 'function') {
                        updateCustomerList(response);
                        dispatch(addCustomerDetail({
                            username: '',
                            name: '',
                            contactNumber: '',
                            contactEmail: '',
                            details: '',
                            sourceId: '',
                        }));
                    } else {
                        history.push('/customers');
                        dispatch(addCustomerDetail({
                            username: '',
                            name: '',
                            contactNumber: '',
                            contactEmail: '',
                            details: '',
                            sourceId: '',
                        }));
                    }
                    dispatch(closeModal());
                }

            } catch (e) {
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
            details={details}
            renderSource={renderSources}
            titleText={t('CREATE_CUSTOMER')}
            onSubmit={onSubmitHandler}
            submitText={t('CREATE')}
            onChange={onChangeHandler}
        />
    )
};

import React, {useCallback} from 'react';
import {SaveCustomerForm} from "../../components/SaveCustomerForm/SaveCustomerForm";
import {closeModal, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {useSources} from '../../../utils/hooks/customerHooks';
import isEmpty from 'lodash/isEmpty';
import {useSelector} from "react-redux";
import {addCustomerDetail, createCustomer} from "../../../data/store/customer/customerActions";
import {CUSTOMERS} from "../../../constants/routes";

export const CreateCustomer = ({
                                   history,
                                   updateCustomerList,
                                   selectedCustomer
                               }) => {

    const details = useSelector(state => state.customerReducer.details);
    const {sources} = useSources();
    const dispatch = useDispatch();
    const {t} = useTranslation('');
    const customerDetails = {
        username: '',
        name: '',
        contactNumber: '',
        contactEmail: '',
        details: '',
        sourceId: ''
    }

    const onChangeHandler = useCallback((event) => {
        const {name, value} = event.target;
        dispatch(addCustomerDetail({[name]: value}));
    }, [dispatch]);

    const onSubmitted = useCallback((response) => {
        if (typeof updateCustomerList === 'function') {
            updateCustomerList(response);
        } else {
            history.push(CUSTOMERS);
        }

        dispatch(addCustomerDetail(customerDetails));
        dispatch(closeModal());

    }, [history, updateCustomerList, dispatch, customerDetails]);

    const onSubmitHandler = useCallback(async (event, customerDetails) => {
        event.preventDefault();
        if (customerDetails.contactNumber && (customerDetails.contactNumber.length < 10 || customerDetails.contactNumber.length > 12)) {
            dispatch(setSnackBarStatus({isOpen: true, message: t('INVALID_NUMBER'), success: false}))
        } else {
               await dispatch(createCustomer({customerDetails, onSubmitted}))
        }
    }, [dispatch, t, onSubmitted]);

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
            selectedCustomer={selectedCustomer}
            details={details}
            renderSource={renderSources}
            titleText={t('CREATE_CUSTOMER')}
            onSubmit={onSubmitHandler}
            submitText={t('CREATE')}
            onChange={onChangeHandler}
        />
    )
};

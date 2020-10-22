import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {SaveCustomerForm} from '../../components/SaveCustomerForm/SaveCustomerForm';
import {useDispatch} from "react-redux";
import {setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {useTranslation} from "react-i18next";
import {useCustomerById, useSources} from "../../../utils/hooks/customerHooks";
import {updateCustomer} from "../../../data/store/customer/customerActions";

export const EditCustomer = ({history}) => {
   const {t} = useTranslation('');
   const {id} = useParams();
   const dispatch = useDispatch();
   const { customerDetails } = useCustomerById(id);
   const [customerDetailsEdit, setCustomerDetailsEdit] = useState(null);
   const {sources} = useSources(id);
   const [sourcesEdit, setSourcesEdit] = useState(null);

   useEffect(() => {
      if (customerDetails && !customerDetailsEdit) {
         setCustomerDetailsEdit(customerDetails);
      }
   }, [customerDetails, customerDetailsEdit]);

   useEffect(() => {
      if (customerDetails) {
         setCustomerDetailsEdit({...customerDetails});
         setSourcesEdit(sources);
      }
   }, [id, dispatch, setCustomerDetailsEdit, setSourcesEdit, customerDetails, sources]);

   const onChangeHandler = useCallback((event) => {
      const {name, value} = event.target;
      setCustomerDetailsEdit(prevState => {
         return {
            ...prevState,
            [name]: value
         }
      })
   }, []);

   const onSubmitHandler = useCallback((event, customerDetails) => {
      event.preventDefault();
         if (customerDetails.contactNumber && (customerDetails.contactNumber.length < 10 || customerDetails.contactNumber.length > 12)) {
         dispatch(setSnackBarStatus({isOpen: true, message: t('INVALID_NUMBER'), success: false}))
      } else {
            dispatch(updateCustomer(customerDetails))
      }
   }, [t, dispatch]);

   const renderSources = useCallback(() => {
      if (!sourcesEdit || sourcesEdit.length < 1) {
         return null;
      }

      return sourcesEdit.map(source => {
         return (
            <option key={source.sourceId} value={source.sourceId}>{source.name}</option>
         );
      })
   }, [sourcesEdit]);

   return (
      <SaveCustomerForm
         onSubmit={onSubmitHandler}
         renderSource={renderSources}
         titleText={t('EDIT_CUSTOMER')}
         submitText={t('SAVE')}
         details={customerDetailsEdit}
         onChange={onChangeHandler}
      />
   )
};

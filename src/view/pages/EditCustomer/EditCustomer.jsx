import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {SaveCustomerForm} from '../../components/SaveCustomerForm/SaveCustomerForm';
import {CustomerService} from "../../../services";
import SourcesService from "../../../services/SourcesService";
import {useDispatch} from "react-redux";
import {setSnackBarStatus, setIsLoading} from "../../../data/store/auxiliary/auxiliaryActions";
import {useTranslation} from "react-i18next";

export const EditCustomer = ({history}) => {
   const {t} = useTranslation('');
   const {id} = useParams();
   const dispatch = useDispatch();
   const [customerDetails, setCustomerDetails] = useState({});
   const [sources, setSources] = useState([]);

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
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}))
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
      if (customerDetails.contactNumber.length < 10 || customerDetails.contactNumber.length > 12) {
         dispatch(setSnackBarStatus({isOpen: true, message: t('INVALID_NUMBER'), success: false}))
      } else {
         try {
            dispatch(setIsLoading(true));
            const response = await CustomerService.update(customerDetails);
            if (response) {
               history.goBack();
               dispatch(setIsLoading(false));
            }
         } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}))
         }
      }
   }, [t, history, dispatch]);

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
         onSubmit={onSubmitHandler}
         renderSource={renderSources}
         titleText={t('EDIT_CUSTOMER')}
         submitText={t('SAVE')}
         details={customerDetails}
         onChange={onChangeHandler}
      />
   )
};

import React, {useCallback, useEffect, useState} from 'react';

import SaveCustomerForm from "../../components/SaveCustomerForm/SaveCustomerForm";
import {CustomerService} from "../../../services";
import SourcesService from "../../../services/SourcesService";

const CreateCustomer = (props) => {

   const [sources, setSources] = useState([]);

   const {history} = props;

   const onSubmitHandler = useCallback(async (userInput) => {
      const {
         ...body
      } = userInput;
      try {
         await CustomerService.postCustomer(body);
         history.push('/customers');
      } catch (e) {
         console.log(e);
      }
   }, [ history]);

   useEffect(() => {
      (async function () {
         try {
            const [sources] = await Promise.all(
               [
                  SourcesService.list(),
               ]
            );
            setSources(sources);
         } catch (e) {
            console.log(e);
         }
      })()
   }, []);

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
         renderSource={renderSources()}
         titleText="Create Customer"
         onSubmit={onSubmitHandler}
         submitText="Add new customer"
      />
   )
};

export default CreateCustomer;

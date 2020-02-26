import React, {useCallback, useEffect, useState} from "react";

import {
   Divider,
   Button,
   Grid,
   Typography,
} from "@material-ui/core";

import {CustomAutocomplete} from "../../../components/Autocomplete/Autocomplete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import {CustomModal} from "../../../components/CustomModal/CustomModal";
import {SaveCustomerForm} from "../../../components/SaveCustomerForm/SaveCustomerForm";
import {setIsLoading, setSnackBarStatus} from "../../../../data/store/auxiliary/auxiliaryActions";
import SourcesService from "../../../../services/SourcesService";
import CustomerService from "../../../../services/CustomerService";
import {COMMON_ERROR_MESSAGE} from "../../../../constants/statuses";
import {useDispatch, useSelector} from "react-redux";

export const CustomerForm = (props) => {

   const {
      classes,
      setUpdate,
      customers,
      managers,
   } = props;

   const [customerDetails, setCustomerDetails] = useState({
      customerId: "",
      username: '',
      name: '',
      contactNumber: '',
      contactEmail: '',
      details: '',
      sourceId: '',
   });
   const [managerId, setManagerId] = useState('');

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isCustomerAutocompleteOpen, setIsCustomerAutocompleteOpen] = useState(false);
   const [isManagerAutocompleteOpen, setIsManagerAutocompleteOpen] = useState(false);
   const [sources, setSources] = useState([]);
   const dispatch = useDispatch();
   const currentUser = useSelector(state => state.userReducer.currentUser);

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

   const toggleCustomerAutocomplete = useCallback(() => {
      setIsCustomerAutocompleteOpen(prevState => !prevState);
   }, []);

   const toggleManagerAutocomplete = useCallback(() => {
      setIsManagerAutocompleteOpen(prevState => !prevState);
   }, []);

   const toggleModal = useCallback(() => {
      setIsModalOpen(prevState => !prevState);
   }, []);

   const onChangedCustomerInput = useCallback((event) => {
      const {name, value} = event.target;
      setCustomerDetails(prevState => {
         return {
            ...prevState,
            [name]: value
         }
      })
   }, []);

   const onSelectedCustomer = useCallback((async (customer) => {
      if (!customer) {
         setCustomerDetails({
            customerId: "",
            username: '',
            name: '',
            contactNumber: '',
            contactEmail: '',
            details: '',
            sourceId: '',
         });
      } else {
         setCustomerDetails({
            ...customer
         });
      }
   }), []);

   const updateCustomersList = useCallback(() => {
      setUpdate(true);
   }, [setUpdate]);

   const onSubmitHandler = useCallback(async (event, customerDetails) => {
      event.preventDefault();
      try {
         dispatch(setIsLoading(true));
         const response = await CustomerService.create(customerDetails);
         if (response) {
            dispatch(setIsLoading(false));
            updateCustomersList();
         }
      } catch (e) {
         dispatch(setIsLoading(false));
         dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE}))
      }
   }, [dispatch, updateCustomersList]);

   const onManagerSelectHandler = async (manager) => {
      if (!manager) {
         setManagerId('');
      } else {
         setManagerId(manager.userId);
      }
   };

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

   const getOptionSelected = useCallback(() => {
      const manager = managers.find((manager) => manager.userId === currentUser.userId);
      console.log(manager);
      return manager;
   }, [currentUser, managers]);

   return (
      <>
         <Grid item xl={12} xs={12}>
            <Typography className={classes.heading} variant='h6'>
               Customer
            </Typography>
            <Divider/>
         </Grid>
         <Grid item lg={1} sm={2} md={2} xs={2} className={classes.gridButton}>
            <Button
               margin='normal'
               color='primary'
               fullWidth
               onClick={toggleModal}
            >
               <PersonAddIcon/>
            </Button>
         </Grid>
         <CustomModal
            open={isModalOpen}
            classes={classes}
            handleClose={toggleModal}
         >
            <SaveCustomerForm
               details={customerDetails}
               renderSource={renderSources}
               titleText="Create Customer"
               onSubmit={onSubmitHandler}
               submitText="Add new customer"
               onChange={onChangedCustomerInput}
            />
         </CustomModal>
         <Grid item lg={11} sm={10} md={10} xs={10} className={classes.gridCustomers}>
            <CustomAutocomplete
               isOpen={isCustomerAutocompleteOpen}
               options={customers}
               isLoading={!customers.length}
               onSelectHandler={onSelectedCustomer}
               onToggle={toggleCustomerAutocomplete}
               onClose={toggleCustomerAutocomplete}
               inputLabel='Select customer'
               primaryText='name'
               secondaryText='username'
               optionKey='customerId'
            />
         </Grid>
         <Grid item lg={12} xs={12}>
            <Grid item>
               <CustomAutocomplete
                  isOpen={isManagerAutocompleteOpen}
                  options={managers}
                  isLoading={!managers.length}
                  onToggle={toggleManagerAutocomplete}
                  onClose={toggleManagerAutocomplete}
                  onSelectHandler={onManagerSelectHandler}
                  getOptionSelected={getOptionSelected}
                  inputLabel='Select Manager'
                  primaryText='firstName'
                  secondaryText='lastName'
                  optionKey='userId'
               />
            </Grid>
         </Grid>
      </>
   );
};

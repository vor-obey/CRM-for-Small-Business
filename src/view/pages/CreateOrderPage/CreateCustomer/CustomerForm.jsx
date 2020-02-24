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
      open,
      classes,
      setUpdate,
      customers,
      onSelectHandler,
      onClick,
      onClose,
      managers,
      onManagerSelectHandler,
   } = props;

   const [isOpen, setIsOpen] = useState(false);
   const [sources, setSources] = useState([]);
   const [isOpenManager, setIsOpenManager] = useState(false);
   const dispatch = useDispatch();
   const currentUser = useSelector(state => state.userReducer.currentUser);

   const [customerDetails, setCustomerDetails] = useState({
      username: '',
      name: '',
      contactNumber: '',
      contactEmail: '',
      details: '',
      sourceId: '',
   });


   const onToggle = () => {
      setIsOpen(prevState => !prevState);
   };

   const onToggleManager = () => {
      setIsOpenManager(prevState => !prevState);
   };

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

   const onChangeHandler = useCallback((event) => {
      const {name, value} = event.target;
      setCustomerDetails(prevState => {
         return {
            ...prevState,
            [name]: value
         }
      })
   }, []);

   const getUpdate = useCallback(() => {
      setUpdate(true);
   }, [setUpdate]);

   const onSubmitHandler = useCallback(async (event, customerDetails) => {
      event.preventDefault();
      try {
         dispatch(setIsLoading(true));
         const response = await CustomerService.create(customerDetails);
         if (response) {
            dispatch(setIsLoading(false));
            getUpdate();
            onClose();
         }
      } catch (e) {
         dispatch(setIsLoading(false));
         dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE}))
      }
   }, [dispatch, onClose, getUpdate]);

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
      return(managers.find((manager) => manager.userId === currentUser.userId));
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
               onClick={onClick}
            >
               <PersonAddIcon/>
            </Button>
         </Grid>
         <CustomModal
            open={open}
            classes={classes}
            handleClose={onClose}
         >
            <SaveCustomerForm
               details={customerDetails}
               renderSource={renderSources}
               titleText="Create Customer"
               onSubmit={onSubmitHandler}
               submitText="Add new customer"
               onChange={onChangeHandler}
            />
         </CustomModal>
         <Grid item lg={11} sm={10} md={10} xs={10} className={classes.gridCustomers}>
            <CustomAutocomplete
               isOpen={isOpen}
               options={customers}
               isLoading={!customers.length}
               onSelectHandler={onSelectHandler}
               onToggle={onToggle}
               onClose={onToggle}
               inputLabel='Select customer'
               primaryText='name'
               secondaryText='username'
               optionKey='customerId'
            />
         </Grid>
         <Grid item lg={12} xs={12}>
            <Grid item>
               <CustomAutocomplete
                  isOpen={isOpenManager}
                  options={managers}
                  isLoading={!managers.length}
                  onToggle={onToggleManager}
                  onClose={onToggleManager}
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

import React, {useState} from "react";

import {
   InputLabel,
   Button,
   Divider,
   Grid,
   Dialog,
   DialogActions,
   DialogContent,
   Select,
   TextField,
   Typography,
   FormControl
} from "@material-ui/core";

import NumberFormat from "react-number-format";
import {CustomAutocomplete} from "../../../components/Autocomplete/Autocomplete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CloseIcon from '@material-ui/icons/Close';
import {CreateCustomer} from "../../CreateCustomer/CreateCustomer";

export const CustomerFormTemp = (props) => {
   const {
      classes,
      customers,
      onSelectHandler,
      customerDetails,
      onChangedInput,
      onSourceSelectHandler,
      onClick,
      onClickClose,
      open,
      sources,
      sourceId,
   } = props;
   const [isOpen, setIsOpen] = useState(false);

   const onToggle = () => {
      setIsOpen(prevState => !prevState);
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
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={onClickClose}>
               <DialogContent>
                  <form className={classes.container}>
                     <CreateCustomer/>
                  </form>
               </DialogContent>
               <DialogActions>
                  <Button onClick={onClickClose} color="black">
                     <CloseIcon/>
                  </Button>
               </DialogActions>
            </Dialog>
         </Grid>
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

         <Grid item lg={3} md={4} sm={6} xs={12}>
            <TextField
               className={classes.inputUserName}
               required
               autoFocus
               margin="normal"
               variant="outlined"
               label="Username"
               name='username'
               value={customerDetails.username}
               onChange={onChangedInput}
            />
         </Grid>
         <Grid item lg={3} md={4} sm={6} xs={12}>
            <TextField
               className={classes.inputName}
               required
               autoFocus
               margin="normal"
               variant="outlined"
               label="Name"
               name='name'
               value={customerDetails.name}
               onChange={onChangedInput}
            />
         </Grid>
         <Grid item lg={3} md={4} sm={6} xs={12}>
            <TextField
               className={classes.inputName}
               required
               autoFocus
               margin="normal"
               variant="outlined"
               label="Email Address"
               name='contactEmail'
               value={customerDetails.contactEmail}
               onChange={onChangedInput}
            />
         </Grid>
         <Grid item lg={3} sm={6} xs={12}>
            <NumberFormat
               className={classes.inputNumber}
               customInput={TextField}
               label={"Contact number"}
               name="contactNumber"
               variant={"outlined"}
               format={"+38 (###) ###-##-##"}
               margin="normal"
               required
               value={customerDetails.contactNumber}
               onChange={onChangedInput}
            />
         </Grid>
         <Grid item xs={12} className={classes.gridDetails}>
            <TextField
               label="Details"
               name="details"
               variant={"outlined"}
               required
               fullWidth
               rows="4"
               multiline
               value={customerDetails.details}
               onChange={onChangedInput}
            />
         </Grid>
         <Grid item lg={12} xs={12} className={classes.gridSource}>
            <FormControl variant={"outlined"} fullWidth lg={12} xs={12}>
               <InputLabel className={classes.labelInput} variant={"outlined"}>
                  Select Source
               </InputLabel>
               <Select
                  native
                  fullWidth
                  name='sourceId'
                  value={sourceId}
                  variant="outlined"
                  labelWidth={105}
                  className={classes.selectSource}
                  onChange={onSourceSelectHandler}
               >
                  <option value=""></option>
                  {renderSources()}
               </Select>
            </FormControl>
         </Grid>
      </>
   );
};

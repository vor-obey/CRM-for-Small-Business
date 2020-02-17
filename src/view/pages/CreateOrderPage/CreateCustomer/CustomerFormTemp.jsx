import React, {useState} from "react";
import {Divider, Grid, Select, TextField, Typography, FormControl} from "@material-ui/core";
import NumberFormat from "react-number-format";
import {ShippingDetails} from "../../../components/ShippingDetails/ShippingDetails";
import {CustomAutocomplete} from "../../../components/Autocomplete/Autocomplete";

export const CustomerFormTemp = (props) => {
   const {
      classes,
      autocompleteBreakpoints,
      customers,
      onSelectHandler,
      customerDetails,
      onChangedInput,
      sources,
      methods
   } = props;
   const [isOpen, setIsOpen] = useState(false);

   const onToggle = () => {
      setIsOpen(prevState => !prevState);
   };

   const renderSources = () => {
      if (!sources || !sources.length) {
         return null;
      }

      return sources.map(sources => {
         return (
            <option key={sources.sourceId} value={sources.sourceId}>{sources.name}</option>
         );
      })
   };

   const renderMethods = () => {
      if (!methods || !methods.length) {
         return null;
      }

      return methods.map(methods => {
         return (
            <option key={methods.shippingMethodId} value={methods.shippingMethodId}>{methods.name}</option>
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
         <Grid item lg={12} xs={12} className={classes.gridCustomers}>
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
         <Grid item xl={12} xs={12}>
            <Typography className={classes.heading} variant='h6'>
               Or create new one
            </Typography>
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
         <Grid item xs={12}>
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
         <Grid item lg={12} xs={12}>
            <FormControl fullWidth lg={12} xs={12}>
               <Select
                  native
                  name='sourceId'
                  className={classes.selectSource}
                  variant="outlined"
                  fullWidth
                  onChange={onChangedInput}
                  value={customerDetails.sourceId}
                  required
               >
                  {renderSources()}
               </Select>
            </FormControl>
         </Grid>
         <ShippingDetails
            breakPoints={autocompleteBreakpoints}
            classes={{
               city: classes.cityAutocomplete,
               warehouse: classes.warehouseAutocomplete
            }}
         />
         <Grid item lg={12} xs={12}>
            <FormControl fullWidth lg={12} xs={12}>
               <Select
                  native
                  name='shippingMethodId'
                  className={classes.selectSource}
                  variant="outlined"
                  fullWidth
                  value={methods.shippingMethodId}
                  required
               >
                  {renderMethods()}
               </Select>
            </FormControl>
         </Grid>
      </>
   );
};

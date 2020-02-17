import React from "react";
import {InputLabel, Grid, Select, FormControl} from "@material-ui/core";
import {ShippingDetails} from "../../../components/ShippingDetails/ShippingDetails";

export const ShippingDetailsForm = (props) => {
   const {
      classes,
      autocompleteBreakpoints,
      onChangedInput,
      onMethodSelectHandler,
      methods,
      shippingMethodId
   } = props;

   const renderMethods = () => {
      if (!methods || !methods.length) {
         return null;
      }

      return methods.map(method => {
         return (
            <option key={method.shippingMethodId} value={method.shippingMethodId}>{method.name}</option>
         );
      })
   };
   return (
      <>
         <ShippingDetails
            onChangeInput={onChangedInput}
            breakPoints={autocompleteBreakpoints}
            classes={{
               city: classes.cityAutocomplete,
               warehouse: classes.warehouseAutocomplete
            }}
         />
         <Grid item lg={12} xs={12}>
            <FormControl fullWidth lg={12} xs={12} variant={"outlined"}>
               <InputLabel className={classes.labelInput}>
                  Select Method
               </InputLabel>
               <Select
                  native
                  fullWidth
                  variant="outlined"
                  name='shippingMethodId'
                  labelWidth={110}
                  value={shippingMethodId}
                  className={classes.selectSource}
                  onChange={onMethodSelectHandler}
               >
                  <option value=""></option>
                  {renderMethods()}
               </Select>
            </FormControl>
         </Grid>
      </>
   );
};

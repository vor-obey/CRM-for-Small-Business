import React from "react";
import {Divider, Grid, TextField, Typography} from "@material-ui/core";

export const ProductForm = (props) => {

   const {
      classes,
      currencies,
      onChangedInput,
      productDetails,
   } = props;

   return (
      <>
         <Grid item xl={12} xs={12}>
            <Typography className={classes.heading} variant='h6'>
               Product Details
            </Typography>
            <Divider/>
         </Grid>
         <Grid item lg={12} xs={12}>
            <TextField
               required
               fullWidth
               autoFocus
               label='Product'
               variant="outlined"
               margin="normal"
               name='description'
               onChange={onChangedInput}
               value={productDetails.description}
            />
         </Grid>
         <Grid item xl={3} lg={3} sm={3} xs={12}>
            <TextField
               required
               autoFocus
               label='Quantity'
               variant="outlined"
               margin="normal"
               name='amount'
               onChange={onChangedInput}
               value={productDetails.amount}
            />
         </Grid>
         <Grid item xl={3} lg={3} sm={2} xs={5}>
            <TextField
               className={classes.inputPrice}
               required
               autoFocus
               margin="normal"
               variant="outlined"
               label="Price"
               name='price'
               onChange={onChangedInput}
               value={productDetails.price}
            />
         </Grid>
         <Grid item xl={1} lg={1} sm={2} xs={6}>
            <TextField
               className={classes.inputSelect}
               id="outlined-select-currency-native"
               select
               fullWidth
               value={productDetails.currency}
               SelectProps={{
                  native: true,
               }}
               name='currency'
               variant="outlined"
               margin="normal"
               onChange={onChangedInput}
            >
               {currencies.map(option => (
                  <option key={option} value={option}>
                     {option}
                  </option>
               ))}
            </TextField>
         </Grid>
      </>
   );
};

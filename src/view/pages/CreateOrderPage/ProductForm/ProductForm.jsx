import React from "react";
import {Divider, Grid, TextField, Typography} from "@material-ui/core";

export const ProductForm = ({
                                classes,
                                currencies,
                                onChangedInput,
                                productDetails
                            }) => {
    return (
        <>
            <Grid item xl={12} xs={12}>
                <Typography className={classes.heading} variant='h6'>
                    Product Details
                </Typography>
                <Divider/>
            </Grid>
            <Grid item lg={7} md={7} sm={7} xs={12}>
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
            <Grid item lg={1} sm={2} xs={6} className={classes.select}>
                <TextField
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

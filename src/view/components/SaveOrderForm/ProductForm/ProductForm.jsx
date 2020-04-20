import React from "react";
import {Divider, Grid, Select, TextField, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import FormControl from '@material-ui/core/FormControl';

export const ProductForm = ({
                                selectedProduct,
                                onProductSelect,
                                products,
                                classes,
                                currencies,
                                onChangedInput,
                                productDetails
                            }) => {
    const {t} = useTranslation('');
    return (
        <>
            <Grid item xl={12} xs={12}>
                <Typography className={classes.heading} variant='h6'>
                    {t('PRODUCT_DETAILS')}
                </Typography>
                <Divider/>
            </Grid>
            <Grid item lg={7} md={7} sm={7} xs={12}>
                <FormControl
                    variant='outlined'
                    style={{
                        width: '100%',
                        marginTop: 16
                    }}
                >
                    <Select
                        native
                        name='productId'
                        value={selectedProduct || ''}
                        onChange={onProductSelect}
                        inputProps={{
                            name: 'productId'
                        }}
                    >
                        <option value=''/>
                        {products.map((product) => {
                            const {productId, name} = product;
                            return (
                                <option key={productId} value={productId}>{name}</option>
                            );
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item lg={1}>
                <TextField
                    fullWidth
                    onChange={onChangedInput}
                    margin='normal'
                    variant='outlined'
                    name='price'
                    label='Price'
                    style={{marginLeft: 16}}
                    value={productDetails.price}
                />
            </Grid>
            <Grid item lg={1} sm={2} xs={6} className={classes.select}>
                <TextField
                    id="outlined-select-currency-native"
                    select
                    fullWidth
                    value={productDetails.currency || ''}
                    SelectProps={{
                        native: true,
                    }}
                    name='currency'
                    variant="outlined"
                    margin="normal"
                    onChange={onChangedInput}
                    label='Currency'
                    style={{marginLeft: 16}}
                >
                    {currencies.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </TextField>
            </Grid>
            <Grid item lg={1}>
                <TextField
                    fullWidth
                    onChange={onChangedInput}
                    margin='normal'
                    variant='outlined'
                    name='amount'
                    label='Amount'
                    style={{marginLeft: 30}}
                    value={productDetails.amount}
                />
            </Grid>
        </>
    );
};

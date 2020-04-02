import React, {useCallback} from "react";
import {Grid, Typography, Divider} from "@material-ui/core";
import {NovaPoshtaAddress} from "../../NovaPoshtaAddress/NovaPoshtaAddress";
import {CustomAddress} from '../../CustomAddress/CustomAddress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {useTranslation} from 'react-i18next';

export const ShippingDetailsForm = ({
                                        classes,
                                        autocompleteBreakpoints,
                                        onChangedInput,
                                        isCustom,
                                        shippingMethod,
                                        shippingMethods,
                                        address,
                                        onChangedAddressInput,
                                        onShippingMethodSelectHandler
                                    }) => {
    const {t} = useTranslation();
    const renderAddress = () => {
        return isCustom ?
            <CustomAddress
                address={address}
                onChangedInput={onChangedAddressInput}
            />
            :
            <NovaPoshtaAddress
                onChangeInput={onChangedInput}
                breakPoints={autocompleteBreakpoints}
                classes={{
                    city: classes.cityAutocomplete,
                    warehouse: classes.warehouseAutocomplete
                }}
                address={address}
                label={{
                  city: t('SELECT_CITY'),
                  warehouse: t('SELECT_WAREHOUSE')
                }}
            />
    };

    const renderShippingMethods = useCallback(() => {
        if (!shippingMethods.length) {
            return null;
        }
        return shippingMethods.map((method) => {
            return <option key={method.shippingMethodId} value={method.shippingMethodId}>{method.name}</option>
        });
    }, [shippingMethods]);

    return (
        <>
            <Grid item xl={12} xs={12} className={classes.gridShipping}>
                <Typography variant='h6' className={classes.shippingText}>
                    {t('SHIPPING_DETAILS')}
                </Typography>
                <Divider/>
            </Grid>
            {renderAddress()}
            <Grid item xl={12} xs={12} style={{marginTop: 10}}>
                <FormControl
                    variant="outlined"
                    required
                    fullWidth
                >
                    <InputLabel id="demo-simple-select-outlined-label">
                        {t('SHIPPING_METHOD')}
                    </InputLabel>
                    <Select
                        native
                        name="shippingMethodId"
                        value={(shippingMethod && shippingMethod.shippingMethodId) || ''}
                        labelWidth={120}
                        required
                        onChange={onShippingMethodSelectHandler}
                        inputProps={{
                            name: 'shippingMethodId',
                        }}>
                        {renderShippingMethods()}
                    </Select>
                </FormControl>
            </Grid>
        </>
    );
};

import React from "react";
import {Grid, Typography, Divider} from "@material-ui/core";
import {ShippingDetails} from "../../../components/ShippingDetails/ShippingDetails";
import {useTranslation} from "react-i18next";

export const ShippingDetailsForm = ({
                                        classes,
                                        autocompleteBreakpoints,
                                        onChangedInput
                                    }) => {
    const { t } = useTranslation('');
    return (
        <>
            <Grid item xl={12} xs={12} className={classes.gridShipping}>
                <Typography variant='h6' className={classes.shippingText}>
                    {t('SHIPPINGDETAILS')}
                </Typography>
                <Divider/>
            </Grid>
            <ShippingDetails
                onChangeInput={onChangedInput}
                breakPoints={autocompleteBreakpoints}
                classes={{
                    city: classes.cityAutocomplete,
                    warehouse: classes.warehouseAutocomplete
                }}
            />
        </>
    );
};

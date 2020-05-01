import React from 'react';
import {Button, TextField, Typography, Grid} from "@material-ui/core";
import {useTranslation} from "react-i18next";

export const SaveProductTypeWithAttributes = ({
                                                  productTypeName,
                                                  onChange,
                                                  openCreateAttributeModal,
                                                  renderAttributes,
                                                  title
                                              }) => {
    const {t} = useTranslation();

    return (
        <>
            <Grid container item xl={12} lg={12}>
                <Grid item xl={12} lg={12} style={{textAlign: 'center'}}>
                    <Typography variant='h6'>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xl={12} lg={12} style={{marginTop: 15}}>
                    <TextField
                        label={t('PRODUCT_TYPE_NAME')}
                        name="name"
                        variant="outlined"
                        type="text"
                        value={productTypeName}
                        onChange={onChange}
                        required
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Grid container item xl={12} lg={12} style={{marginTop: 30}}>
                <Grid item xl={12} lg={12} style={{textAlign: 'center'}}>
                    <Typography variant='h6'>
                        {t('ATTRIBUTES')}
                    </Typography>
                </Grid>
                <Grid item xl={12} lg={12}>
                    <Button
                        variant='outlined'
                        onClick={openCreateAttributeModal}
                    >
                        {t('ADD_ATTRIBUTE')}
                    </Button>
                </Grid>
                <Grid container item xl={12} lg={12}>
                    {renderAttributes()}
                </Grid>
            </Grid>
        </>
    );
};

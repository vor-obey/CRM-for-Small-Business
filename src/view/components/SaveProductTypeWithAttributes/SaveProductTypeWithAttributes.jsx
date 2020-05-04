import React from 'react';
import {Grid, Typography, TextField, Button} from '@material-ui/core';
import {useTranslation} from "react-i18next";

export const SaveProductTypeWithAttributes = ({
                                                  productTypeName,
                                                  onChange,
                                                  openCreateAttributeModal,
                                                  renderAttributes,
                                                  title,
                                                  classes
                                              }) => {
    const {t} = useTranslation();

    return (
        <React.Fragment>
            <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={12} className={classes.containerTitle}>
                    <Typography variant='h6'>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} className={classes.containerTypeItem}>
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
            <Grid container item xs={12} sm={12} style={{marginTop: 30}}>
                <Grid item xs={12} sm={12} className={classes.containerTitle}>
                    <Typography variant='h6'>
                        {t('ATTRIBUTES')}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Button
                        variant='outlined'
                        onClick={openCreateAttributeModal}
                    >
                        {t('ADD_ATTRIBUTE')}
                    </Button>
                </Grid>
                <Grid container item xs={12} sm={12} className={classes.containerAttribute}>
                    {renderAttributes()}
                </Grid>
            </Grid>
        </React.Fragment>
    );
};
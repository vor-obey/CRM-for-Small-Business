import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const SaveProductTypeWithAttributes = ({
                                                  productTypeName,
                                                  onChange,
                                                  openCreateAttributeModal,
                                                  renderAttributes,
                                                  title
                                              }) => {
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
                        label='Product type name'
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
                        Attributes
                    </Typography>
                </Grid>
                <Grid item xl={12} lg={12}>
                    <Button
                        variant='outlined'
                        onClick={openCreateAttributeModal}
                    >
                        Add attribute
                    </Button>
                </Grid>
                <Grid container item xl={12} lg={12}>
                    {renderAttributes()}
                </Grid>
            </Grid>
        </>
    );
};
import React from 'react';
import {Container, TextField} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export const SaveProductTypeForm = ({
                                        t,
                                        labels,
                                        productTypeDetails,
                                        onChange,
                                        onSubmit,
                                        classes
                                    }) => {
    return (
        <Container component='main' maxWidth='sm'>
            <Grid container style={{padding: 15}}>
                <Grid item xs={12} sm={12} style={{marginTop: 10, marginBottom: 10}}>
                    <Typography variant='h6' style={{textAlign: 'center'}}>
                        {labels.title}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} style={{marginTop: 10, marginBottom: 10}}>
                    <TextField
                        label={t('PRODUCT_TYPE_NAME')}
                        name="name"
                        variant="outlined"
                        type="name"
                        value={productTypeDetails.name}
                        onChange={onChange}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12} className={classes.buttonContainer}>
                    <Button
                        className={classes.button}
                        color='primary'
                        variant='outlined'
                        onClick={onSubmit}
                    >
                        {labels.button}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};
import React from 'react';
import {Container, TextField} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export const SaveProductTypeForm = ({
                                        productType,
                                        onChange,
                                        onSubmit
                                    }) => {
    return (
        <Container component='main' maxWidth='sm'>
            <Grid container style={{padding: 15}}>
                <Grid item xl={12} lg={12} style={{marginTop: 10, marginBottom: 10}}>
                    <Typography variant='h6' style={{textAlign: 'center'}}>
                        Create Product Type
                    </Typography>
                </Grid>
                <Grid item xl={12} lg={12} style={{marginTop: 10, marginBottom: 10}}>
                    <TextField
                        label='Product Type Name'
                        name="name"
                        variant="outlined"
                        type="name"
                        value={productType.name}
                        onChange={onChange}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xl={12} lg={12} style={{marginTop: 10, marginBottom: 10}}>
                    <TextField
                        label='Product Type description'
                        name="description"
                        variant="outlined"
                        type="description"
                        value={productType.description}
                        onChange={onChange}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xl={12} lg={12} style={{marginTop: 10, marginBottom: 10, textAlign: 'center'}}>
                    <Button
                        color='primary'
                        variant='outlined'
                        onClick={onSubmit}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Container, TextField} from '@material-ui/core';
import {ProductTypeAttributes} from '../ProductTypeAutocomplete/ProductTypeAttributes';
import Button from '@material-ui/core/Button';

export const SaveAbstractProductForm = ({
                                            labels,
                                            abstractProductDetails,
                                            onAbstractProductChangedHandler,
                                            productTypes,
                                            selectedProductType,
                                            onProductTypeSelectHandler,
                                            isExpanded,
                                            renderAttributes,
                                            openCreateProductTypeModal,
                                            openEditProductTypeModal,
                                            openCreateAttributeModal,
                                            openDeleteProductTypeDialog,
                                            onSubmit,
                                            t
                                        }) => {
    return (
        <Container component='main' maxWidth='md'>
            <Grid container style={{marginTop: 30}}>
                <Paper style={{padding: 15, width: '100%'}}>
                    <Grid item xl={12} lg={12} style={{marginTop: 10, marginBottom: 10}}>
                        <Typography variant='h6' style={{textAlign: 'center'}}>
                            {labels.title}
                        </Typography>
                    </Grid>
                    <Grid container item xl={12} lg={12} style={{marginTop: 10, marginBottom: 10}}>
                        <Grid item xl={10} lg={10} style={{paddingRight: 10}}>
                            <TextField
                                label={t('NAME')}
                                name="name"
                                variant="outlined"
                                type="text"
                                value={abstractProductDetails.name}
                                onChange={onAbstractProductChangedHandler}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xl={2} lg={2}>
                            <TextField
                                label={t('PRICE')}
                                name="price"
                                variant="outlined"
                                type="number"
                                value={abstractProductDetails.price}
                                onChange={onAbstractProductChangedHandler}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xl={12} lg={12} style={{marginTop: 10}}>
                            <TextField
                                label={t('DESCRIPTION')}
                                name="description"
                                variant="outlined"
                                type="text"
                                value={abstractProductDetails.description}
                                onChange={onAbstractProductChangedHandler}
                                required
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <ProductTypeAttributes
                        t={t}
                        productTypes={productTypes}
                        selectedProductType={selectedProductType}
                        onProductTypeSelectHandler={onProductTypeSelectHandler}
                        isExpanded={isExpanded}
                        renderAttributes={renderAttributes}
                        openCreateProductTypeModal={openCreateProductTypeModal}
                        openEditProductTypeModal={openEditProductTypeModal}
                        openCreateAttributeModal={openCreateAttributeModal}
                        openDeleteProductTypeDialog={openDeleteProductTypeDialog}
                    />
                    <Grid item xl={12} lg={12} style={{textAlign: 'center', marginTop: 10, marginBottom: 10}}>
                        <Button
                            variant='outlined'
                            onClick={onSubmit}
                        >
                            {labels.button}
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
        </Container>
    );
};

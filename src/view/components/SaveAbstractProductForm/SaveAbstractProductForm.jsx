import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Container, TextField} from '@material-ui/core';
import {ProductTypeAttributes} from '../ProductTypeAutocomplete/ProductTypeAttributes';
import Button from '@material-ui/core/Button';

export const SaveAbstractProductForm = ({
                                            classes,
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
                                            t,
                                            disableButton
                                        }) => {
    return (
        <Container component='main' maxWidth='md' className={classes.root}>
            <Grid container>
                <Paper className={classes.paper}>
                    <Grid item xl={12} lg={12} className={classes.containerTitle}>
                        <Typography variant='h5'>
                            {labels.title}
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} sm={12} className={classes.containerProduct}>
                        <Grid item xs={12} sm={9} className={classes.containerProductItem}>
                            <TextField
                                label={t('PRODUCT_NAME')}
                                name="name"
                                variant="outlined"
                                type="text"
                                value={abstractProductDetails.name}
                                onChange={onAbstractProductChangedHandler}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} className={classes.containerProductItem}>
                            <TextField
                                label={t('PRICE')}
                                name="price"
                                variant="outlined"
                                type="text"
                                value={abstractProductDetails.price}
                                onChange={onAbstractProductChangedHandler}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} className={classes.containerProductItem}>
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
                        classes={classes}
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
                    <Grid item xs={12} sm={12} className={classes.buttonContainer}>
                        <Button
                            variant='outlined'
                            className={classes.button}
                            onClick={onSubmit}
                            disabled={disableButton()}
                        >
                            {labels.button}
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
        </Container>
    );
};

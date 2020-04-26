import React, {useCallback, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {CustomAutocomplete} from '../Autocomplete/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import isEmpty from 'lodash/isEmpty';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

export const ProductTypeAttributes = ({
                                          productTypes,
                                          selectedProductType,
                                          onProductTypeSelectHandler,
                                          isExpanded,
                                          renderAttributes,
                                          openCreateProductTypeModal,
                                          openEditProductTypeModal,
                                          openCreateAttributeModal,
                                          openDeleteProductTypeDialog
                                      }) => {
    const [isProductTypeAutocompleteOpen, setIsProductTypeAutocompleteOpen] = useState(false);

    const toggleProductTypeAutocomplete = useCallback(() => setIsProductTypeAutocompleteOpen(prevState => !prevState), []);

    const renderProductTypeOptions = useCallback((item) => {
        const {productTypeId, name, description} = item;
        return (
            <Grid container alignItems='center'>
                <Grid item xs>
                <span key={productTypeId}>
                   {name}
                </span>
                    <Typography variant='body2' color='textSecondary'>
                        {description}
                    </Typography>
                </Grid>
            </Grid>
        );
    }, []);

    const getProductTypeOptionLabel = useCallback(item => !isEmpty(item) ? item.name : '', []);

    return (
        <>
            <Grid container item xl={12} lg={12} style={{marginTop: 10, marginBottom: 10}}>
                <Grid item xl={9} lg={9}>
                    <CustomAutocomplete
                        isOpen={isProductTypeAutocompleteOpen}
                        options={productTypes}
                        onClose={toggleProductTypeAutocomplete}
                        onToggle={toggleProductTypeAutocomplete}
                        inputLabel='Select product type'
                        renderOption={renderProductTypeOptions}
                        getOptionLabel={getProductTypeOptionLabel}
                        onSelectHandler={onProductTypeSelectHandler}
                        value={selectedProductType || ''}
                    />
                </Grid>
                <Grid item xl={1} lg={1} style={{textAlign: 'center'}}>
                    <IconButton onClick={openCreateProductTypeModal}>
                        <AddCircleIcon fontSize='large'/>
                    </IconButton>
                </Grid>
                <Grid item xl={1} lg={1} style={{textAlign: 'center'}}>
                    <IconButton onClick={openEditProductTypeModal} disabled={isEmpty(selectedProductType)}>
                        <EditIcon fontSize='large'/>
                    </IconButton>
                </Grid>
                <Grid item xl={1} lg={1} style={{textAlign: 'center'}}>
                    <IconButton onClick={openDeleteProductTypeDialog} disabled={isEmpty(selectedProductType)}>
                        <DeleteIcon fontSize='large'/>
                    </IconButton>
                </Grid>
            </Grid>
            <Collapse in={isExpanded} timeout='auto' unmountOnExit>
                <Grid container item xl={12}>
                    <Grid item xl={12} lg={12} style={{textAlign: 'left', marginTop: 10, marginBottom: 10}}>
                        <Button
                            variant='outlined'
                            onClick={openCreateAttributeModal}
                        >
                            Add Attribute
                        </Button>
                    </Grid>
                    <Grid container item xl={12} lg={12} spacing={2}>
                        {renderAttributes()}
                    </Grid>
                </Grid>
            </Collapse>
        </>
    );
};
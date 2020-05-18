import React, {useCallback, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {CustomAutocomplete} from '../Autocomplete/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import isEmpty from 'lodash/isEmpty';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

export const ProductTypeAttributes = ({
                                          classes,
                                          productTypes,
                                          selectedProductType,
                                          onProductTypeSelectHandler,
                                          isExpanded,
                                          renderAttributes,
                                          openCreateProductTypeModal,
                                          openEditProductTypeModal,
                                          openCreateAttributeModal,
                                          openDeleteProductTypeDialog,
                                          t
                                      }) => {
    const [isProductTypeAutocompleteOpen, setIsProductTypeAutocompleteOpen] = useState(false);

    const toggleProductTypeAutocomplete = useCallback(() => setIsProductTypeAutocompleteOpen(prevState => !prevState), []);

    const renderProductTypeOptions = useCallback((item) => {
        const {productTypeId, name} = item;
        return (
            <Grid container alignItems='center'>
                <Grid item xs>
                <span key={productTypeId}>
                   {name}
                </span>
                </Grid>
            </Grid>
        );
    }, []);

    const getProductTypeOptionLabel = useCallback(item => !isEmpty(item) ? item.name : '', []);

    const filterOptions = useCallback((array, {inputValue}) => {
        if (!array.length) {
            return [];
        }

        const matchWhitespacesRegExp = /\s/g;
        const formattedInputValue = inputValue.toLowerCase().replace(matchWhitespacesRegExp, '');

        return array.filter((item) => {
            return item.name.toLowerCase().replace(matchWhitespacesRegExp, '').indexOf(formattedInputValue) !== -1;
        });
    }, []);

    return (
        <>
            <Grid container item xs={12} sm={12} className={classes.containerProduct}>
                <Grid item xs={12} sm={9} className={classes.containerProductItem}>
                    <CustomAutocomplete
                        isOpen={isProductTypeAutocompleteOpen}
                        options={productTypes}
                        onClose={toggleProductTypeAutocomplete}
                        onToggle={toggleProductTypeAutocomplete}
                        inputLabel={t('SELECT_PRODUCT_TYPE')}
                        renderOption={renderProductTypeOptions}
                        getOptionLabel={getProductTypeOptionLabel}
                        onSelectHandler={onProductTypeSelectHandler}
                        value={selectedProductType || ''}
                        onInputChangedHandler={() => {}}
                        filterOptions={filterOptions}
                    />
                </Grid>
                <Grid container item xs={12} sm={3} className={classes.containerProductType}>
                    <Grid item xs={4} sm={3}>
                        <IconButton onClick={openCreateProductTypeModal}>
                            <AddCircleIcon fontSize='large'/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={4} sm={3}>
                        <IconButton onClick={openEditProductTypeModal} disabled={isEmpty(selectedProductType)}>
                            <EditIcon fontSize='large'/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={4} sm={3}>
                        <IconButton onClick={openDeleteProductTypeDialog} disabled={isEmpty(selectedProductType)}>
                            <DeleteIcon fontSize='large'/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Collapse in={isExpanded} timeout='auto' unmountOnExit>
                <Grid container item xl={12}>
                    <Grid item xs={12} sm={12} className={classes.containerProductItem}>
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
            </Collapse>
        </>
    );
};

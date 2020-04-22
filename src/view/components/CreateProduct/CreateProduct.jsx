import React, {useCallback, useEffect, useState} from 'react';
import {Collapse, Container, ListItemText, Paper, Select, TextField} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {CustomAutocomplete} from '../Autocomplete/Autocomplete';
import {useDispatch} from 'react-redux';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {ProductService} from '../../../services';
import isEmpty from 'lodash/isEmpty';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {useLastLocation} from 'react-router-last-location';
import {useAbstractProducts, useAttributesByProductTypeId} from '../../../utils/hooks/productHooks';

export const CreateProduct = ({history}) => {
    const dispatch = useDispatch();
    const [productDetails, setProductDetails] = useState({
        name: '',
        price: '',
    });
    const [abstractProducts] = useAbstractProducts();
    const [selectedAbstractProduct, setSelectedAbstractProduct] = useState({});
    const [isAbstractProductAutocompleteOpen, setIsAbstractProductAutocompleteOpen] = useState(false);
    const [attributes] = useAttributesByProductTypeId(selectedAbstractProduct.productType && selectedAbstractProduct.productType.productTypeId);
    const [selectedAttributeValues, setSelectedAttributeValues] = useState({});
    const [isExpanded, setIsExpanded] = useState(false);
    const lastLocation = useLastLocation();

    useEffect(() => {
        if (attributes.length) {
            setIsExpanded(true);
        }
    }, [attributes]);

    const toggleAbstractProductAutocomplete = useCallback(() => setIsAbstractProductAutocompleteOpen(prevState => !prevState), []);

    const renderAbstractProductOptions = useCallback((item) => {
        const {abstractProductId, name, price, description} = item;
        return (
            <Grid container alignItems='center'>
                <Grid item xs>
                    <span key={abstractProductId}>
                        {name}, {price}
                    </span>
                    <Typography variant='body2' color='textSecondary'>
                        {description}
                    </Typography>
                </Grid>
            </Grid>
        );
    }, []);

    const getAbstractProductOptionLabel = useCallback(item => !isEmpty(item) ? item.name : '', [])

    const onAbstractProductSelectHandler = useCallback((item) => {
        if (!item) {
            setSelectedAbstractProduct({});
            setIsExpanded(false);
        } else {
            setSelectedAbstractProduct(item);
        }
    }, []);

    const onAttributeValueSelectHandler = useCallback((event) => {
        const {name, value} = event.target;
        setSelectedAttributeValues(prevState => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }, []);

    const onProductDetailsChangedHandler = useCallback((event) => {
        const {name, value} = event.target;
        setProductDetails(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }, []);

    const renderAttributes = useCallback(() => {
        if (isEmpty(attributes)) {
            return null;
        }

        return attributes.map((attribute) => {
            const {attributeId, name, attributeValues} = attribute;
            return (
                <ListItem key={attributeId}>
                    <Grid item xl={2} lg={2}>
                        <Typography variant='body1'>
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item xl={10} lg={10}>
                        <Select
                            native
                            name={attributeId}
                            value={selectedAttributeValues[attributeId] || ''}
                            onChange={onAttributeValueSelectHandler}
                            inputProps={{
                                name: attributeId
                            }}
                        >
                            <option value=''/>
                            {attributeValues.map((attrValue) => {
                                const {attributeValueId, value} = attrValue;
                                return (
                                    <option key={attributeValueId} value={attributeValueId}>{value}</option>
                                );
                            })}
                        </Select>
                    </Grid>
                </ListItem>
            );
        });
    }, [attributes, selectedAttributeValues, onAttributeValueSelectHandler]);

    const validateAttributeValues = useCallback((arr) => {
        return arr.find(item => item === '');
    }, []);

    const createProduct = useCallback(async () => {
        const attributesLength = attributes.length;
        const attributeValuesEntriesLength = Object.entries(selectedAttributeValues).length;
        if (attributesLength !== attributeValuesEntriesLength) {
            dispatch(setSnackBarStatus({isOpen: true, message: 'Select all values', success: false}));
        } else {
            if (validateAttributeValues(Object.values(selectedAttributeValues)) === undefined) {
                try {
                    dispatch(setIsLoading(true));
                    await ProductService.create({
                        abstractProductId: selectedAbstractProduct.abstractProductId,
                        name: productDetails.name,
                        price: productDetails.price,
                        attributeValues: selectedAttributeValues,
                    });
                    dispatch(setIsLoading(false));
                    history.push(`${lastLocation ? lastLocation.pathname : '/products'}`);
                } catch (e) {
                    dispatch(setIsLoading(false));
                    dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
                }
            } else {
                dispatch(setSnackBarStatus({isOpen: true, message: 'Select all values', success: false}));
            }
        }
    }, [
        selectedAbstractProduct.abstractProductId,
        productDetails,
        selectedAttributeValues,
        attributes.length,
        validateAttributeValues,
        dispatch,
        history, lastLocation
    ]);

    return (
        <Container component='main' maxWidth='md'>
            <Grid container style={{marginTop: 30}}>
                <Paper style={{padding: 15, width: '100%'}}>
                    <Grid item xl={12} lg={12} style={{marginTop: 10, marginBottom: 10}}>
                        <Typography variant='h6' style={{textAlign: 'center'}}>
                            Create Product
                        </Typography>
                    </Grid>
                    <Grid container item xl={12} lg={12} style={{marginTop: 10, marginBottom: 10}}>
                        <Grid item xl={10} lg={10} style={{paddingRight: 10}}>
                            <TextField
                                label='Name'
                                name="name"
                                variant="outlined"
                                type="text"
                                value={productDetails.name}
                                onChange={onProductDetailsChangedHandler}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xl={2} lg={2}>
                            <TextField
                                label='Price'
                                name="price"
                                variant="outlined"
                                type="number"
                                value={productDetails.price}
                                onChange={onProductDetailsChangedHandler}
                                required
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xl={12} lg={12} style={{marginTop: 10, marginBottom: 10}}>
                        <Grid item xl={1} lg={1}>
                            <IconButton onClick={() => history.push('/create-abstract-product')}>
                                <AddCircleIcon fontSize='large'/>
                            </IconButton>
                        </Grid>
                        <Grid item xl={11} lg={11}>
                            <CustomAutocomplete
                                isOpen={isAbstractProductAutocompleteOpen}
                                options={abstractProducts}
                                onClose={toggleAbstractProductAutocomplete}
                                onToggle={toggleAbstractProductAutocomplete}
                                inputLabel='Select abstract product'
                                renderOption={renderAbstractProductOptions}
                                getOptionLabel={getAbstractProductOptionLabel}
                                onSelectHandler={onAbstractProductSelectHandler}
                                value={selectedAbstractProduct}
                            />
                        </Grid>
                    </Grid>
                    <Collapse in={isExpanded} timeout='auto' unmountOnExit>
                        <Grid container item xl={12}>
                            <Grid container item xl={12} lg={12}>
                                <List style={{width: '100%'}}>
                                    <ListItem>
                                        <ListItemText
                                            primary='Select values'
                                        />
                                    </ListItem>
                                    <Divider/>
                                    {renderAttributes()}
                                </List>
                            </Grid>
                            <Grid item xl={12} lg={12} style={{textAlign: 'center', marginTop: 10, marginBottom: 10}}>
                                <Button
                                    variant='outlined'
                                    onClick={createProduct}
                                >
                                    Create
                                </Button>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Paper>
            </Grid>
        </Container>
    );
};
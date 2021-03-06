import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
    Grid,
    Typography,
    IconButton,
    List,
    ListItem,
    Divider,
    Button,
    Collapse,
    Container,
    ListItemText,
    Paper,
    Select,
    TextField,
    makeStyles
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {CustomAutocomplete} from '../Autocomplete/Autocomplete';
import isEmpty from 'lodash/isEmpty';
import {useAbstractProducts, useAttributesByProductTypeId, useProductTypes} from '../../../utils/hooks/productHooks';
import {saveProductStyles} from "./SaveProduct.styles";
import {useTranslation} from 'react-i18next';
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {getTemplatesProducts, setProductDetailsToStore} from "../../../data/store/product/productActions";
import {PRODUCT_TEMPLATES_CREATE} from "../../../constants/routes";

const useStyles = makeStyles(saveProductStyles);

const getSelectedProductType = (selectedProductType, selectedAbstractProduct) => {
    if(!isEmpty(selectedProductType)) {
        return selectedProductType.productTypeId;
    }

    if(selectedAbstractProduct?.productType){
        return selectedAbstractProduct?.productType.productTypeId;
    }
}

export const SaveProduct = ({
                                product,
                                labels,
                                onSave,
                                history,
                                isEdit
                            }) => {
    const {t} = useTranslation();
    const classes = useStyles();
    const productDetails = useSelector(state => state.productReducer.details);


    const {abstractProducts} = useAbstractProducts();
    const [selectedAbstractProduct, setSelectedAbstractProduct] = useState({});
    const [isAbstractProductAutocompleteOpen, setIsAbstractProductAutocompleteOpen] = useState(false);
    const toggleAbstractProductAutocomplete = useCallback(() => setIsAbstractProductAutocompleteOpen(prevState => !prevState), []);

    const {productsTypes} = useProductTypes();
    const [selectedProductType, setSelectedProductType] = useState({});
    const [isProductTypeAutocompleteOpen, setIsProductTypeAutocompleteOpen] = useState(false);
    const toggleProductTypeAutocomplete = useCallback(() => setIsProductTypeAutocompleteOpen(prevState => !prevState), []);

    const productTypeId = useMemo(
        () => getSelectedProductType(selectedProductType, selectedAbstractProduct),
        [selectedProductType, selectedAbstractProduct]
    );
    const {attributes} = useAttributesByProductTypeId(productTypeId);
    const [selectedAttributeValues, setSelectedAttributeValues] = useState({});

    const [isExpanded, setIsExpanded] = useState(false);
    const dispatch = useDispatch();

    const getAttributeValueIds = useCallback((items) => {
        const ids = {};
        for (const {attributeValue} of items) {
            const {attribute: {attributeId}, attributeValueId} = attributeValue;
            ids[attributeId] = attributeValueId;
        }
        return ids;
    }, []);

    useEffect(() => {
        if (history.location.state !== undefined && history.location.state.abstractProductId && !isEmpty(abstractProducts)) {
            setSelectedAbstractProduct(abstractProducts.find(item => item.abstractProductId === history.location.state.abstractProductId));
            setIsExpanded(true);
        }
    }, [history, abstractProducts, dispatch]);

    useEffect(() => {
        if ((product)) {
            dispatch(setProductDetailsToStore({
                name: product.name,
                price: product.price
            }));
            setSelectedAbstractProduct(product.abstractProduct);
            setSelectedAttributeValues(getAttributeValueIds(product.productToAttributeValues));
            setSelectedProductType(product.abstractProduct.productType);
            setIsExpanded(true);
        }
        return () => {
            if (isEdit) {
                dispatch(setProductDetailsToStore({
                    name: '',
                    price: ''
                }));
            }
        }
    }, [product, getAttributeValueIds, dispatch, isEdit]);

    useEffect(() => {
        if (!isEmpty(selectedAbstractProduct)) {
            dispatch(setProductDetailsToStore(prevState => ({
                ...prevState,
                price: prevState.price ? prevState.price : selectedAbstractProduct.price
            })));
        }
    }, [selectedAbstractProduct, dispatch]);

    const onProductDetailsChangedHandler = useCallback((event) => {
        const {name, value} = event.target;
        dispatch(setProductDetailsToStore({[name]: value}))
    }, [dispatch]);


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


    const getAbstractProductOptionLabel = useCallback(item => !isEmpty(item) ? item.name : '', []);
    const getProductTypeOptionLabel = useCallback(item => !isEmpty(item) ? item.name : '', []);

    const onAbstractProductSelectHandler = useCallback((item) => {
        if (!item) {
            setSelectedAbstractProduct({});
            setSelectedProductType({})
            setIsExpanded(false);
        } else {
            setSelectedAbstractProduct(item);
            if(item.productType) {
                setSelectedProductType(item.productType);
            }
            dispatch(setProductDetailsToStore({ name: item.name, price: item.price}))
            setIsExpanded(true);
        }
        setSelectedAttributeValues({});
    }, [dispatch]);

    const onProductTypeSelectHandler = useCallback((item) => {
        if (!item) {
            setSelectedProductType({});
            setIsExpanded(false);
        } else {
            setSelectedProductType(item);
            setIsExpanded(true);
        }
        setSelectedAttributeValues({});
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

    const renderAttributes = useCallback(() => {
        if (isEmpty(attributes)) {
            return null;
        }

        return attributes.map((attribute) => {
            const {attributeId, name, attributeValues} = attribute;
            return (
                <ListItem key={attributeId}>
                    <Grid item xs={12} sm={3}>
                        <Typography variant='body1'>
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Select
                            native
                            name={attributeId}
                            value={(selectedAttributeValues && selectedAttributeValues[attributeId]) || ''}
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

    const onSubmit = useCallback(() => {
        onSave({
            productDetails,
            selectedAbstractProduct,
            selectedProductType,
            selectedAttributeValues
        });
    }, [selectedProductType, productDetails, selectedAttributeValues, selectedAbstractProduct, onSave]);

    const validateAttributeValues = useCallback((arr) => {
        return arr.find(item => item === '');
    }, []);

    const isSubmitDisabled = useMemo(() => {
        if (!attributes) {
            return true;
        }
        if (!productDetails.name.trim().length || !productDetails.price) {
            return true;
        }
        if (isEmpty(selectedProductType)) {
            return true;
        }
        const attributeValuesEntriesLength = Object.entries(selectedAttributeValues).length;
        if (attributes.length !== attributeValuesEntriesLength) {
            return true;
        }
        if (validateAttributeValues(Object.values(selectedAttributeValues)) !== undefined) {
            return true;
        }
        return false;
    }, [attributes, productDetails, selectedProductType, selectedAttributeValues, validateAttributeValues]);

    const filterOptions = useCallback((array, {inputValue}) => {
        if (!array.length) {
            return [];
        }

        const matchWhitespacesRegExp = /\s/g;
        const formattedInputValue = inputValue.toLowerCase().replace(matchWhitespacesRegExp, '');

        return array.filter((item) => {
            return item.name.toLowerCase().replace(matchWhitespacesRegExp, '').indexOf(formattedInputValue) !== -1
                || item.description.toLowerCase().replace(matchWhitespacesRegExp, '').indexOf(formattedInputValue) !== -1;
        });
    }, []);

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
                        <Grid item xs={12} sm={2} className={classes.containerProductItem}
                              style={{textAlign: 'center'}}>
                            <IconButton onClick={() => {
                                if (history.location.state !== undefined && history.location.state.createOrder) {
                                    history.push(PRODUCT_TEMPLATES_CREATE, {
                                        createOrder: true
                                    });
                                } else {
                                    history.push(PRODUCT_TEMPLATES_CREATE, {
                                        createProduct: true
                                    });
                                }
                            }}>
                                <AddCircleIcon fontSize='large'/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.containerProductItem}>
                            <CustomAutocomplete
                                isOpen={isAbstractProductAutocompleteOpen}
                                options={abstractProducts}
                                onClose={toggleAbstractProductAutocomplete}
                                onToggle={toggleAbstractProductAutocomplete}
                                inputLabel={t('SELECT_PRODUCT_TEMPLATE')}
                                renderOption={renderAbstractProductOptions}
                                getOptionLabel={getAbstractProductOptionLabel}
                                onSelectHandler={onAbstractProductSelectHandler}
                                value={selectedAbstractProduct}
                                onInputChangedHandler={() => {
                                }}
                                filterOptions={filterOptions}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={12} className={classes.containerProduct}>
                        <Grid item xs={12} sm={9} className={classes.containerProductItem}>
                            <TextField
                                label={t('PRODUCT_NAME')}
                                name="name"
                                variant="outlined"
                                type="text"
                                value={(productDetails && productDetails.name) || ''}
                                onChange={onProductDetailsChangedHandler}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} className={classes.containerProductItem}>
                            <TextField
                                label={t('PRICE')}
                                name="price"
                                variant="outlined"
                                type='text'
                                value={(productDetails && productDetails.price) || ''}
                                onChange={onProductDetailsChangedHandler}
                                required
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={12} className={classes.containerProduct}>
                        <Grid item xs={12} sm={12} className={classes.containerProductItem}>
                            <CustomAutocomplete
                                isOpen={isProductTypeAutocompleteOpen}
                                options={productsTypes}
                                onClose={toggleProductTypeAutocomplete}
                                onToggle={toggleProductTypeAutocomplete}
                                inputLabel={t('SELECT_PRODUCT_TYPE')}
                                renderOption={renderProductTypeOptions}
                                getOptionLabel={getProductTypeOptionLabel}
                                onSelectHandler={onProductTypeSelectHandler}
                                value={selectedProductType}
                                onInputChangedHandler={() => {
                                }}
                                filterOptions={filterOptions}
                            />
                        </Grid>
                    </Grid>
                    <Collapse in={isExpanded} timeout='auto' unmountOnExit xs={12} sm={12}
                              className={classes.containerProduct}>
                        <Grid container item xs={12} sm={12}>
                            <Grid container item xs={12} sm={12}>
                                <List style={{width: '100%'}}>
                                    <ListItem>
                                        <ListItemText
                                            primary={t('SELECT_VALUE')}
                                        />
                                    </ListItem>
                                    <Divider/>
                                    {renderAttributes()}
                                </List>
                            </Grid>
                            <Grid item xs={12} sm={12} style={{textAlign: 'center', marginTop: 10, marginBottom: 10}}>
                                <Button
                                    variant='outlined'
                                    onClick={onSubmit}
                                    disabled={isSubmitDisabled}
                                >
                                    {labels.button}
                                </Button>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Paper>
            </Grid>
        </Container>
    );
};

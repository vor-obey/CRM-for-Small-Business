import React, {useCallback, useState} from 'react';
import {Card, CardContent, CardHeader, Container, ListItemText, TextField} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {CustomAutocomplete} from '../../components/Autocomplete/Autocomplete';
import {CustomModal} from '../../components/CustomModal/CustomModal';
import {SaveProductType} from '../../components/SaveProductType/SaveProductType';
import {makeStyles} from '@material-ui/core/styles';
import {createAbstractProductPageStyles} from './CreateAbstractProductPage.style';
import {AbstractProductService, AttributeService, ProductTypeService} from '../../../services';
import isEmpty from 'lodash/isEmpty';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import {CreateAttribute} from '../CreateAttribute/CreateAttribute';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {useDispatch} from 'react-redux';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {useLastLocation} from 'react-router-last-location';
import {useAttributesByProductTypeId, useProductTypes} from '../../../utils/hooks/productHooks';
import {CustomDialog} from '../../components/CustomDialog/CustomDialog';
import {useTranslation} from 'react-i18next';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';

const useStyles = makeStyles(createAbstractProductPageStyles);

export const CreateAbstractProductPage = ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const lastLocation = useLastLocation();
    const [isProductTypeAutocompleteOpen, setIsProductTypeAutocompleteOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productTypes, , triggerProductTypesUpdate] = useProductTypes();
    const [productType, setProductType] = useState({});
    const [abstractProduct, setAbstractProduct] = useState({
        name: '',
        price: '',
        description: ''
    });
    const [modalType, setModalType] = useState('');
    const [attributes, , triggerAttributesUpdate] = useAttributesByProductTypeId(productType && productType.productTypeId);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState('productType');
    const {t} = useTranslation('');

    const onAbstractProductChangedHandler = useCallback((event) => {
        const {name, value} = event.target;
        setAbstractProduct(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }, []);

    const toggleProductTypeAutocomplete = useCallback(() => setIsProductTypeAutocompleteOpen(prevState => !prevState), []);

    const toggleModal = useCallback(() => setIsModalOpen(prevState => !prevState), []);

    const openModal = useCallback((type) => {
        setModalType(type);
        toggleModal()
    }, [toggleModal]);

    const toggleDialog = useCallback((type) => {
        setDialogType(type);
        setIsDialogOpen(prevState => !prevState)
    }, []);

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

    const onProductTypeSelectHandler = useCallback(async (item) => {
        if (!item) {
            setProductType({});
            setIsExpanded(false);
        } else {
            setProductType(item);
            setIsExpanded(true);
        }
    }, []);

    const updateProductTypes = useCallback((newProductType) => {
        triggerProductTypesUpdate(prevState => ++prevState);
        setProductType(newProductType);
        toggleModal();
        setIsExpanded(true);
    }, [toggleModal, triggerProductTypesUpdate]);

    const updateAttributes = useCallback(() => {
        triggerAttributesUpdate(prevState => ++prevState);
        toggleModal();
    }, [toggleModal, triggerAttributesUpdate]);

    const createAbstractProduct = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            await AbstractProductService.create({
                productTypeId: productType.productTypeId,
                name: abstractProduct.name,
                price: abstractProduct.price,
                description: abstractProduct.description,
            });
            dispatch(setIsLoading(false));
            history.push(`${lastLocation ? lastLocation.pathname : '/abstract-products'}`);
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        }
    }, [productType.productTypeId, abstractProduct, dispatch, history, lastLocation]);

    const deleteProductType = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            const response = await ProductTypeService.delete(productType.productTypeId);
            if (response.success) {
                setIsExpanded(false);
                setProductType({});
                triggerProductTypesUpdate(prevState => ++prevState);
            } else {
                dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
        } finally {
            dispatch(setIsLoading(false));
            toggleDialog('');
        }
    }, [dispatch, toggleDialog, productType.productTypeId, triggerProductTypesUpdate]);

    const deleteAttribute = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            const response = await AttributeService.delete(dialogType);
            if (response.success) {
                triggerAttributesUpdate(prevState => ++prevState);
            } else {
                dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
            }
        } catch (e) {
            dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
        } finally {
            toggleDialog('');
            dispatch(setIsLoading(false));
        }
    }, [dispatch, toggleDialog, dialogType, triggerAttributesUpdate]);

    const renderModalContent = useCallback(() => {
        switch (modalType) {
            case 'createProductType': {
                return (
                    <SaveProductType
                        labels={{
                            title: 'Create Product Type',
                            button: 'Create'
                        }}
                        updateProductTypes={updateProductTypes}
                    />
                );
            }
            case 'editProductType': {
                return (
                    <SaveProductType
                        labels={{
                            title: 'Edit Product Type',
                            button: 'Edit'
                        }}
                        isEdit={true}
                        productType={productType}
                        updateProductTypes={updateProductTypes}
                    />
                )
            }
            case 'addAttribute': {
                return (
                    <CreateAttribute
                        productTypeId={productType.productTypeId}
                        updateAttributes={updateAttributes}
                    />
                )
            }
            default: {
                return null;
            }
        }
    }, [modalType, updateProductTypes, productType, updateAttributes]);

    const renderAttributes = useCallback(() => {
        if (isEmpty(attributes)) {
            return null;
        }

        return attributes.map((attr) => {
            const {attributeId, name, attributeValues} = attr;
            return (
                <Grid item xl={4} lg={4} key={attributeId}>
                    <Card>
                        <CardHeader
                            title={
                                <Typography variant='body1'>
                                    {name}
                                </Typography>
                            }
                            action={
                                <>
                                    <IconButton size='small'>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => toggleDialog(attributeId)} size='small'>
                                        <RemoveIcon/>
                                    </IconButton>
                                </>
                            }
                            style={{
                                padding: 5,
                                border: '1px solid rgba(0, 0, 0, 0.12)'
                            }}
                        />
                        <CardContent style={{maxHeight: 100, overflow: 'auto', padding: 0}}>
                            <List>
                                {attributeValues.map((attrValue) => (
                                        <ListItem key={attrValue.attributeValueId}>
                                            <ListItemText
                                                primary={attrValue.value}
                                            />
                                        </ListItem>
                                    )
                                )}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            );
        });
    }, [attributes, toggleDialog]);

    return (
        <Container component='main' maxWidth='md'>
            <Grid container style={{marginTop: 30}}>
                <Paper style={{padding: 15, width: '100%'}}>
                    <Grid item xl={12} lg={12} style={{marginTop: 10, marginBottom: 10}}>
                        <Typography variant='h6' style={{textAlign: 'center'}}>
                            Create Abstract Product
                        </Typography>
                    </Grid>
                    <Grid container item xl={12} lg={12} style={{marginTop: 10, marginBottom: 10}}>
                        <Grid item xl={10} lg={10} style={{paddingRight: 10}}>
                            <TextField
                                label='Name'
                                name="name"
                                variant="outlined"
                                type="text"
                                value={abstractProduct.name}
                                onChange={onAbstractProductChangedHandler}
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
                                value={abstractProduct.price}
                                onChange={onAbstractProductChangedHandler}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xl={12} lg={12} style={{marginTop: 10}}>
                            <TextField
                                label='Description'
                                name="description"
                                variant="outlined"
                                type="text"
                                value={abstractProduct.description}
                                onChange={onAbstractProductChangedHandler}
                                required
                                fullWidth
                            />
                        </Grid>
                    </Grid>
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
                                value={productType || ''}
                            />
                        </Grid>
                        <Grid item xl={1} lg={1} style={{textAlign: 'center'}}>
                            <IconButton onClick={() => openModal('createProductType')}>
                                <AddCircleIcon fontSize='large'/>
                            </IconButton>
                        </Grid>
                        <Grid item xl={1} lg={1} style={{textAlign: 'center'}}>
                            <IconButton onClick={() => openModal('editProductType')} disabled={isEmpty(productType)}>
                                <EditIcon fontSize='large'/>
                            </IconButton>
                        </Grid>
                        <Grid item xl={1} lg={1} style={{textAlign: 'center'}}>
                            <IconButton onClick={() => toggleDialog('productType')} disabled={isEmpty(productType)}>
                                <DeleteIcon fontSize='large'/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Collapse in={isExpanded} timeout='auto' unmountOnExit>
                        <Grid container item xl={12}>
                            <Grid item xl={12} lg={12} style={{textAlign: 'left', marginTop: 10, marginBottom: 10}}>
                                <Button
                                    variant='outlined'
                                    onClick={() => openModal('addAttribute')}
                                >
                                    Add Attribute
                                </Button>
                            </Grid>
                            <Grid container item xl={12} lg={12} spacing={2}>
                                {renderAttributes()}
                            </Grid>
                            <Grid item xl={12} lg={12} style={{textAlign: 'center', marginTop: 10, marginBottom: 10}}>
                                <Button
                                    variant='outlined'
                                    onClick={createAbstractProduct}
                                >
                                    Create
                                </Button>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Paper>
            </Grid>
            <CustomModal
                open={isModalOpen}
                classes={classes}
                handleClose={toggleModal}
            >
                {renderModalContent()}
            </CustomModal>
            <CustomDialog
                title={dialogType === 'productType' ? 'Delete product type' : 'Delete attribute'}
                isShow={isDialogOpen}
                onClose={() => toggleDialog('')}
                closeText={t('DISAGREE')}
                actionText={t('AGREE')}
                onAction={dialogType === 'productType' ? deleteProductType : deleteAttribute}
            >
                {t('CONFIRM_DELETE')}
            </CustomDialog>
        </Container>
    );
};
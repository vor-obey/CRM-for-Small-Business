import React, {useCallback, useEffect, useState} from 'react';
import {useAttributesByProductTypeId, useProductTypes} from '../../../utils/hooks/productHooks';
import {SaveAbstractProductForm} from '../SaveAbstractProductForm/SaveAbstractProductForm';
import isEmpty from 'lodash/isEmpty';
import Grid from '@material-ui/core/Grid';
import {Card, CardContent, CardHeader, ListItemText} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {SaveProductType} from '../SaveProductType/SaveProductType';
import {CreateAttribute} from '../../pages/CreateAttribute/CreateAttribute';
import {useDispatch} from 'react-redux';
import {
    closeDialog,
    closeModal,
    renderDialog,
    renderModal,
    setIsLoading, setSnackBarStatus
} from '../../../data/store/auxiliary/auxiliaryActions';
import {ProductTypeService, AttributeService} from '../../../services';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';
import {useTranslation} from 'react-i18next';

export const SaveAbstractProduct = ({
                                        abstractProduct,
                                        labels,
                                        onSave,
                                    }) => {

    const dispatch = useDispatch();
    const [abstractProductDetails, setAbstractProductDetails] = useState({
        name: '',
        description: '',
        price: ''
    });
    const [productTypes, , triggerProductTypesUpdate] = useProductTypes();
    const [selectedProductType, setSelectedProductType] = useState({});
    const [attributes, setAttributes, triggerAttributesUpdate] = useAttributesByProductTypeId(selectedProductType && selectedProductType.productTypeId);
    const [isExpanded, setIsExpanded] = useState(false);
    const {t} = useTranslation('');

    const onAbstractProductChangedHandler = useCallback((event) => {
        const {name, value} = event.target;
        setAbstractProductDetails(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }, []);

    useEffect(() => {
        if (!isEmpty(abstractProduct)) {
            const {name, description, price, productType} = abstractProduct;
            setAbstractProductDetails({
                name,
                description,
                price,
            });
            setSelectedProductType(productType);
            setIsExpanded(true);
        }
    }, [abstractProduct, setAttributes]);

    const onProductTypeSelectHandler = useCallback(async (item) => {
        if (!item) {
            setSelectedProductType({});
            setIsExpanded(false);
        } else {
            setSelectedProductType(item);
            setIsExpanded(true);
        }
    }, []);

    const openDeleteAttributeDialog = useCallback((attributeId) => {
        const deleteAttribute = async () => {
            try {
                dispatch(setIsLoading(true));
                const response = await AttributeService.delete(attributeId);
                if (response.success) {
                    triggerAttributesUpdate(prevState => ++prevState);
                } else {
                    dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
                }
            } catch (e) {
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
            } finally {
                dispatch(setIsLoading(false));
                dispatch(closeDialog());
            }
        };

        dispatch(renderDialog({
            title: 'Delete attribute',
            isShow: true,
            onCloseHandler: () => dispatch(closeDialog()),
            closeText: t('DISAGREE'),
            actionText: t('AGREE'),
            onActionHandler: () => deleteAttribute(),
            children: 'Delete abstract product?'
        }));
    }, [dispatch, t, triggerAttributesUpdate]);

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
                                    <IconButton onClick={() => openDeleteAttributeDialog(attributeId)} size='small'>
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
    }, [attributes, openDeleteAttributeDialog]);

    const updateProductTypes = useCallback((newProductType) => {
        triggerProductTypesUpdate(prevState => ++prevState);
        setSelectedProductType(newProductType);
        setIsExpanded(true);
        dispatch(closeModal());
    }, [triggerProductTypesUpdate, dispatch]);

    const updateAttributes = useCallback(() => {
        triggerAttributesUpdate(prevState => ++prevState);
        dispatch(closeModal());
    }, [triggerAttributesUpdate, dispatch]);

    const openCreateProductTypeModal = useCallback(() => {
        dispatch(renderModal({
            isOpen: true,
            classes: {},
            children: (<SaveProductType
                labels={{
                    title: t('CREATE_PRODUCT_TYPE'),
                    button: t('CREATE')
                }}
                t={t}
                updateProductTypes={updateProductTypes}
            />),
            onCloseHandler: () => dispatch(closeModal()),
        }))
    }, [dispatch, updateProductTypes, t]);

    const openEditProductTypeModal = useCallback(() => {
        dispatch(renderModal({
            isOpen: true,
            classes: {},
            children: (
                <SaveProductType
                    labels={{
                        title: t('EDIT_PRODUCT_TYPE'),
                        button: t('EDIT')
                    }}
                    isEdit={true}
                    productType={selectedProductType}
                    updateProductTypes={updateProductTypes}
                />
            ),
            onCloseHandler: () => dispatch(closeModal()),
        }))
    }, [t, dispatch, selectedProductType, updateProductTypes]);

    const openCreateAttributeModal = useCallback(() => {
        dispatch(renderModal({
            isOpen: true,
            classes: {},
            children: (
                <CreateAttribute
                    t={t}
                    productTypeId={selectedProductType.productTypeId}
                    updateAttributes={updateAttributes}
                />
            ),
            onCloseHandler: () => dispatch(closeModal()),
        }))
    }, [t, dispatch, selectedProductType.productTypeId, updateAttributes]);

    const deleteProductType = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            const response = await ProductTypeService.delete(selectedProductType.productTypeId);
            if (response.success) {
                setIsExpanded(false);
                setSelectedProductType({});
                triggerProductTypesUpdate(prevState => ++prevState);
            } else {
                dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
        } finally {
            dispatch(setIsLoading(false));
            dispatch(closeDialog());
        }
    }, [dispatch, selectedProductType.productTypeId, triggerProductTypesUpdate]);

    const openDeleteProductTypeDialog = useCallback(() => {
        dispatch(renderDialog({
            title: t('DELETE_PRODUCT_TYPE'),
            isShow: true,
            onCloseHandler: () => dispatch(closeDialog()),
            closeText: t('DISAGREE'),
            actionText: t('AGREE'),
            onActionHandler: () => deleteProductType(),
            children: t('DELETE_CATEGORIES_PRODUCT')
        }));
    }, [dispatch, deleteProductType, t]);

    const onSubmit = useCallback(() => {
        onSave({
            abstractProductDetails,
            productTypeId: selectedProductType.productTypeId,
        })
    }, [onSave, abstractProductDetails, selectedProductType]);

    return (
        <SaveAbstractProductForm
            labels={labels}
            abstractProductDetails={abstractProductDetails}
            onAbstractProductChangedHandler={onAbstractProductChangedHandler}
            productTypes={productTypes}
            selectedProductType={selectedProductType}
            onProductTypeSelectHandler={onProductTypeSelectHandler}
            isExpanded={isExpanded}
            renderAttributes={renderAttributes}
            openCreateProductTypeModal={openCreateProductTypeModal}
            openEditProductTypeModal={openEditProductTypeModal}
            openCreateAttributeModal={openCreateAttributeModal}
            openDeleteProductTypeDialog={openDeleteProductTypeDialog}
            onSubmit={onSubmit}
            t={t}
        />
    );
};

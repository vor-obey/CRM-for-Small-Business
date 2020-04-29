import React, {useCallback, useEffect, useState} from 'react';
import {useAttributesByProductTypeId, useProductTypes} from '../../../utils/hooks/productHooks';
import {SaveAbstractProductForm} from '../SaveAbstractProductForm/SaveAbstractProductForm';
import isEmpty from 'lodash/isEmpty';
import {
    ListItemText,
    Grid,
    Typography,
    IconButton,
    List,
    ListItem,
    makeStyles
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
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
import {EditAttribute} from '../EditAttribute/EditAttribute';
import {saveAbstractProductPageStyles} from "./SaveAbstractProduct.style";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const useStyles = makeStyles(saveAbstractProductPageStyles);

export const SaveAbstractProduct = ({
                                        abstractProduct,
                                        labels,
                                        onSave,
                                    }) => {

    const classes = useStyles();
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
            isShow: true,
            onCloseHandler: () => dispatch(closeDialog()),
            closeText: t('DISAGREE'),
            actionText: t('AGREE'),
            onActionHandler: () => deleteAttribute(),
            children: t('DELETE_ATTRIBUTE_PRODUCT')
        }));
    }, [dispatch, t, triggerAttributesUpdate]);

    const updateAttributes = useCallback(() => {
        triggerAttributesUpdate(prevState => ++prevState);
        dispatch(closeModal());
    }, [triggerAttributesUpdate, dispatch]);

    const openEditAttributeModal = useCallback((attribute) => {
        dispatch(renderModal({
            isOpen: true,
            classes: {},
            children: (
                <EditAttribute
                    attribute={attribute}
                    updateAttributes={updateAttributes}
                />
            ),
            onCloseHandler: () => dispatch(closeModal()),
        }))
    }, [dispatch, updateAttributes]);

    const renderAttributes = useCallback(() => {
        if (isEmpty(attributes)) {
            return null;
        }

        return attributes.map((attr) => {
            const {attributeId, name, attributeValues} = attr;
            return (
                <Grid item xs={12} sm={12} className={classes.containerType} key={attributeId}>
                    <List>
                        <ListItem sm={12} xs={12} className={classes.containerTypeItem}>
                            <ListItemText>
                                <Typography variant='body1'>
                                    {name}
                                </Typography>
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => openEditAttributeModal(attr)} size='small'>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton onClick={() => openDeleteAttributeDialog(attributeId)} size='small'>
                                    <RemoveIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.attributeValue}>
                            {attributeValues.map((attrValue) => (
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        key={attrValue.attributeValueId}
                                        className={classes.attributeValueItem}
                                    >
                                        {attrValue.value}
                                    </Typography>
                                )
                            )}
                        </ListItem>
                    </List>
                </Grid>
            );
        });
    }, [attributes, openDeleteAttributeDialog, openEditAttributeModal, classes]);

    const updateProductTypes = useCallback((newProductType) => {
        triggerProductTypesUpdate(prevState => ++prevState);
        setSelectedProductType(newProductType);
        setIsExpanded(true);
        dispatch(closeModal());
    }, [triggerProductTypesUpdate, dispatch]);

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
                    t={t}
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
            isShow: true,
            onCloseHandler: () => dispatch(closeDialog()),
            closeText: t('DISAGREE'),
            actionText: t('AGREE'),
            onActionHandler: () => deleteProductType(),
            children: t('DELETE_TYPE_PRODUCT')
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
            classes={classes}
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

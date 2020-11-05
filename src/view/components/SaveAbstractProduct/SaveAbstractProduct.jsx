import React, {useCallback, useEffect, useState} from 'react';
import {useAttributesByProductTypeId, useProductTypes} from '../../../utils/hooks/productHooks';
import {SaveAbstractProductForm} from '../SaveAbstractProductForm/SaveAbstractProductForm';
import isEmpty from 'lodash/isEmpty';
import {
    Card,
    CardHeader,
    CardContent,
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
import {
    createAttribute,
    deleteAttribute,
    deleteProductType,
    editAttribute
} from "../../../data/store/product/productActions";

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
    const {productsTypes, triggerProductTypesUpdate} = useProductTypes();
    const [selectedProductType, setSelectedProductType] = useState({});
    const {attributes, triggerAttributesUpdate} = useAttributesByProductTypeId(selectedProductType && selectedProductType.productTypeId);
    const [isExpanded, setIsExpanded] = useState(false);
    const {t} = useTranslation('');

    console.log(selectedProductType)

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
    }, [abstractProduct]);

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
        const onDeleteAttribute = () => {
            const onSuccessfullyDeleted = () => {
                triggerAttributesUpdate(prevState => ++prevState);
            }
                dispatch(deleteAttribute({attributeId, onSuccessfullyDeleted}))

                dispatch(closeDialog());
            };

        dispatch(renderDialog({
            isShow: true,
            onCloseHandler: () => dispatch(closeDialog()),
            closeText: t('DISAGREE'),
            actionText: t('AGREE'),
            onActionHandler: () => onDeleteAttribute(),
            children: t('DELETE_ATTRIBUTE')
        }));
    }, [dispatch, t, triggerAttributesUpdate]);

    const updateAttributes = useCallback(() => {
        triggerAttributesUpdate(prevState => ++prevState);
        dispatch(closeModal());
    }, [triggerAttributesUpdate, dispatch]);

    const openEditAttributeModal = useCallback((attribute) => {
        const onEditAttribute = async (data) => {
            if (data && data.attrValues) {
                const {name, attrValues} = data;
                const attributeValues = [];
                for (const attrValue of attrValues) {
                    const {attributeValueId, action} = attrValue;
                    if (attributeValueId) {
                        attributeValues.push(attrValue);
                    }
                    if (!attributeValueId && action === 'add') {
                        attributeValues.push(attrValue);
                    }
                }
                const updateAtrSuccess = () => {
                    updateAttributes();
                }

                dispatch(editAttribute({attribute, name, attributeValues, updateAtrSuccess}));
            }
        }
        dispatch(renderModal({
            isOpen: true,
            children: (
                <EditAttribute
                    attribute={attribute}
                    onSubmit={onEditAttribute}
                />
            ),
            onCloseHandler: () => dispatch(closeModal()),
            allowBackDropClick: true
        }))
    }, [dispatch, updateAttributes]);

    const renderAttributes = useCallback(() => {
        if (isEmpty(attributes)) {
            return null;
        }

        return attributes.map((attr) => {
            const {attributeId, name, attributeValues} = attr;
            return (
                <Grid item xs={12} className={classes.containerAttributeItem} key={attributeId}>
                    <Card>
                        <CardHeader
                            title={
                                <Typography variant='body1'>
                                    {name}
                                </Typography>
                            }
                            action={
                                <>
                                    <IconButton onClick={() => openEditAttributeModal(attr)} size='small'>
                                        <EditIcon/>
                                    </IconButton>
                                    {attributes.length === 1
                                        ? null
                                        : <IconButton onClick={() => openDeleteAttributeDialog(attributeId)} size='small'>
                                            <RemoveIcon/>
                                        </IconButton>
                                    }
                                </>
                            }
                            className={classes.cardHeader}
                        />
                        <CardContent className={classes.attributeCard}>
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
            children: (<SaveProductType
                labels={{
                    title: t('CREATE_PRODUCT_TYPE'),
                    button: t('CREATE')
                }}
                t={t}
                classes={classes}
                updateProductTypes={updateProductTypes}
            />),
            onCloseHandler: () => dispatch(closeModal()),
            allowBackDropClick: true
        }))
    }, [dispatch, updateProductTypes, t, classes]);

    const openEditProductTypeModal = useCallback(() => {
        dispatch(renderModal({
            isOpen: true,
            children: (
                <SaveProductType
                    classes={classes}
                    labels={{
                        title: t('EDIT_PRODUCT_TYPE'),
                        button: t('SAVE')
                    }}
                    isEdit={true}
                    productType={selectedProductType}
                    updateProductTypes={updateProductTypes}
                    t={t}
                />
            ),
            onCloseHandler: () => dispatch(closeModal()),
            allowBackDropClick: true
        }))
    }, [t, dispatch, selectedProductType, updateProductTypes, classes]);

    const onCreateAttribute = useCallback(async (data) => {

        const {name, valuesToSave} = data;
        dispatch(createAttribute({selectedProductType, name, valuesToSave,updateAttributes}));

    }, [dispatch, selectedProductType, updateAttributes]);

    const openCreateAttributeModal = useCallback(() => {
        dispatch(renderModal({
            isOpen: true,
            children: (
                <CreateAttribute
                    onSubmit={onCreateAttribute}
                />
            ),
            onCloseHandler: () => dispatch(closeModal()),
            allowBackDropClick: true
        }))
    }, [dispatch, onCreateAttribute]);

    const onDeleteProductType = useCallback(async () => {
        const id = selectedProductType.productTypeId;
        const deletedSuccess = (response) => {
            if(response.success){
                setIsExpanded(false);
                setSelectedProductType({});
                triggerProductTypesUpdate(prevState => ++prevState);
            }
        }

        dispatch(deleteProductType({id, deletedSuccess}));

    }, [dispatch, selectedProductType.productTypeId, triggerProductTypesUpdate]);

    const openDeleteProductTypeDialog = useCallback(() => {
        dispatch(renderDialog({
            isShow: true,
            onCloseHandler: () => dispatch(closeDialog()),
            closeText: t('DISAGREE'),
            actionText: t('AGREE'),
            onActionHandler: () => onDeleteProductType(),
            children: t('DELETE_TYPE_PRODUCT')
        }));
    }, [dispatch, onDeleteProductType, t]);

    const disableButton = useCallback(() => {
        if (!abstractProductDetails.name.trim().length) {
            return true;
        }
        if (!abstractProductDetails.price) {
            return true;
        }
        if (!abstractProductDetails.description.trim().length) {
            return true;
        }
        if (isEmpty(selectedProductType)) {
            return true;
        }
        if (isEmpty(attributes)) {
            return true;
        }
        return false;
    }, [abstractProductDetails, attributes, selectedProductType]);

    const onSubmit = useCallback(() => {
        onSave({
            abstractProductDetails,
            productTypeId: selectedProductType.productTypeId,
            name: selectedProductType.name,
        })
    }, [onSave, abstractProductDetails, selectedProductType]);

    return (
        <SaveAbstractProductForm
            classes={classes}
            labels={labels}
            abstractProductDetails={abstractProductDetails}
            onAbstractProductChangedHandler={onAbstractProductChangedHandler}
            productTypes={productsTypes}
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
            disableButton={disableButton}
        />
    );
};

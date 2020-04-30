import React, {useCallback, useEffect, useState} from 'react';
import {
    Grid,
    Container,
    Paper,
    Button,
    Card,
    CardHeader,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Typography,
    IconButton,
    makeStyles
} from '@material-ui/core';
import {useProductTypeById} from '../../../utils/hooks/productHooks';
import {useParams} from "react-router-dom";
import {useDispatch} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import {
    closeDialog,
    closeModal,
    renderDialog,
    renderModal,
    setIsLoading, setSnackBarStatus
} from '../../../data/store/auxiliary/auxiliaryActions';
import {EditAttribute} from '../../components/EditAttribute/EditAttribute';
import {SaveProductTypeWithAttributes} from '../../components/SaveProductTypeWithAttributes/SaveProductTypeWithAttributes';
import {CreateAttribute} from '../CreateAttribute/CreateAttribute';
import {v4 as uuidv4} from 'uuid'
import {AttributeService, ProductTypeService} from '../../../services';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';
import {useLastLocation} from 'react-router-last-location';
import {editProductTypeWithAttributesStyles} from "./EditProductTypeWithAttributes.style";

const useStyles = makeStyles(editProductTypeWithAttributesStyles);

export const EditProductTypeWithAttributes = ({history}) => {
    const classes = useStyles();
    const {id} = useParams();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [attributes, setAttributes] = useState([]);
    const [productTypeDetails] = useProductTypeById(id);
    const lastLocation = useLastLocation();

    const mapAttributes = useCallback((items) => {
        return items.map((item) => {
            const {productTypeAttributeId, attribute} = item;
            const {attributeId, name, attributeValues} = attribute;
            return {
                productTypeAttributeId,
                attributeId,
                id: uuidv4(),
                name,
                attributeValues
            }
        });
    }, []);

    useEffect(() => {
        if (!isEmpty(productTypeDetails)) {
            setName(productTypeDetails.name);
            setAttributes(mapAttributes(productTypeDetails.productTypeToAttributes));
        }
    }, [mapAttributes, productTypeDetails]);

    const onChange = useCallback((event) => {
        setName(event.target.value);
    }, []);

    const createAttribute = useCallback((attribute) => {
        dispatch(closeModal());
        setAttributes(prevState => [...prevState, {
            id: new Date().getTime(),
            name: attribute.name,
            attributeValues: attribute.valuesToSave,
        }]);
    }, [dispatch]);

    const openCreateAttributeModal = useCallback(() => {
        dispatch(renderModal({
            isOpen: true,
            classes: {},
            children: (
                <CreateAttribute
                    onSubmit={createAttribute}
                />
            ),
            onCloseHandler: () => dispatch(closeModal()),
        }))
    }, [dispatch, createAttribute]);

    const openEditAttributeModal = useCallback((attribute) => {
        const editAttribute = (data) => {
            const editedAttribute = {
                attributeValues: data.attrValues,
                name: data.name,
                attributeId: attribute.attributeId,
                id: attribute.id,
                productTypeAttributeId: attribute.productTypeAttributeId,
            };
            const newArr = cloneDeep(attributes);
            const selectedAttributeIndex = newArr.findIndex(item => item.id === editedAttribute.id);
            newArr[selectedAttributeIndex] = editedAttribute;
            setAttributes(newArr);
            dispatch(closeModal());
        };

        const newAttribute = {...attribute};
        if (!newAttribute.attributeValues[0].value) {
            newAttribute.attributeValues = newAttribute.attributeValues.map(item => ({value: item}));
        }
        dispatch(renderModal({
            isOpen: true,
            classes: {},
            children: (
                <EditAttribute
                    attribute={newAttribute}
                    onSubmit={editAttribute}
                />
            ),
            onCloseHandler: () => dispatch(closeModal()),
        }))
    }, [dispatch, attributes]);

    const openDeleteAttributeDialog = useCallback((attribute) => {
        const deleteAttribute = async ({attributeId, id}) => {
            try {
                dispatch(setIsLoading(true));
                if (attributeId) {
                    const response = await AttributeService.delete(attributeId);
                    if (response.success) {
                        const newArr = cloneDeep(attributes);
                        const selectedAttributeIndex = newArr.findIndex(item => item.attributeId === attributeId);
                        const splicedArr = newArr.splice(selectedAttributeIndex, 1);
                        setAttributes(splicedArr);
                    } else {
                        dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
                    }
                } else {
                    const newArr = cloneDeep(attributes);
                    const selectedAttributeIndex = newArr.findIndex(item => item.id === id);
                    newArr.splice(selectedAttributeIndex, 1);
                    setAttributes(newArr);
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
            closeText: 'disagree',
            actionText: 'agree',
            onActionHandler: () => deleteAttribute(attribute),
            children: 'Delete abstract product?'
        }));
    }, [dispatch, attributes]);

    const renderAttributes = useCallback(() => {
        if (isEmpty(attributes)) {
            return null;
        }

        return attributes.map((attr) => {
            const {attributeId, id, name, attributeValues} = attr;
            return (
                <Grid
                    item xs={12} sm={5}
                    key={attributeId ? attributeId : id}
                >
                    <Card className={classes.containerAttributeItem}>
                        <CardHeader
                            className={classes.containerAttributeHeader}
                            title={
                                <Typography variant='body1'>
                                    {name}
                                </Typography>
                            }
                            action={
                                <Grid className={classes.containerAttributeIcon}>
                                    <IconButton onClick={() => openEditAttributeModal(attr)} size='small'>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => openDeleteAttributeDialog(attr)} size='small'>
                                        <RemoveIcon/>
                                    </IconButton>
                                </Grid>
                            }
                        />
                        <CardContent className={classes.containerAttributeContent}>
                            <List>
                                {attributeValues.map((attributeValue, index) => (
                                        <ListItem key={index} disabled={attributeValue.action === 'remove'}>
                                            <ListItemText
                                                primary={attributeValue.value || attributeValue}
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
    }, [classes, attributes, openEditAttributeModal, openDeleteAttributeDialog]);

    const editProductType = useCallback(async () => {
        const newAttributes = cloneDeep(attributes);
        for (const attribute of newAttributes) {
            let resultValues = [];
            const {attributeValues} = attribute;
            attributeValues.forEach((item) => {
                if (item.attributeValueId && typeof item.action === 'string') {
                    resultValues.push(item);
                }
                if (item.attributeValueId && typeof item.action === 'undefined') {
                    resultValues.push(item);
                }
                if (!item.attributeValueId && item.action === 'add') {
                    resultValues.push(item);
                }
                if (!item.attributeValueId && typeof item.action === 'undefined' && typeof item === 'string') {
                    resultValues.push({value: item, action: 'add'})
                }
            });
            attribute.attributeValues = resultValues;
        }
        try {
            dispatch(setIsLoading(true));
            const response = await ProductTypeService.update({
                productTypeId: id,
                name,
                attributes: newAttributes,
            });
            if (response.success) {
                dispatch(setIsLoading(false));
                history.push(`${lastLocation ? lastLocation.pathname : `/product-types/${id}`}`);
            } else {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        }
    }, [id, name, attributes, dispatch, history, lastLocation]);

    return (
        <Container maxWidth='md' className={classes.root}>
            <Paper className={classes.container}>
                <Grid container>
                    <SaveProductTypeWithAttributes
                        classes={classes}
                        productTypeName={name}
                        onChange={onChange}
                        openCreateAttributeModal={openCreateAttributeModal}
                        renderAttributes={renderAttributes}
                        title='Edit product type'
                    />
                </Grid>
                <Grid item xs={12} sm={12} className={classes.buttonContainer}>
                    <Button
                        className={classes.buttonFab}
                        variant='outlined'
                        onClick={editProductType}
                        disabled={isEmpty(attributes) || isEmpty(name.trim())}
                    >
                        Edit
                    </Button>
                </Grid>
            </Paper>
        </Container>
    );
};
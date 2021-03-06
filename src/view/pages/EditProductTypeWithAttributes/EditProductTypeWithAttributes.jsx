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
} from '../../../data/store/auxiliary/auxiliaryActions';
import {EditAttribute} from '../../components/EditAttribute/EditAttribute';
import {SaveProductTypeWithAttributes} from '../../components/SaveProductTypeWithAttributes/SaveProductTypeWithAttributes';
import {CreateAttribute} from '../CreateAttribute/CreateAttribute';
import {v4 as uuidv4} from 'uuid'
import {useTranslation} from 'react-i18next';
import {editProductTypeWithAttributesStyles} from "./EditProductTypeWithAttributes.style";
import {PRODUCT_TYPES} from "../../../constants/routes";
import {deleteAttribute, editProductType} from "../../../data/store/product/productActions";

const useStyles = makeStyles(editProductTypeWithAttributesStyles);

export const EditProductTypeWithAttributes = ({history}) => {
    const classes = useStyles();
    const {id} = useParams();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [attributes, setAttributes] = useState([]);
    const {productType} = useProductTypeById(id);
    const {t} = useTranslation('');

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
        if (!isEmpty(productType)) {
            setName(productType.name);
            setAttributes(mapAttributes(productType.productTypeToAttributes));
        }
    }, [mapAttributes, productType]);

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
            children: (
                <CreateAttribute onSubmit={createAttribute}/>
                ),
            onCloseHandler: () => dispatch(closeModal()),
            allowBackDropClick: true
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
            children: (
                <EditAttribute
                    attribute={newAttribute}
                    onSubmit={editAttribute}
                />
            ),
            onCloseHandler: () => dispatch(closeModal()),
            allowBackDropClick: true
        }))
    }, [dispatch, attributes]);

    const openDeleteAttributeDialog = useCallback((attribute) => {
        const onDeleteAttribute = async ({attributeId, id}) => {
            const onSuccessfullyDeleted = () => {
                const newArr = cloneDeep(attributes);
                const selectedAttributeIndex = newArr.findIndex(item => item.attributeId === attributeId);
                const splicedArr = newArr.splice(selectedAttributeIndex, 1);
                setAttributes(splicedArr);
            }
            if (attributeId) {
                dispatch(deleteAttribute({attributeId, onSuccessfullyDeleted}));

            } else {
                const newArr = cloneDeep(attributes);
                const selectedAttributeIndex = newArr.findIndex(item => item.id === id);
                newArr.splice(selectedAttributeIndex, 1);
                setAttributes(newArr);
            }
                dispatch(closeDialog());
            }

        dispatch(renderDialog({
            isShow: true,
            onCloseHandler: () => dispatch(closeDialog()),
            closeText: 'disagree',
            actionText: 'agree',
            onActionHandler: () => onDeleteAttribute(attribute),
            children: t('DELETE_ATTRIBUTE')
        }));
    }, [dispatch, t, attributes]);

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
                                    {attributes.length === 1
                                        ? null
                                        : <IconButton onClick={() => openDeleteAttributeDialog(attr)} size='small'>
                                            <RemoveIcon/>
                                        </IconButton>
                                    }
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

    const onEditProductType = useCallback(async () => {
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

        dispatch(editProductType({id, name, newAttributes}))

        history.push(`${PRODUCT_TYPES}/${id}`);

    }, [id, name, attributes, dispatch, history]);

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
                        title={t('EDIT_PRODUCT_TYPE')}
                    />
                </Grid>
                <Grid item xs={12} sm={12} className={classes.buttonContainer}>
                    <Button
                        className={classes.buttonFab}
                        variant='outlined'
                        onClick={onEditProductType}
                        disabled={isEmpty(attributes) || isEmpty(name.trim())}
                    >
                        {t('SAVE')}
                    </Button>
                </Grid>
            </Paper>
        </Container>
    );
};

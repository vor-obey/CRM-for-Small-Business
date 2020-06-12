import React, {useCallback, useState} from 'react';
import {SaveProductTypeWithAttributes} from '../../components/SaveProductTypeWithAttributes/SaveProductTypeWithAttributes';
import {
    closeDialog,
    closeModal, renderDialog,
    renderModal,
    setIsLoading,
    setSnackBarStatus
} from '../../../data/store/auxiliary/auxiliaryActions';
import {CreateAttribute} from '../CreateAttribute/CreateAttribute';
import {useDispatch} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {
    Grid,
    Container,
    Paper,
    Button,
    Card,
    CardHeader,
    CardContent,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemText,
    makeStyles
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from "@material-ui/icons/Edit";
import {EditAttribute} from '../../components/EditAttribute/EditAttribute';
import {ProductTypeService} from '../../../services';
import {editProductTypeWithAttributesStyles} from "../EditProductTypeWithAttributes/EditProductTypeWithAttributes.style";
import {useTranslation} from "react-i18next";
import cloneDeep from 'lodash/cloneDeep';
import {v4 as uuidv4} from 'uuid'

const useStyle = makeStyles(editProductTypeWithAttributesStyles);

export const CreateProductTypeWithAttributes = ({history}) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [attributes, setAttributes] = useState([]);
    const {t} = useTranslation();

    const onChange = useCallback((event) => {
        setName(event.target.value);
    }, []);

    const createAttribute = useCallback((attribute) => {
        dispatch(closeModal());
        setAttributes(prevState => [...prevState, {
            id: uuidv4(),
            name: attribute.name,
            attributeValues: attribute.valuesToSave,
        }]);
    }, [dispatch]);

    const openCreateAttributeModal = useCallback(() => {
        dispatch(renderModal({
            isOpen: true,
            children: (
                <CreateAttribute
                    onSubmit={createAttribute}
                />
            ),
            onCloseHandler: () => dispatch(closeModal()),
            allowBackDropClick: true
        }))
    }, [dispatch, createAttribute]);

    const openEditAttributeModal = useCallback((attribute) => {
        const editAttribute = (data) => {
            const {name, attrValues} = data;
            const newAttrValues = attrValues
                .filter(item => item.action === 'add')
                .map(item => item.value);
            const newAttributes = [...attributes];
            const selectedAttributeIndex = newAttributes.findIndex(item => item.id === attribute.id);
            newAttributes[selectedAttributeIndex].attributeValues = newAttrValues;
            newAttributes[selectedAttributeIndex].name = name;
            setAttributes(newAttributes);
            dispatch(closeModal());
        };

        const newAttribute = {...attribute};
        newAttribute.attributeValues = newAttribute.attributeValues.map(item => ({value: item}));
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
        const deleteAttribute = async (attribute) => {
            const newArr = cloneDeep(attributes);
            const selectedAttributeIndex = newArr.findIndex(item => item.id === attribute.id);
            newArr.splice(selectedAttributeIndex, 1);
            setAttributes(newArr);
            dispatch(closeDialog());
        };
        dispatch(renderDialog({
            isShow: true,
            onCloseHandler: () => dispatch(closeDialog()),
            closeText: 'disagree',
            actionText: 'agree',
            onActionHandler: () => deleteAttribute(attribute),
            children: t('DELETE_ATTRIBUTE')
        }));
    }, [dispatch, t, attributes]);

    const renderAttributes = useCallback(() => {
        if (isEmpty(attributes)) {
            return null;
        }

        return attributes.map((attr) => {
            const {id, name, attributeValues} = attr;
            return (
                <Grid
                    item xs={12} sm={5}
                    key={id}>
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
                                {attributeValues.map((value, index) => (
                                        <ListItem key={index}>
                                            <ListItemText
                                                primary={value}
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

    const createProductType = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            await ProductTypeService.create({
                name,
                attributes
            });
            dispatch(setIsLoading(false));
            history.push('/product-types');
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        }
    }, [attributes, name, dispatch, history]);

    return (
        <Container maxWidth='md' className={classes.root}>
            <Paper className={classes.container}>
                <Grid container>
                    <SaveProductTypeWithAttributes
                        productTypeName={name}
                        onChange={onChange}
                        openCreateAttributeModal={openCreateAttributeModal}
                        renderAttributes={renderAttributes}
                        title={t('CREATE_PRODUCT_TYPE')}
                        classes={classes}
                    />
                </Grid>
                <Grid item xs={12} sm={12} className={classes.buttonContainer}>
                    <Button
                        className={classes.buttonFab}
                        variant='outlined'
                        onClick={createProductType}
                        disabled={isEmpty(attributes)}
                    >
                        {t('CREATE')}
                    </Button>
                </Grid>
            </Paper>
        </Container>
    );
};

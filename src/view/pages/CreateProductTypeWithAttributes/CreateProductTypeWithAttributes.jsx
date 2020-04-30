import React, {useCallback, useState} from 'react';
import {SaveProductTypeWithAttributes} from '../../components/SaveProductTypeWithAttributes/SaveProductTypeWithAttributes';
import {closeModal, renderModal, setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {CreateAttribute} from '../CreateAttribute/CreateAttribute';
import {useDispatch} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from "@material-ui/icons/Edit";
import {Container, Paper} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {EditAttribute} from '../../components/EditAttribute/EditAttribute';
import {ProductTypeService} from '../../../services';
import {useLastLocation} from 'react-router-last-location';

export const CreateProductTypeWithAttributes = ({history}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [attributes, setAttributes] = useState([]);
    const lastLocation = useLastLocation();

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

    const renderAttributes = useCallback(() => {
        if (isEmpty(attributes)) {
            return null;
        }

        return attributes.map((attr) => {
            const {id, name, attributeValues} = attr;
            return (
                <Grid item xl={4} lg={4} key={id}>
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
                                    <IconButton size='small'>
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
    }, [attributes, openEditAttributeModal]);

    const createProductType = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            await ProductTypeService.create({
                name,
                attributes
            });
            dispatch(setIsLoading(false));
            history.push(`${lastLocation ? lastLocation.pathname : '/product-types'}`);
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        }
    }, [attributes, name, dispatch, history, lastLocation]);

    return (
        <Container maxWidth='md' style={{marginTop: 30}}>
            <Paper style={{padding: 15}}>
                <Grid container>
                    <SaveProductTypeWithAttributes
                        productTypeName={name}
                        onChange={onChange}
                        openCreateAttributeModal={openCreateAttributeModal}
                        renderAttributes={renderAttributes}
                        title='Create product type'
                    />
                </Grid>
                <Grid item xl={12} lg={12} style={{textAlign: 'center'}}>
                    <Button
                        variant='outlined'
                        onClick={createProductType}
                        disabled={isEmpty(attributes)}
                    >
                        Create
                    </Button>
                </Grid>
            </Paper>
        </Container>
    );
};
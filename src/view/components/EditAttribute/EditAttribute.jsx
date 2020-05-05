import React, {useCallback, useEffect, useState} from 'react';
import {SaveAttributeForm} from '../SaveAttributeForm/SaveAttributeForm';
import isEmpty from 'lodash/isEmpty';
import ListItem from '@material-ui/core/ListItem';
import {ListItemIcon, ListItemSecondaryAction, ListItemText, TextField} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import {useDispatch} from 'react-redux';
import {closeModal, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import {useTranslation} from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {editAttributeStyles} from './EditAttribute.style';

const useStyles = makeStyles(editAttributeStyles);

export const EditAttribute = ({
                                  attribute,
                                  onSubmit
                              }) => {
    const [name, setName] = useState(attribute.name);
    const [attrValues, setAttrValues] = useState(attribute.attributeValues);
    const dispatch = useDispatch();
    const [edit, setEdit] = useState({
        id: '',
        newValue: '',
    });
    const {t} = useTranslation('');
    const classes = useStyles();

    useEffect(() => {
        if (attribute.attributeValues) {
            const map = attribute.attributeValues.map((item) => {
                return {
                    ...item,
                    action: item.action ? item.action : 'add',
                };
            });
            setAttrValues(map);
        }
    }, [attribute.attributeValues]);

    const addAttributeValue = useCallback((value) => {
        if (value.trim().length !== 0) {
            const existingValue = attrValues.find(item => item.value === value);
            if (!existingValue) {
                setAttrValues(prevState => {
                    return [...prevState, {
                        value: value,
                        action: 'add',
                    }];
                });
            } else {
                dispatch(setSnackBarStatus({isOpen: true, message: 'Value is already existing', success: false}));
            }
        } else {
            dispatch(setSnackBarStatus({isOpen: true, message: 'Empty value is not allowed', success: false}));
        }
    }, [attrValues, dispatch]);

    const onAttributeNameChange = useCallback((event) => {
        setName(event.target.value);
    }, []);

    const removeAttributeValue = useCallback((value) => {
        const newAttrValues = [...attrValues];
        const selectedValueIndex = newAttrValues.findIndex(item => item.value === value);
        newAttrValues[selectedValueIndex].action = 'remove';
        setAttrValues(newAttrValues);
    }, [attrValues]);

    const revertDeletingAttributeValue = useCallback((value) => {
        const newAttrValues = [...attrValues];
        const selectedValueIndex = newAttrValues.findIndex(item => item.value === value);
        newAttrValues[selectedValueIndex].action = 'add';
        setAttrValues(newAttrValues);
    }, [attrValues]);

    const editAttributeValue = useCallback((value) => {
        setEdit({id: value, newValue: value});
    }, []);

    const saveAttributeValue = useCallback((value) => {
        if (edit.newValue.trim().length !== 0) {
            const existingValue = attrValues.find(item => item.value === edit.newValue);
            if (!existingValue) {
                const newAttrValues = [...attrValues];
                const selectedValueIndex = newAttrValues.findIndex(item => item.value === value);
                newAttrValues[selectedValueIndex].value = edit.newValue;
                setAttrValues(newAttrValues);
                setEdit({id: '', newValue: ''})
            } else {
                dispatch(setSnackBarStatus({isOpen: true, message: 'Value is already existing', success: false}));
            }
        } else {
            dispatch(setSnackBarStatus({isOpen: true, message: 'Empty value is not allowed', success: false}));
        }
    }, [attrValues, edit, dispatch]);

    const renderActions = useCallback((value, action) => {
        let actionNode;

        if (action === 'add') {
            actionNode = (
                <IconButton disabled={(edit.id !== '' && edit.id !== value)}
                            onClick={() => removeAttributeValue(value)}>
                    <RemoveIcon/>
                </IconButton>
            );
        }
        if (action === 'remove') {
            actionNode = (
                <IconButton onClick={() => revertDeletingAttributeValue(value)}>
                    <AddIcon/>
                </IconButton>
            );
        }

        if (edit.id === value) {
            return (
                <IconButton onClick={() => setEdit({id: '', newValue: ''})}>
                    <CancelIcon/>
                </IconButton>
            );
        }

        return (
            <>
                <IconButton onClick={() => editAttributeValue(value)}
                            disabled={action === 'remove' || (edit.id !== '' && edit.id !== value)}>
                    <EditIcon/>
                </IconButton>
                {actionNode}
            </>
        );
    }, [edit.id, editAttributeValue, removeAttributeValue, revertDeletingAttributeValue]);

    const renderAttributeValues = useCallback(() => {
        if (isEmpty(attrValues)) {
            return null;
        }

        return attrValues.map(({value, action}) => {
            return (
                <ListItem key={value}
                          disabled={action === 'remove'}
                >
                    {edit.id === value ? (
                        <ListItemIcon>
                            <IconButton onClick={() => saveAttributeValue(value)}>
                                <CheckIcon/>
                            </IconButton>
                        </ListItemIcon>
                    ) : null}
                    <ListItemText
                        primary={edit.id === value ? (
                            <TextField
                                label='add value'
                                name='newValue'
                                variant='standard'
                                type='text'
                                value={edit.newValue || ''}
                                onChange={(event) =>
                                    setEdit({id: value, newValue: event.target.value})
                                }
                                size='small'
                            />
                        ) : value}
                    />
                    <ListItemSecondaryAction>
                        {renderActions(value, action)}
                    </ListItemSecondaryAction>
                </ListItem>
            );
        });
    }, [attrValues, edit, saveAttributeValue, renderActions]);

    return (
        <>
            <SaveAttributeForm
                name={name}
                onChange={onAttributeNameChange}
                renderAttrValues={renderAttributeValues}
                addAttributeValue={addAttributeValue}
                title={t('ATTRIBUTE_EDITING')}
                classes={classes}
            />
            <Grid item xl={12} lg={12} className={classes.buttonContainer}>
                <Button
                    variant='outlined'
                    onClick={() => dispatch(closeModal())}
                    className={classes.button}
                >
                    {t('CANCEL')}
                </Button>
                <Button
                    onClick={() => onSubmit({name, attrValues})}
                    variant='outlined'
                    className={classes.button}
                >
                    {t('EDIT')}
                </Button>
            </Grid>
        </>
    );
};

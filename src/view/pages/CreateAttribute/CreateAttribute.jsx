import React, {useCallback, useState} from 'react';
import {SaveAttributeForm} from '../../components/SaveAttributeForm/SaveAttributeForm';
import {useDispatch} from 'react-redux';
import {closeModal, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import isEmpty from 'lodash/isEmpty';
import RemoveIcon from '@material-ui/icons/Remove';
import {useTranslation} from 'react-i18next';
import {createAttributeStyles} from "./CreateAttribute.style";
import {makeStyles, Grid, Button, IconButton, ListItem, ListItemText, ListItemSecondaryAction} from '@material-ui/core'

const useStyles = makeStyles(createAttributeStyles);

export const CreateAttribute = ({
                                    onSubmit
                                }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [valuesToSave, setValuesToSave] = useState([]);
    const {t} = useTranslation('');

    const onChange = useCallback((event) => {
        setName(event.target.value);
    }, []);

    const addAttributeValue = useCallback((value) => {
        const newArr = [...valuesToSave];
        const selectedValueIndex = newArr.findIndex(item => item === value);
        if (selectedValueIndex === -1) {
            setValuesToSave(prevState => [...prevState, value]);
        } else {
            dispatch(setSnackBarStatus({isOpen: true, message: 'Value is already existing', success: false}));
        }
    }, [dispatch, valuesToSave]);

    const removeAttributeValue = useCallback((index) => {
        setValuesToSave(prevState => {
            return prevState.filter((item, i) => i !== index);
        });
    }, []);

    const renderAttrValues = useCallback(() => {
        if (isEmpty(valuesToSave)) {
            return null;
        }

        return valuesToSave.map((attrValue, index) => {
            return (
                <ListItem key={index}>
                    <ListItemText
                        primary={attrValue}
                    />
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => removeAttributeValue(index)}>
                            <RemoveIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        });
    }, [valuesToSave, removeAttributeValue]);

    return (
        <>
            <SaveAttributeForm
                name={name}
                onChange={onChange}
                addAttributeValue={addAttributeValue}
                renderAttrValues={renderAttrValues}
                title={t('ATTRIBUTE_CREATION')}
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
                    onClick={() => onSubmit({name, valuesToSave})}
                    variant='outlined'
                    disabled={!name.length || !valuesToSave.length}
                    className={classes.button}
                >
                    {t('CREATE')}
                </Button>
            </Grid>
        </>
    );
};

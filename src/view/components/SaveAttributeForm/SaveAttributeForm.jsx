import React, {useCallback, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {ListItemIcon, ListItemSecondaryAction, ListItemText, TextField} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import RemoveIcon from '@material-ui/icons/Remove';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';

export const SaveAttributeForm = ({
                                      name,
                                      onChange,
                                      addAttributeValue,
                                      renderAttrValues,
                                      title
                                  }) => {
    const [value, setValue] = useState('');
    const [isAdd, setIsAdd] = useState(false);
    const {t} = useTranslation('');
    const dispatch = useDispatch();

    const onValueChanged = useCallback((event) => {
        setValue(event.target.value);
    }, []);

    const cancelAdding = useCallback(() => {
        setIsAdd(false);
        setValue('');
    }, []);

    const add = useCallback((value) => {
        if (!value.trim().length) {
            dispatch(setSnackBarStatus({isOpen: true, message: 'Empty value is not allowed', success: false}));
        } else {
            setIsAdd(false);
            setValue('');
            addAttributeValue(value);
        }
    }, [addAttributeValue, dispatch]);

    const renderListItemForAddingValue = useCallback(() => {
        if (!isAdd) {
            return (
                <ListItem style={{padding: 0}}>
                    <ListItemIcon>
                        <IconButton onClick={() => setIsAdd(true)}>
                            <AddIcon/>
                        </IconButton>
                    </ListItemIcon>
                    <ListItemText primary={t('ADD_VALUE')}/>
                </ListItem>
            );
        }

        return (
            <ListItem style={{padding: 0, marginRight: -90}}>
                <ListItemIcon>
                    <IconButton onClick={() => add(value)}>
                        <CheckIcon/>
                    </IconButton>
                </ListItemIcon>
                <TextField
                    label={t('ADD_VALUE')}
                    name='value'
                    variant='standard'
                    type='text'
                    value={value}
                    onChange={onValueChanged}
                    size='small'
                />
                <ListItemSecondaryAction>
                    <IconButton onClick={cancelAdding}>
                        <RemoveIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }, [isAdd, onValueChanged, value, cancelAdding, add, t]);

    return (
        <Grid container style={{padding: 15}}>
            <Grid item xl={12} lg={12}>
                <Typography variant='h6' style={{textAlign: 'center'}}>
                    {title}
                </Typography>
            </Grid>
            <Grid item xl={12} lg={12}>
                <TextField
                    label={t('NAME')}
                    name="name"
                    variant="outlined"
                    type="text"
                    value={name}
                    onChange={onChange}
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xl={12} lg={12} style={{marginTop: 15}}>
                <Typography variant='body1'>
                    {t('ATTRIBUTE_VALUES')}
                </Typography>
                <Divider/>
            </Grid>
            <Grid container item xl={12} lg={12}
                  style={{
                      marginTop: 10,
                      marginBottom: 10,
                      border: '1px solid rgba(0, 0, 0, 0.23)',
                      borderRadius: 5,
                  }}
            >
                <Grid container item xl={12} lg={12}>
                    <List style={{
                        width: '100%',
                        maxHeight: 300,
                        overflow: 'auto',
                    }}>
                        {renderAttrValues()}
                        {renderListItemForAddingValue()}
                    </List>
                </Grid>
            </Grid>
        </Grid>
    );
};

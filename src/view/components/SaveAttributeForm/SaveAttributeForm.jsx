import React, {useCallback, useState} from 'react';
import {
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
    Button,
    Typography,
    Divider,
    Container
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import RemoveIcon from '@material-ui/icons/Remove';
import {useTranslation} from 'react-i18next';
import {closeModal} from '../../../data/store/auxiliary/auxiliaryActions';
import {useDispatch} from 'react-redux';

export const SaveAttributeForm = ({
                                      name,
                                      onChange,
                                      onSubmit,
                                      addAttributeValue,
                                      renderAttrValues,
                                      valuesToSave,
                                      classes,
                                      labels
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
        if (!value.length) {
            console.log('error');
        } else {
            setIsAdd(false);
            setValue('');
            addAttributeValue(value);
        }
    }, [addAttributeValue]);

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
        <Container maxWidth='sm' className={classes.root}>
            <Grid item xl={12} lg={12}>
                <Typography variant='h6' className={classes.title}>
                    {labels.title}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} xl={12} lg={12}>
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
            <Grid item xl={12} lg={12} xs={12} sm={12} className={classes.attributeContainer}>
                <Typography variant='body1'>
                    {t('ATTRIBUTE_VALUES')}
                </Typography>
                <Divider/>
            </Grid>
            <Grid container item xl={12} lg={12} xs={12} sm={12}
                  className={classes.attributeValueContainer}>
                <Grid container item xl={12} lg={12} xs={12} sm={12} >
                    <List
                        className={classes.attributeItem}
                        >
                        {renderAttrValues()}
                        {renderListItemForAddingValue()}
                    </List>
                </Grid>
            </Grid>
            <Grid item xl={12} lg={12} className={classes.buttonContainer}>
                <Button
                    className={classes.button}
                    variant='outlined'
                    onClick={() => dispatch(closeModal())}
                >
                    {t('CANCEL')}
                </Button>
                <Button
                    className={classes.button}
                    onClick={onSubmit}
                    variant='outlined'
                    disabled={(!valuesToSave.length || !name.length)}
                >
                    {labels.button}
                </Button>
            </Grid>
        </Container>
    );
};

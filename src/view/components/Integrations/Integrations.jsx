import React, {useCallback, useEffect, useState} from 'react';
import {
    closeDialog,
    closeModal, renderDialog,
    renderModal,
    setIsLoading,
    setSnackBarStatus
} from '../../../data/store/auxiliary/auxiliaryActions';
import {useDispatch} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Button} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {CreateIntegration} from '../CreateIntegration/CreateIntegration';
import IntegrationService from '../../../services/IntegrationService';
import {
    deleteIgIntegration,
    getCurrentUser,
} from '../../../data/store/user/userActions';
import InstagramIcon from '@material-ui/icons/Instagram';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import {useTranslation} from 'react-i18next';

export const Integrations = ({
                                 classes,
                                 organization,
                                 triggerOrganizationDetailsUpdate
                             }) => {
    const dispatch = useDispatch();
    const [integrations, setIntegrations] = useState([]);
    const {t} = useTranslation('');

    useEffect(() => {
        if (!isEmpty(organization)) {
            setIntegrations(organization.integrations);
        }
    }, [organization]);

    const cancelIntegration = useCallback(async () => {
        try {
            await IntegrationService.cancel();
            dispatch(closeModal());
        } catch (e) {
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        }
    }, [dispatch]);

    const openAddIntegrationModal = useCallback(() => {
        dispatch(renderModal({
            isOpen: true,
            children: (
                <CreateIntegration
                    classes={classes}
                    triggerOrganizationDetailsUpdate={triggerOrganizationDetailsUpdate}
                />
            ),
            onCloseHandler: cancelIntegration,
            allowBackDropClick: false
        }))
    }, [dispatch, classes, triggerOrganizationDetailsUpdate, cancelIntegration]);

    const openDeleteIntegrationDialog = useCallback((integration) => {
        const deleteIntegrationById = async () => {
            try {
                dispatch(setIsLoading(true));
                const response = await IntegrationService.delete(integration.integrationId);
                if (response.success) {
                    dispatch(getCurrentUser());
                    dispatch(deleteIgIntegration());
                    triggerOrganizationDetailsUpdate();
                } else {
                    dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
                }
            } catch (e) {
                dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
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
            onActionHandler: () => deleteIntegrationById(),
            children: t('DELETE_INTEGRATION')
        }));
    }, [dispatch, t, triggerOrganizationDetailsUpdate]);

    const renderIntegrations = useCallback(() => {
        if (!integrations.length) {
            return null;
        }

        return integrations.map((integration) => {
            const {username, type, integrationId} = integration;
            return (
                <ListItem key={integrationId}>
                    <ListItemAvatar>
                        <InstagramIcon/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={username}
                        secondary={type}
                    />
                    <ListItemSecondaryAction>
                        {/*<IconButton onClick={() => openEditIntegrationModal(integration)}>*/}
                        {/*    <EditIcon/>*/}
                        {/*</IconButton>*/}
                        <IconButton onClick={() => openDeleteIntegrationDialog(integration)}>
                            <RemoveIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        });
    }, [integrations, openDeleteIntegrationDialog]);

    return (
        <Grid container item xs={12} sm={12}>
            <Grid className={classes.root}>
                <Grid item xs={12} className={classes.organizationItem} style={{textAlign: 'center'}}>
                    <Typography variant='h6'>
                        Integrations
                    </Typography>
                </Grid>
                <Grid item sm={12} xs={12} className={classes.organizationItem}>
                    <List className={classes.integrationsList}>
                        {renderIntegrations()}
                        <ListItem style={{justifyContent: 'center'}}>
                            <Button
                                variant="outlined" color="primary"
                                onClick={() => openAddIntegrationModal()}>
                                <AddIcon/>
                                Add integration
                            </Button>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Grid>
    );
};
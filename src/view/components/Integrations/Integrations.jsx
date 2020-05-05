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
import {deleteIntegration, getCurrentUser} from '../../../data/store/user/userActions';
import InstagramIcon from '@material-ui/icons/Instagram';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from "@material-ui/icons/Edit";
import RemoveIcon from '@material-ui/icons/Remove';
import {EditIntegration} from '../EditIntegration/EditIntegration';
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

    const createIntegration = useCallback(async (creds) => {
        try {
            dispatch(setIsLoading(true));
            const response = await IntegrationService.create(creds);
            if (response.success) {
                dispatch(setIsLoading(false));
                dispatch(closeModal());
                dispatch(getCurrentUser());
                triggerOrganizationDetailsUpdate();
            } else {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        }
    }, [dispatch, triggerOrganizationDetailsUpdate]);

    const openAddIntegrationModal = useCallback(() => {
        dispatch(renderModal({
            isOpen: true,
            classes: {},
            children: (
                <CreateIntegration
                    onSubmit={createIntegration}
                />
            ),
            onCloseHandler: () => dispatch(closeModal()),
        }))
    }, [dispatch, createIntegration]);

    const openEditIntegrationModal = useCallback((integration) => {
        const editIntegration = async (creds) => {
            try {
                dispatch(setIsLoading(true));
                const response = await IntegrationService.update({
                    integrationId: integration.integrationId,
                    ...creds,
                });
                if (response.success) {
                    dispatch(setIsLoading(false));
                    dispatch(closeModal());
                    dispatch(getCurrentUser());
                    triggerOrganizationDetailsUpdate();
                } else {
                    dispatch(setIsLoading(false));
                    dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
                }
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
            }
        };
        dispatch(renderModal({
            isOpen: true,
            classes: {},
            children: (
                <EditIntegration
                    integration={integration}
                    onSubmit={editIntegration}
                />
            ),
            onCloseHandler: () => dispatch(closeModal()),
        }))
    }, [dispatch, triggerOrganizationDetailsUpdate]);

    const openDeleteIntegrationDialog = useCallback((integration) => {
        const deleteIntegrationById = async () => {
            try {
                dispatch(setIsLoading(true));
                const response = await IntegrationService.delete(integration.integrationId);
                if (response.success) {
                    dispatch(deleteIntegration(organization.organizationId));
                    dispatch(getCurrentUser());
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
            children: 'Delete integration?'
        }));
    }, [dispatch, t, triggerOrganizationDetailsUpdate, organization.organizationId]);

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
                        <IconButton onClick={() => openEditIntegrationModal(integration)}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={() => openDeleteIntegrationDialog(integration)}>
                            <RemoveIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        });
    }, [integrations, openEditIntegrationModal, openDeleteIntegrationDialog]);

    return (
        <Grid container item xs={12}>
            <Grid className={classes.root}>
                <Grid item xs={12} className={classes.organizationItem}>
                    <Typography variant='h6' align='center'>
                        Integrations
                    </Typography>
                </Grid>
                <Grid item sm={6} xs={12} className={classes.organizationItem}>
                    <List>
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
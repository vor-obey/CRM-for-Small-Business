import React, {useCallback} from 'react';
import {Button,Grid,Typography, Link, makeStyles} from '@material-ui/core';
import {chatWrapperStyles} from "./ChatWrapper.style";
import {Chat} from './Chat/Chat';
import {useDispatch, useSelector} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import CircularProgress from '@material-ui/core/CircularProgress';
import {setIsAutoConnectToChat, setConnectionToChatStorage} from '../../../data/store/chat/chatActions';
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(chatWrapperStyles);

export const ChatWrapper = ({history}) => {
    const {t} = useTranslation('');
    const classes = useStyles();
    const {chatReducer: { isIgIntegrated, isAutoConnectToChat }, userReducer: { currentUser }} = useSelector(state => state);
    const {isLoading} = useSelector(state => state.auxiliaryReducer);
    const dispatch = useDispatch();

    const enterChat = useCallback(async () => {
        dispatch(setConnectionToChatStorage(true));
        dispatch(setIsAutoConnectToChat(true));
    }, [dispatch]);

    const navigateToOrganizationSettings = useCallback((organizationId) => () => {
        history.push(`/organizations/${organizationId}`);
    }, [history]);

    const render = useCallback(() => {
        if (!isIgIntegrated && !isEmpty(currentUser)) {
            const role = currentUser.role.name;
            const organizationId = currentUser.organization.organizationId;

            if (role === 'Owner') {
                return (
                    <Grid container item xs={12} sm={12} className={classes.chatEnterContainer}>
                        <Typography variant='h6' align='center'>
                            {t('NO_ACCOUNT')} <Link onClick={navigateToOrganizationSettings(organizationId)}>{t('ORG_SETTINGS')}</Link>
                        </Typography>
                    </Grid>
                );
            }

            return (
                <Grid container item xs={12} sm={12} className={classes.chatEnterContainer}>
                    <Typography variant='h6' align='center'>
                        {t('OWNER_HAVE_NOT_INTEGRATED')}
                    </Typography>
                </Grid>
            );
        }

        if (isIgIntegrated && !isAutoConnectToChat) {
            return (
                <Grid container item xs={12} sm={12} className={classes.chatEnterContainer}>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={enterChat}
                    >
                        {t('ENTER')}
                    </Button>
                </Grid>
            );
        }

        return <Chat
            classes={classes}
        />
    }, [t, classes, isAutoConnectToChat, isIgIntegrated, enterChat, currentUser, navigateToOrganizationSettings]);

    return (
        <Grid className={classes.container}>
            {isLoading ? (
                <Grid container item xs={12} sm={12}>
                    <CircularProgress/>
                </Grid>
            ) : (
                render()
            )}
        </Grid>
    );
};

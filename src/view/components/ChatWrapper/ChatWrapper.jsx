import React, {useCallback} from 'react';
import {Button, Container, Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {chatWrapperStyles} from "./ChatWrapper.style";
import {Chat} from './Chat/Chat';
import {useDispatch, useSelector} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {setIsAutoConnectToChat, setConnectionToChatStorage} from '../../../data/store/user/userActions';

const useStyles = makeStyles(chatWrapperStyles);

export const ChatWrapper = () => {
    const classes = useStyles();
    const {isIgIntegrated, currentUser, isAutoConnectToChat} = useSelector(state => state.userReducer);
    const {isLoading} = useSelector(state => state.auxiliaryReducer);
    const dispatch = useDispatch();

    const enterChat = useCallback(async () => {
        dispatch(setConnectionToChatStorage(true));
        dispatch(setIsAutoConnectToChat(true));
    }, [dispatch]);

    const render = useCallback(() => {
        if (!isIgIntegrated && !isEmpty(currentUser)) {
            const role = currentUser.role.name;
            const organizationId = currentUser.organization.organizationId;

            if (role === 'Owner') {
                return (
                    <Grid container item xs={12} sm={12} className={classes.chatEnterContainer}>
                        <Typography variant='h6'>
                            You haven't integrated your Instagram account yet. It can be done in <a
                            href={`/organization/${organizationId}/edit`}>organization settings</a>
                        </Typography>
                    </Grid>
                );
            }

            return (
                <Grid container item xs={12} sm={12} className={classes.chatEnterContainer}>
                    <Typography variant='h6'>
                        Organization owner haven't integrated Instagram account yet.
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
                        Enter
                    </Button>
                </Grid>
            );
        }

        return <Chat
            classes={classes}
        />
    }, [classes, isAutoConnectToChat, isIgIntegrated, enterChat, currentUser]);

    return (
        <Container className={classes.container} style={{height: '100vh'}}>
            {isLoading ? (
                <Grid container item xs={12} sm={12}>
                    <CircularProgress/>
                </Grid>
            ) : (
                render()
            )}
        </Container>
    );
};

import React, {useCallback, useEffect, useState} from 'react';
import List from '@material-ui/core/List';
import {ChatThreads} from '../ChatThreads/ChatThreads';
import {ChatDialog} from '../ChatDialog/ChatDialog';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import {Container, useMediaQuery} from '@material-ui/core';
import {InstagramService} from '../../../../services';
import {useDispatch, useSelector} from 'react-redux';
import {initIgChatConnection, initSocketConnection} from '../../../../data/store/user/userActions';

export const Chat = ({
                         classes,
                         setConnection
                     }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedThreadId, setSelectedThreadId] = useState('');
    const [threads, setThreads] = useState([]);
    const profile = {};
    const minWidth600 = useMediaQuery('(min-width:600px)');
    const [igExists, setIgExists] = useState(false);
    const {socket, currentUser} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const validateAcc = async () => {
            try {
                const response = await InstagramService.validate();
                if (response.success) {
                    setIgExists(true);
                } else {
                    setIgExists(false);
                    setConnection(false);
                }
            } catch (e) {
                setIgExists(false);
                setConnection(false);
            }
        };
        if (!igExists) {
            validateAcc();
        }
    }, [igExists, setConnection]);

    useEffect(() => {
        if (igExists && !socket) {
            const {organizationId} = currentUser.organization;
            dispatch(initSocketConnection(organizationId))
        }
    }, [igExists, dispatch, currentUser.organization, socket]);

    useEffect(() => {
        if (socket !== null) {
            dispatch(initIgChatConnection(socket));
        }
    }, [socket, dispatch]);

    const fetchThreads = useCallback(async () => {
        try {
            const response = await InstagramService.getThreads();
            setThreads(response);
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        if (igExists) {
            fetchThreads();
        }
    }, [igExists, fetchThreads]);

    const openThread = useCallback((threadId) => {
        setSelectedThreadId(threadId);
        setIsDialogOpen(true);
    }, []);

    const goBack = useCallback(() => {
        setSelectedThreadId('');
        setIsDialogOpen(!isDialogOpen);
    }, [isDialogOpen]);

    const renderThreads = useCallback(() => {
        if (!threads.length) {
            return null;
        }

        return threads.map((thread) => {
            const {users, last_permanent_item: {text}, thread_title} = thread;
            const {profile_pic_url} = users[0];

            if (users.length > 1) {
                return (
                    <React.Fragment key={thread.thread_id}>
                        <ListItem
                            alignItems='flex-start'
                            className={classes.cursor}
                            onClick={() => openThread(thread.thread_id)}
                        >
                            <ListItemAvatar>
                                <PeopleAltIcon/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={thread_title}
                                secondary={text}
                            />
                        </ListItem>
                        <Divider/>
                    </React.Fragment>
                );
            }

            return (
                <React.Fragment key={thread.thread_id}>
                    <ListItem
                        alignItems='flex-start'
                        className={classes.cursor}
                        onClick={() => openThread(thread.thread_id)}
                    >
                        <ListItemAvatar>
                            <Avatar alt={thread_title} src={profile_pic_url}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={thread_title}
                            secondary={text}
                        />
                    </ListItem>
                    <Divider/>
                </React.Fragment>
            )
        });
    }, [threads, openThread, classes]);

    if (!minWidth600) {
        return (
            <Container className={classes.mobileContainer}>
                <List className={classes.mobileList}>
                    {isDialogOpen ?
                        <ChatDialog
                            profile={profile}
                            thread={threads.find(item => item.thread_id === selectedThreadId)}
                            goBack={goBack}
                            classes={classes}
                        />
                        :
                        <ChatThreads
                            classes={classes}
                            renderThreads={renderThreads}
                        />
                    }
                </List>
            </Container>
        );
    }

    return (
        <>
            <List className={classes.listThreads}>
                <ChatThreads
                    classes={classes}
                    renderThreads={renderThreads}
                />
            </List>
            <List className={classes.listDialog}>
                {isDialogOpen ?
                    <ChatDialog
                        minWidth={minWidth600}
                        profile={profile}
                        thread={threads.find(item => item.thread_id === selectedThreadId)}
                        classes={classes}
                    />
                    :
                    <Typography variant='h6' className={classes.text}>Please select a chat to start
                        messaging</Typography>
                }
            </List>
        </>
    );
};
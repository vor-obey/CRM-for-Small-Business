import React, {useCallback, useEffect, useState} from 'react';
import {Container, Divider, ListItem} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {ChatDialog} from './ChatDialog/ChatDialog';
import {ChatThreads} from './ChatThreads/ChatThreads';
import socketIOClient from 'socket.io-client';
import {useSelector} from 'react-redux';
import isEmpty from 'lodash/isEmpty';

export const Chat = () => {
    const currentUser = useSelector(state => state.userReducer.currentUser);
    const socket = socketIOClient('http://localhost:8080/', currentUser ? {query: `roomId=${currentUser.organization.organizationId}`} : null);
    const [profile, setProfile] = useState({});
    const [threads, setThreads] = useState([]);
    console.log('[THREADS]', threads);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedThread, setSelectedThread] = useState({});
    const [testMessage, setTestMessage] = useState('');
    console.log('[MESSAGE]', testMessage);

    // initialize instagram client
    useEffect(() => {
        if (currentUser && socket.query) {
            console.log('initChat');
            socket.emit('initChat');
        }
        // eslint-disable-next-line
    }, [currentUser]);

    useEffect(() => {
        if (isEmpty(profile)) {
            socket.on('getIgProfile', (data) => {
                setProfile(data);
            });
        }

        socket.on('error', (data) => {
            console.log('ERROR', data);
        });

        socket.on('getThreads', (threads) => {
            console.log('[SOCKET ON GETHREADS]');
            setThreads(threads);
        });

        if (profile.username) {
            socket.on('message', (data) => {
                console.log('[SOCKET ON MESSAGE]');
                setTestMessage(data);
                console.log('[profile username]', profile.username);
                socket.emit('getThreads', profile.username)
            });
        }
    }, [socket, profile]);

    const openDialog = useCallback((threadId) => {
        setSelectedThread(threads.find((thread) => thread.thread_id === threadId));
        setIsOpen(true);
    }, [threads]);

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
                        <ListItem alignItems='flex-start' style={{cursor: 'pointer'}}
                                  onClick={() => openDialog(thread.thread_id)}
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
                    <ListItem alignItems='flex-start' style={{cursor: 'pointer'}}
                              onClick={() => openDialog(thread.thread_id)}
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
    }, [threads, openDialog]);
    //
    const refreshThreads = useCallback(() => {
        socket.emit('getThreads', profile.username);
    }, [socket, profile]);

    const goBack = useCallback(() => {
        setIsOpen(false);
        setSelectedThread({});
    }, []);

    return (
        <Container maxWidth='md'
                   style={{marginTop: 30, border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: 5, padding: 5}}>
            <List style={{width: '100%'}}>
                {isOpen ?
                    <ChatDialog
                        loggedInUser={{id: profile.pk, profilePicUrl: profile.profile_pic_url}}
                        thread={selectedThread}
                        goBack={goBack}
                    />
                    :
                    <ChatThreads
                        refreshThreads={refreshThreads}
                        renderThreads={renderThreads}
                    />
                }
            </List>
        </Container>
    );
};
import React, {useCallback, useState} from 'react';
import {CircularProgress, Container} from '@material-ui/core';
import {useSelector} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {useTranslation} from 'react-i18next';
import List from '@material-ui/core/List';
import {ChatThreads} from './ChatThreads/ChatThreads';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Avatar from '@material-ui/core/Avatar';
import {ChatDialog} from './ChatDialog/ChatDialog';

export const Chat = ({style}) => {
    const profile = useSelector(state => state.userReducer.igProfile);
    const threads = useSelector(state => state.userReducer.threads);
    const isConnected = useSelector(state => state.userReducer.isConnected);
    const isIntegrated = useSelector(state => state.userReducer.isIntegrated);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedThreadId, setSelectedThreadId] = useState('');
    const {t} = useTranslation('');

    const openThread = useCallback((threadId) => {
        setSelectedThreadId(threadId);
        setIsDialogOpen(!isDialogOpen);
    }, [isDialogOpen]);

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
                            style={{cursor: 'pointer'}}
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
                        style={{cursor: 'pointer'}}
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
    }, [threads, openThread]);

    if (!isConnected) {
        return (
            <CircularProgress/>
        );
    }

    if (isConnected && !isIntegrated) {
        return (
            <Typography
                variant='h6'
                color='textSecondary'
                style={{
                    textAlign: 'center',
                    padding: 5
                }}
            >
                {t('NO_INSTAGRAM_CREDENTIALS')}
            </Typography>
        );
    }

    return (
        <Container style={style}>
            <List style={{width: '100%', padding: 0}}>
                {isDialogOpen ?
                    <ChatDialog
                        profile={profile}
                        thread={threads.find(item => item.thread_id === selectedThreadId)}
                        goBack={goBack}
                    />
                    :
                    <ChatThreads
                        renderThreads={renderThreads}
                    />
                }
            </List>
        </Container>
    );
};
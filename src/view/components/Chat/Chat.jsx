import React, {useCallback, useEffect, useState} from 'react';
import {Container, useMediaQuery} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import {ChatThreads} from './ChatThreads/ChatThreads';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Avatar from '@material-ui/core/Avatar';
import {ChatDialog} from './ChatDialog/ChatDialog';
import {makeStyles} from "@material-ui/core/styles";
import {ChatStyles} from "./Chat.style";
import {InstagramService, StorageService} from '../../../services';
import {ChatEnter} from './ChatEnter/ChatEnter';

const useStyles = makeStyles(ChatStyles);

export const Chat = ({mobile}) => {
    const profile = {};
    const [threads, setThreads] = useState([]);
    const [isConnected, setIsConnected] = useState(JSON.parse(StorageService.getChatConnection()));
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedThreadId, setSelectedThreadId] = useState('');
    const minWidth600 = useMediaQuery('(min-width:600px)');
    const classes = useStyles();

    useEffect(() => {
        if (isConnected) {
            const fetchThreads = async () => {
                const response = await InstagramService.getThreads();
                setThreads(response);
            };
            fetchThreads();
        }
    }, [isConnected]);

    const setConnection = useCallback(() => {
        setIsConnected(true);
    }, []);

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

    if (!minWidth600 || mobile === true) {
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
        <Container className={classes.container}>
            {!isConnected ? (
                <ChatEnter
                    setConnection={setConnection}
                />
            ) : (
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
            )}
        </Container>
    );
};

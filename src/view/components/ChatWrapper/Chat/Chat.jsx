import React, {useCallback, useState} from 'react';
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
import {useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {useTranslation} from "react-i18next";

export const Chat = ({
                         classes,
                     }) => {
    const {t} = useTranslation('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedThread, setSelectedThread] = useState({});
    const minWidth600 = useMediaQuery('(min-width:600px)');
    const {threads, igProfile} = useSelector(state => state.userReducer);

    const openThread = useCallback(async (thread) => {
        setSelectedThread(thread);
        setIsDialogOpen(true);
    }, []);

    const goBack = useCallback(() => {
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
                            onClick={() => openThread(thread)}
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
                        onClick={() => openThread(thread)}
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
                            profile={igProfile}
                            thread={selectedThread}
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
        <Grid item xs={12} sm={12} style={{
            maxHeight: '80%',
            display: 'flex',
            margin: '0 10px',
        }}>
            <List className={classes.listThreads} style={{padding: 0}}>
                <ChatThreads
                    classes={classes}
                    renderThreads={renderThreads}
                />
            </List>
            {isDialogOpen ?
                <ChatDialog
                    minWidth={minWidth600}
                    profile={igProfile}
                    thread={selectedThread}
                    classes={classes}
                />
                :
                <Typography
                    variant='h6'
                    className={classes.text}
                    style={{
                        border: '1px solid #B7BFC4',
                        borderLeft: 'none',
                        width: '50%',
                        height: 'auto',
                        padding: '0 10px'
                    }}
                >
                    {t('SELECT_CHAT')}
                </Typography>
            }
        </Grid>
    );
};
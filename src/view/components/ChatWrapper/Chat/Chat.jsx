import React, {useCallback, useState} from 'react';
import {ChatThreads} from '../ChatThreads/ChatThreads';
import {ChatDialog} from '../ChatDialog/ChatDialog';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {
    Grid,
    Avatar,
    Divider,
    Container,
    ListItemText,
    ListItemAvatar,
    Drawer,
    ListItem,
    Typography,
    IconButton,
    List,
    useMediaQuery
} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {useTranslation} from "react-i18next";
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import clsx from "clsx";

export const Chat = ({
                         classes,
                     }) => {
    const {t} = useTranslation('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedThread, setSelectedThread] = useState({});
    const minWidth600 = useMediaQuery('(min-width:600px)');
    const {threads, igProfile} = useSelector(state => state.userReducer);
    const [open, setOpen] = useState(false);

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
                            classes={{
                                secondary: classes.threadText
                            }}
                        >
                            <ListItemAvatar>
                                <PeopleAltIcon/>
                            </ListItemAvatar>
                            <ListItemText
                                classes={{
                                    secondary: classes.threadText
                                }}
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
                            classes={{
                                secondary: classes.threadText
                            }}
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

    const handleDrawer = () => {
        setOpen(prevState => !prevState);
    };

    const childrenContent = () => {
        return ("11111111")
    };
    return (
        <Grid item xs={12} sm={12} style={{
            display: 'flex',
            alignItems: 'stretch'
        }}>
            <Grid className={clsx(classes.listThreads, {
                [classes.listThreadsMin]: open
            })}
                  style={{padding: 0}}>
                <ChatThreads
                    classes={classes}
                    renderThreads={renderThreads}
                />
            </Grid>
            {isDialogOpen ?
                <ChatDialog
                    minWidth={minWidth600}
                    profile={igProfile}
                    thread={selectedThread}
                    classes={classes}
                />
                :
                <Grid className={classes.noMessage}>
                    <Typography
                        variant='h6'
                        className={classes.text}
                    >
                        {t('SELECT_CHAT')}
                    </Typography>
                </Grid>
            }
            <Grid className={classes.additionals}>

                <Drawer
                    variant="permanent"
                    anchor="right"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <Grid className={classes.additionalsBlocks}>
                        <Grid className={classes.additionalsNavigation}>
                            <IconButton
                                className={classes.additionalButton}
                                aria-label="open drawer"
                                onClick={handleDrawer}>
                                <DescriptionOutlinedIcon style={{fontSize: 30}}/>
                            </IconButton>
                            <IconButton
                                className={classes.additionalButton}
                                aria-label="open drawer"
                                onClick={handleDrawer}>
                                <NoteAddOutlinedIcon style={{fontSize: 30}}/>
                            </IconButton>
                            <IconButton
                                className={classes.additionalButton}
                                aria-label="open drawer"
                                onClick={handleDrawer}>
                                <InsertCommentOutlinedIcon style={{fontSize: 30}}/>
                            </IconButton>
                        </Grid>
                        <Grid className={clsx(classes.additionalChild, {
                            [classes.additionalChildHidden]: !open,
                        })}>
                            {childrenContent()}
                        </Grid>
                    </Grid>
                </Drawer>
            </Grid>
        </Grid>
    );
};
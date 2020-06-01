import React, {useCallback, useState} from 'react';
import {ChatThreads} from '../ChatThreads/ChatThreads';
import {ChatDialog} from '../ChatDialog/ChatDialog';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {
    Avatar,
    Container,
    Divider,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    useMediaQuery
} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {useTranslation} from "react-i18next";
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import clsx from "clsx";
import isEmpty from 'lodash/isEmpty';
import CloseIcon from '@material-ui/icons/Close';
import {MessageTemplatePage} from "../../../pages/MessageTemplatePage/MessageTemplatePage";

export const Chat = ({
                         classes,
                     }) => {
    const {t} = useTranslation('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedThread, setSelectedThread] = useState({});
    const minWidth600 = useMediaQuery('(min-width:600px)');
    const {threads, igProfile} = useSelector(state => state.userReducer);
    const [drawerMobileOpen, setDrawerMobileOpen] = useState(false)
    const [templateContent, setTemplateContent] = useState();
    const [drawerIcons, setDrawerIcons] = useState([
        {
            id: 1,
            icon: <NoteAddOutlinedIcon style={{fontSize: 30}}/>,
            isOpen: false,
        },
        {
            id: 2,
            icon: <DescriptionOutlinedIcon style={{fontSize: 30}}/>,
            isOpen: false,
        },
        {
            id: 3,
            icon: <InsertCommentOutlinedIcon style={{fontSize: 30}}/>,
            isOpen: false,
        },
    ]);

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
            const {users, last_permanent_item: {text}, thread_title, inviter} = thread;

            if (!users.length && inviter.pk === igProfile.pk) {
                return (
                    <React.Fragment key={thread.thread_id}>
                        <ListItem
                            alignItems='flex-start'
                            className={classes.cursor}
                            onClick={() => openThread(thread)}
                        >
                            <ListItemAvatar>
                                <Avatar alt={thread_title} src={igProfile.profile_pic_url}/>
                            </ListItemAvatar>
                            <ListItemText
                                classes={{
                                    secondary: classes.threadText
                                }}
                                primary={inviter.username}
                                secondary={text}
                            />
                        </ListItem>
                        <Divider/>
                    </React.Fragment>
                );
            }

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
    }, [threads, openThread, classes, igProfile]);

    const handleDrawerIcon = useCallback((id, value) => () => {
        setDrawerIcons(prevState => {
            return [...prevState].map((item) => {
                if (value) {
                    if (item.id === id) {
                        return {
                            ...item,
                            isOpen: true
                        }
                    } else {
                        return {
                            ...item,
                            isOpen: false
                        }
                    }
                }
                return {
                    ...item,
                    isOpen: false
                }
            });
        });
    }, []);

    const renderDrawerIcons = useCallback(() => {
        if (isEmpty(drawerIcons)) {
            return null;
        }

        return drawerIcons.map((item) => {
            const {isOpen, id, icon} = item;
            return (
                <IconButton
                    key={id}
                    className={classes.additionalButton}
                    aria-label="open drawer"
                    onClick={!isOpen ? handleDrawerIcon(id, true) : handleDrawerIcon(id, false)}>
                    {!isOpen ? icon : <ArrowForwardIosIcon style={{fontSize: 30}}/>}
                </IconButton>
            );
        });
    }, [drawerIcons, classes.additionalButton, handleDrawerIcon]);

    const isDrawerOpen = useCallback(() => {
        return !!drawerIcons.find(item => item.isOpen);
    }, [drawerIcons]);

    const isDrawerMobileOpen = useCallback((value) => {
        setDrawerMobileOpen(prevState => !prevState)
    }, []);

    const onSubmit = useCallback((template) => {
        setTemplateContent(template)
    }, []);

    const renderChildrenContent = useCallback(() => {
        const drawerIcon = drawerIcons.find(item => item.isOpen);
        if (drawerIcon && drawerIcon.isOpen) {
            switch (drawerIcon.id) {
                case 1: {
                    return (
                        <div>1</div>
                    );
                }
                case 2: {
                    return (
                        <div>2</div>
                    );
                }
                case 3: {
                    return (
                        <div style={{overflowY: 'scroll', height: '93%'}}>
                            <MessageTemplatePage onSubmit={onSubmit} chat={true}/>
                        </div>
                    );
                }
                default: {
                    return <div>smth</div>
                }
            }
        }

        return null;
    }, [drawerIcons]);

    if (!minWidth600) {
        return (
            <Container className={classes.mobileContainer}>
                <List className={classes.mobileList}>
                    {isDialogOpen ?
                        <>
                            <ChatDialog
                                profile={igProfile}
                                thread={selectedThread}
                                goBack={goBack}
                                onSubmit={onSubmit}
                                classes={classes}
                                isDrawerOpened={isDrawerOpen}
                                isDrawerMobileOpen={isDrawerMobileOpen}
                                templateContent={templateContent}
                            />
                            <Grid className={classes.additionals}>
                                <Drawer
                                    variant="permanent"
                                    anchor="right"
                                    className={clsx(classes.drawer, {
                                        [classes.drawerOpen]: drawerMobileOpen,
                                        [classes.drawerClose]: !drawerMobileOpen,
                                    })}
                                    classes={{
                                        paper: clsx({
                                            [classes.drawerOpen]: drawerMobileOpen,
                                            [classes.drawerClose]: !drawerMobileOpen,
                                        }),
                                    }}
                                >
                                    <Grid className={classes.additionalsBlocks}>
                                        <Grid className={classes.additionalsNavigation}>
                                            {drawerMobileOpen ? <CloseIcon
                                                className={classes.cursor}
                                                style={{
                                                    top: '12px',
                                                    position: 'absolute'
                                                }}
                                                onClick={isDrawerMobileOpen}
                                            /> : null}
                                            {renderDrawerIcons()}
                                        </Grid>
                                        <Grid className={clsx(classes.additionalChild, {
                                            [classes.additionalChildHidden]: !drawerMobileOpen,
                                        })}>
                                            {renderChildrenContent()}
                                        </Grid>
                                    </Grid>
                                </Drawer>
                            </Grid>
                        </>
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
            display: 'flex',
            alignItems: 'stretch'
        }}>
            <Grid className={clsx(classes.listThreads, {
                [classes.listThreadsMin]: isDrawerOpen()
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
                    isDrawerOpened={isDrawerOpen}
                    templateContent={templateContent}
                />
                :
                <Grid className={clsx(classes.noMessage, {
                    [classes.noMessageMin]: isDrawerOpen(),
                })}
                >
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
                        [classes.drawerOpen]: isDrawerOpen(),
                        [classes.drawerClose]: !isDrawerOpen(),
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: isDrawerOpen(),
                            [classes.drawerClose]: !isDrawerOpen(),
                        }),
                    }}
                >
                    <Grid className={classes.additionalsBlocks}>
                        <Grid className={classes.additionalsNavigation}>
                            {renderDrawerIcons()}
                        </Grid>
                        <Grid className={clsx(classes.additionalChild, {
                            [classes.additionalChildHidden]: !isDrawerOpen(),
                        })}>
                            {renderChildrenContent()}
                        </Grid>
                    </Grid>
                </Drawer>
            </Grid>
        </Grid>
    );
};

import React, {useCallback, useEffect, useState} from 'react';
import {ChatThreads} from '../ChatThreads/ChatThreads';
import {ChatDialog} from '../ChatDialog/ChatDialog';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {
    Avatar,
    Divider,
    Drawer,
    Grid,
    IconButton,
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
import {MessageTemplatePage} from "../../../pages/MessageTemplatePage/MessageTemplatePage";
import {CreateOrderPage} from "../../../pages/CreateOrderPage/CreateOrderPage";

export const Chat = ({
                         classes,
                     }) => {
    const {t} = useTranslation('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedThread, setSelectedThread] = useState({});
    const minWidth769 = useMediaQuery('(min-width:769px)');
    const {threads, igProfile} = useSelector(state => state.userReducer);
    const [drawerMobileOpen, setDrawerMobileOpen] = useState(false);
    const [templateContent, setTemplateContent] = useState('');
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

    const toggleDrawerMobile = useCallback(() => {
        setDrawerMobileOpen(prevState => !prevState);
    }, []);

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
        if (!value && drawerMobileOpen) {
            toggleDrawerMobile();
        }
    }, [drawerMobileOpen, toggleDrawerMobile]);

    const isDrawerOpen = useCallback(() => {
        return !!drawerIcons.find(item => item.isOpen);
    }, [drawerIcons]);

    useEffect(() => {
        if (drawerMobileOpen && !isDrawerOpen()) {
            handleDrawerIcon(1, true)();
        }
    }, [drawerMobileOpen, handleDrawerIcon, isDrawerOpen]);

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

    const onSubmit = useCallback((template) => {
        if (isDialogOpen) {
            setTemplateContent(template);
        }
    }, [isDialogOpen]);

    const renderChildrenContent = useCallback(() => {
        const drawerIcon = drawerIcons.find(item => item.isOpen);
        if (drawerIcon && drawerIcon.isOpen) {
            switch (drawerIcon.id) {
                case 1: {
                    return (
                        <CreateOrderPage
                            chat={true}
                        />
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
                            <MessageTemplatePage
                                handleDrawerIcon={handleDrawerIcon(3, false)}
                                onSubmit={onSubmit}
                                chat={true}
                                isDialogOpen={isDialogOpen}
                            />
                        </div>
                    );
                }
                default: {
                    return <div>smth</div>
                }
            }
        }

        return null;
    }, [drawerIcons, handleDrawerIcon, isDialogOpen, onSubmit]);

    return (
        <Grid item xs={12} sm={12} className={classes.containerChat}>
            {minWidth769 ? <Grid className={clsx(classes.listThreads, {
                [classes.listThreadsMin]: isDrawerOpen(),
            })}>
                <ChatThreads
                    classes={classes}
                    renderThreads={renderThreads}
                />
            </Grid> : null}
            {isDialogOpen ?
                <ChatDialog
                    goBack={goBack}
                    minWidth={minWidth769}
                    profile={igProfile}
                    thread={selectedThread}
                    toggleDrawerMobile={toggleDrawerMobile}
                    classes={classes}
                    isDrawerOpened={isDrawerOpen}
                    templateContent={templateContent}
                />
                : (minWidth769 ? (
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
                ) : (
                    <Grid className={clsx(classes.listThreads, {
                        [classes.ListThreadsMobile]: !isDrawerOpen(),
                    })}>
                        <ChatThreads
                            classes={classes}
                            renderThreads={renderThreads}
                        />
                    </Grid>
                ))
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
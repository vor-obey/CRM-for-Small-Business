import React, {useCallback, useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {TextField} from '@material-ui/core';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import IconButton from '@material-ui/core/IconButton';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessage} from '../../../../data/store/user/userActions';
import moment from 'moment';
import List from '@material-ui/core/List';
import {setSnackBarStatus} from '../../../../data/store/auxiliary/auxiliaryActions';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from '@material-ui/icons/MoreVert';

export const ChatDialog = ({profile, thread, goBack, classes, minWidth, isDrawerOpened, isDrawerMobileOpen}) => {
    const {users, thread_title, items, inviter} = thread;
    const profile_pic_url = users[0] ? users[0].profile_pic_url : inviter.profile_pic_url;
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const {socket} = useSelector(state => state.userReducer);

    // const fetchThreadFeed = useCallback(async ({thread_id, prev_cursor}) => {
    //     try {
    //         const response = await InstagramService.getThreadById(thread_id, prev_cursor);
    //         setSelectedThread(response);
    //         // setIsDialogOpen(true);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, []);

    let avatar = <PeopleAltIcon/>;

    if (users.length === 1) {
        avatar = <Avatar alt={thread_title} src={profile_pic_url}/>
    }

    const renderItems = useCallback(() => {
        if (!items.length) {
            return null;
        }

        const messages = items.sort((a, b) => a.timestamp - b.timestamp);
        return messages.map((item) => {
            let content;

            const date = Number(item.timestamp);

            const timestampInSeconds = moment(date).unix();
            const dateTime = moment(timestampInSeconds).format('dddd HH:mm');

            switch (item.item_type) {
                case 'text': {
                    content = (
                        <ListItemText
                            primary={item.text}
                            secondary={dateTime}
                            className={classes.messageText}
                            // style={{
                            //     textAlign: `${item.user_id === profile.pk ? 'right' : 'left'}`,
                            // }}
                        />
                    );
                    break;
                }
                case 'media': {
                    content = (
                        <img src={item.media.image_versions2.candidates[0].url} alt="Media"
                             className={classes.messageImg}/>
                    );
                    break;
                }
                default: {
                    content = (
                        <ListItemText
                            primary='Unsupported content'
                            className={classes.messageUnsupported}
                            style={{
                                textAlign: `${item.user_id === profile.pk ? 'right' : 'left'}`,
                            }}
                        />
                    );
                    break;
                }
            }
            if (item.user_id === profile.pk) {
                return (
                    <ListItem key={item.item_id} className={classes.flexEnd}>
                        {content}
                        <ListItemAvatar>
                            <Avatar alt={thread_title} src={profile.profile_pic_url}/>
                        </ListItemAvatar>
                    </ListItem>
                );
            }
            return (
                <ListItem key={item.item_id} className={classes.flexStart}>
                    <ListItemAvatar>
                        {avatar}
                    </ListItemAvatar>
                    {content}
                </ListItem>
            )
        });
    }, [avatar, profile, items, thread_title, classes]);

    const onChangedInput = useCallback((event) => {
        const {value} = event.target;
        setText(value);
    }, []);

    const submit = useCallback((event) => {
        event.preventDefault();
        dispatch(sendMessage({text, threadId: thread.thread_id}, socket));
        setText('');
    }, [text, thread.thread_id, dispatch, socket]);

    return (
        <Grid className={classes.listDialog} style={{
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            flexFlow: 'wrap',
            width: isDrawerOpened !== undefined && isDrawerOpened() ? (minWidth ? 'calc(50% - 77px)' : '100%') : '100%'
        }}
        >
            <Grid className={classes.dialogHeader}>
                {!minWidth ?
                    <KeyboardBackspaceIcon
                        className={classes.backButton}
                        onClick={goBack}
                    /> : null}
                <Typography>
                    {thread_title}
                </Typography>
                {!minWidth ?
                    <MoreVertIcon
                        className={classes.cursor}
                        onClick={isDrawerMobileOpen}
                    />
                    : null}
            </Grid>
            <Grid style={{width: '100%', overflowY: 'scroll', height: 'calc(100% - 130px)'}}>
                <List>
                    {renderItems()}
                </List>
            </Grid>
            <Grid className={classes.sentBox}>
                <form onSubmit={submit} className={classes.form}>
                    <TextField
                        autoFocus
                        fullWidth
                        label='Message'
                        name='message'
                        onChange={onChangedInput}
                        value={text}
                    />
                    <IconButton type='submit'>
                        <KeyboardReturnIcon className={classes.cursor}/>
                    </IconButton>
                </form>
            </Grid>
        </Grid>
    )
};

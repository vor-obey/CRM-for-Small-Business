import React, {useCallback, useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import RefreshIcon from '@material-ui/icons/Refresh';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {TextField} from '@material-ui/core';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import IconButton from '@material-ui/core/IconButton';
import {useDispatch} from 'react-redux';
import {sendMessage} from '../../../../data/store/user/userActions';
import moment from 'moment';
import List from '@material-ui/core/List';

export const ChatDialog = ({profile, thread, goBack, classes, minWidth}) => {
    const {users, thread_title, items} = thread;
    const {profile_pic_url} = users[0];
    const dispatch = useDispatch();
    const [text, setText] = useState('');

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
                            style={{
                                textAlign: `${item.user_id === profile.pk ? 'right' : 'left'}`,
                            }}
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
        dispatch(sendMessage({text, username: profile.username, threadId: thread.thread_id}));
        setText('');
    }, [text, profile.username, thread.thread_id, dispatch]);

    return (
        <List className={classes.listDialog} style={{
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            flexFlow: 'wrap'
        }}>
            <ListItem style={{
                height: '41px',
                borderBottom: '1px solid #B7BFC4',
                position: 'sticky',
                top: 0,
                backgroundColor: '#f0f7fd',
                zIndex: 1
            }}>
                {!minWidth ?
                    <KeyboardBackspaceIcon
                        className={classes.backButton}
                        onClick={goBack}
                    /> : null}
                <ListItemText
                    primary={thread_title}
                />
                <RefreshIcon className={classes.cursor}/>
            </ListItem>
            {renderItems()}
            <ListItem style={{
                borderTop: '1px solid #B7BFC4',
                position: 'sticky',
                bottom: 0,
                backgroundColor: '#f0f7fd',
                zIndex: 1
            }}>
                <form onSubmit={submit} className={classes.form}>
                    <TextField
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
            </ListItem>
        </List>
    )
};

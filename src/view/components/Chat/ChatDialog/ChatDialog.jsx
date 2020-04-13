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

export const ChatDialog = ({profile, thread, goBack}) => {
    const {users, thread_title, items} = thread;
    const {profile_pic_url} = users[0];
    const dispatch = useDispatch();
    const [text, setText] = useState('');

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
            switch (item.item_type) {
                case 'text': {
                    content = (
                        <ListItemText
                            primary={item.text}
                            style={{
                                border: '1px solid rgba(0, 0, 0, 0.12)',
                                borderRadius: 5,
                                padding: 10,
                                marginRight: 5,
                                marginLeft: 5,
                                textAlign: `${item.user_id === profile.pk ? 'right' : 'left'}`,
                                flex: 'unset'
                            }}
                        />
                    );
                    break;
                }
                case 'media': {
                    content = (
                        <img src={item.media.image_versions2.candidates[0].url} alt="Media"
                             style={{height: 150, width: 150}}/>
                    );
                    break;
                }
                default: {
                    content = (
                        <ListItemText
                            primary='Unsupported content'
                            style={{
                                border: '1px solid rgba(0, 0, 0, 0.12)',
                                borderRadius: 5,
                                padding: 10,
                                marginRight: 5,
                                marginLeft: 5,
                                textAlign: `${item.user_id === profile.pk ? 'right' : 'left'}`,
                                flex: 'unset'
                            }}
                        />
                    );
                    break;
                }
            }
            if (item.user_id === profile.pk) {
                return (
                    <ListItem key={item.item_id} style={{justifyContent: 'flex-end'}}>
                        {content}
                        <ListItemAvatar>
                            <Avatar alt={thread_title} src={profile.profile_pic_url}/>
                        </ListItemAvatar>
                    </ListItem>
                );
            }
            return (
                <ListItem key={item.item_id} style={{justifyContent: 'flex-start'}}>
                    <ListItemAvatar>
                        {avatar}
                    </ListItemAvatar>
                    {content}
                </ListItem>
            )
        });
    }, [avatar, profile, items, thread_title]);

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
        <>
            <ListItem>
                <KeyboardBackspaceIcon
                    style={{cursor: 'pointer'}}
                    onClick={goBack}
                />
                <ListItemAvatar>
                    {avatar}
                </ListItemAvatar>
                <ListItemText
                    primary={thread_title}
                />
                <RefreshIcon style={{cursor: 'pointer'}}/>
            </ListItem>
            {renderItems()}
            <ListItem>
                <form onSubmit={submit} style={{width: '100%', display: 'flex'}}>
                    <TextField
                        fullWidth
                        label='Message'
                        name='message'
                        onChange={onChangedInput}
                        value={text}
                    />
                    <IconButton type='submit'>
                        <KeyboardReturnIcon style={{cursor: 'pointer'}}/>
                    </IconButton>
                </form>
            </ListItem>
        </>
    )
};
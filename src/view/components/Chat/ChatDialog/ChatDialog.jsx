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

export const ChatDialog = ({thread, goBack, loggedInUser}) => {
    const [message, setMessage] = useState('');
    const {users, thread_title, items} = thread;
    const {profile_pic_url} = users[0];

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
            if (item.user_id === loggedInUser.id) {
                return (
                    <ListItem key={item.item_id} style={{justifyContent: 'flex-end'}}>
                        <ListItemText
                            primary={item.item_type === 'text' ? item.text : 'Some content'}
                            style={{
                                border: '1px solid rgba(0, 0, 0, 0.12)',
                                borderRadius: 5,
                                padding: 10,
                                marginRight: 5,
                                marginLeft: 5,
                                textAlign: 'right',
                                flex: 'unset'
                            }}
                        />
                        <ListItemAvatar>
                            <Avatar alt={thread_title} src={loggedInUser.profilePicUrl}/>
                        </ListItemAvatar>
                    </ListItem>
                );
            }
            return (
                <ListItem key={item.item_id} style={{justifyContent: 'flex-start'}}>
                    <ListItemAvatar>
                        {avatar}
                    </ListItemAvatar>
                    <ListItemText
                        primary={item.item_type === 'text' ? item.text : 'Some content'}
                        style={{
                            border: '1px solid rgba(0, 0, 0, 0.12)',
                            borderRadius: 5,
                            padding: 10,
                            marginRight: 5,
                            marginLeft: 5,
                            textAlign: 'left',
                            flex: 'unset'
                        }}
                    />
                </ListItem>
            )
        });
    }, [avatar, loggedInUser, items, thread_title]);

    const onChangedInput = useCallback((event) => {
        const {value} = event.target;
        setMessage(value);
    }, []);

    const submit = useCallback((event) => {
        event.preventDefault();
        console.log(message);
    }, [message]);

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
                        margin="normal"
                        name='message'
                        onChange={onChangedInput}
                        value={message}
                    />
                    <IconButton type='submit'>
                        <KeyboardReturnIcon style={{cursor: 'pointer'}}/>
                    </IconButton>
                </form>
            </ListItem>
        </>
    )
};
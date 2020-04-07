import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';

export const Notification = ({
                                 notification
                             }) => {
    const {icon, text, date, onClick} = notification;
    return (
        <div
            style={{
                width: 340,
                height: 70,
                display: 'flex',
                borderRadius: 5,
            }}
            onClick={onClick}
        >
            <ListItem>
                <ListItemAvatar>
                    {typeof icon === 'string' ? <Avatar alt="Icon" src={icon}/> : icon}
                </ListItemAvatar>
                <ListItemText primary={text} secondary={moment(date).format("MMM Do YYYY, HH:mm")}/>
            </ListItem>
        </div>
    );
};

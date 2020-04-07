import React from 'react';
import MessageIcon from '@material-ui/icons/Message';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import moment from 'moment'
import ReactNotification from 'react-notifications-component'


export const Notification = ({
                                 notification
                             }) => {

    return (
        <div style={{
            width: 340,
            height: 70,
            display: 'flex',
            borderRadius: 5,
        }}>
            <ListItem>
                <ListItemAvatar>
                    <MessageIcon/>
                </ListItemAvatar>
                <ListItemText primary={notification} secondary={moment().format("MMM Do YY")}/>
            </ListItem>
            <ReactNotification/>
        </div>
    );
};

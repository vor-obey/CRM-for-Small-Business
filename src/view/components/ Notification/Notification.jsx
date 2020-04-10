import React from 'react';
import {makeStyles, ListItemAvatar, ListItemText, Avatar, ListItem} from "@material-ui/core";
import moment from 'moment';
import {NotificationStyle} from "./Notification.style";

const useStyles = makeStyles(NotificationStyle);

export const Notification = ({
                                notification
                             }) => {
   const classes = useStyles();
   const {icon, text, date, onClick} = notification;

   return (
      <div
         className={classes.root}
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

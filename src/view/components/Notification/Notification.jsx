import React from 'react';
import moment from 'moment';
import {NotificationStyle} from "./Notification.style";
import {makeStyles, ListItemAvatar, ListItemText, Avatar, ListItem} from "@material-ui/core";

const useStyles = makeStyles(NotificationStyle);

export const Notification = ({
                                detailsMessage
                             }) => {
   const classes = useStyles();
   const {icon, text, date, onClick} = detailsMessage;

   return (
      <div
         className={classes.root}
         onClick={onClick}
      >
         <ListItem>
            <ListItemAvatar>
               {typeof icon === 'string' ? <Avatar alt="Icon" src={icon}/> : icon}
            </ListItemAvatar>
            <ListItemText className={classes.text} primary={text} secondary={moment(date).format("MMM Do YYYY, HH:mm")}/>
         </ListItem>
      </div>
   );
};

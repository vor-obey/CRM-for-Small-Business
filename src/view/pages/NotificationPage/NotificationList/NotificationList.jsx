import React from 'react';
import moment from "moment";
import {Grid, ListItemAvatar, Avatar, ListItem, ListItemText} from "@material-ui/core";

export const NotificationList = ({
                                     index,
                                     classes,
                                     notifications
                                 }) => {

    const renderDesignMobile = () => {
        return (
            <div className={classes.root}>
                <ListItem>
                    <ListItemAvatar>
                        {typeof notifications.icon === 'string' ?
                            <Avatar alt="Icon" src={notifications.icon}/> : notifications.icon}
                    </ListItemAvatar>
                    <ListItemText primary={notifications.text}
                                  secondary={moment(notifications.date).format("MMM Do YYYY, HH:mm")}
                                  className={classes.text}/>
                </ListItem>
            </div>
        )
    };

    const renderDesignDesktop = () => {
        return (
            <Grid container className={classes.rootDesktop}>
                <Grid item xl={1} lg={1} md={1} sm={1}>
                    <ListItemAvatar>
                        {typeof notifications.icon === 'string' ?
                            <Avatar alt="Icon" src={notifications.icon}/> : <Avatar>{notifications.icon}</Avatar>}
                    </ListItemAvatar>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4}>
                    <ListItemText primary={notifications.text} className={classes.text}/>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4}>
                    <ListItemText primary={moment(notifications.date).format("MMM Do YYYY")}/>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={3}>
                    <ListItemText primary={moment(notifications.date).format("HH:mm")}/>
                </Grid>
            </Grid>
        )
    };

    return (
        <div>
            <ListItem key={index} disableGutters divider button className={classes.designMobile}>
                {renderDesignMobile()}
            </ListItem>
            <ListItem key={index} disableGutters divider button className={classes.designDesktop}>
                {renderDesignDesktop()}
            </ListItem>
        </div>
    );
};

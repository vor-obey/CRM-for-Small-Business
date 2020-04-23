import React from 'react';
import moment from "moment";
import {useTranslation} from "react-i18next";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Avatar,
    ListItem,
    Typography,
    ExpansionPanel,
    ListItemAvatar,
    ExpansionPanelSummary,
    ExpansionPanelDetails
} from "@material-ui/core";

export const NotificationList = ({
                                     index,
                                     classes,
                                     notifications
                                 }) => {
    const {t} = useTranslation('');

    const renderDesktop = () => {
        return (
            <div key={index} onClick={() => notifications.onClick()}>
                <div className={classes.wrap}>
                    <ListItemAvatar>
                        {typeof notifications.icon === 'string' ?
                            <Avatar alt="Icon" src={notifications.icon}/> :
                            <Avatar>{notifications.icon}</Avatar>}
                    </ListItemAvatar>
                    <Typography>
                        <span className={classes.username}>{notifications.username}</span>
                        <span>{t('SEND')}</span>
                        <span className={classes.message}>{notifications.text}</span>
                        <span className={classes.date}>{moment(notifications.date).format('HH:mm')}</span>
                    </Typography>
                </div>
            </div>
        );
    };

    const renderMobile = () => {
        return (
            <div className={classes.divMobile}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} className={classes.panel}>
                        <div key={index} onClick={() => notifications.onClick()} className={classes.root}>
                            <div className={classes.wrap}>
                                <ListItemAvatar>
                                    {typeof notifications.icon === 'string' ?
                                        <Avatar alt="Icon" src={notifications.icon}/> :
                                        <Avatar>{notifications.icon}</Avatar>}
                                </ListItemAvatar>
                                <Typography>
                                    <span className={classes.username}>{notifications.username}</span>
                                    <span className={classes.send}>{t('SEND')}</span>
                                    <span className={classes.date}>{moment(notifications.date).format('HH:mm')}</span>
                                </Typography>
                            </div>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography className={classes.messageMobile}>{notifications.text}</Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    };

    return (
        <div>
            <ListItem key={index} disableGutters divider button className={classes.desktop}>
                {renderDesktop()}
            </ListItem>
            <div key={index} className={classes.mobile}>
                {renderMobile()}
            </div>
        </div>
    );
};

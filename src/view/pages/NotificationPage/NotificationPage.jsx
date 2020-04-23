import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import {makeStyles, Container} from "@material-ui/core";
import {NotificationPageStyle} from "./NotificationPage.style";
import {NotificationList} from "./NotificationList/NotificationList";

const useStyles = makeStyles(NotificationPageStyle);

export const NotificationPage = () => {
    const classes = useStyles();
    const notifications = useSelector(state => state.auxiliaryReducer.notificationsArr);

    const renderNotification = useCallback(() => {
        if (!notifications) {
            return null
        }
        return notifications.map((notification, index) => {
            return <NotificationList
                key={index}
                classes={classes}
                notifications={notification}
            />
        })
    }, [notifications, classes]);

    return (
        <Container className={classes.container}>
            {renderNotification()}
        </Container>
    );
};

import React, {useCallback} from 'react';
import isEmpty from 'lodash/isEmpty';
import {useSelector} from "react-redux";
import {makeStyles, Container, Grid} from "@material-ui/core";
import {NotificationPageStyle} from "./NotificationPage.style";
import {NotificationListItem} from "./NotificationListItem/NotificationListItem";
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(NotificationPageStyle);

export const NotificationPage = () => {
    const classes = useStyles();
    const {t} = useTranslation();
    const notifications = useSelector(state => state.auxiliaryReducer.notificationsArr);

    const renderNotification = useCallback(() => {
        if (isEmpty(notifications)) {
            return (
                <Grid container spacing={0}
                      direction="column"
                      alignItems="center"
                      justify="center"
                      style={{minHeight: 'calc(100vh - 64px)'}}>
                    <Grid container item xs={8} sm={4} style={{flexDirection: 'column', textAlign: 'center'}}>
                        <Typography variant='h5' style={{paddingBottom: 18}}>{t('NO_NEW_NOTIFICATIONS')}</Typography>
                    </Grid>
                </Grid>
            );
        }
        const notificationsArr = [...notifications];

        return notificationsArr.sort(((a, b) => a.date > b.date ? -1 : 1)).map((notification, index) => {
            return <NotificationListItem
                key={index}
                classes={classes}
                notification={notification}
            />
        })
    }, [notifications, classes, t]);

    return (
        <Container className={classes.container}>
            {renderNotification()}
        </Container>
    );
};

import React, {useCallback} from 'react';
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {NotificationPageStyle} from "./NotificationPage.style";
import {NotificationList} from "./NotificationList/NotificationList";
import {makeStyles, List, Container, ListItem, Grid, Typography} from "@material-ui/core";

const useStyles = makeStyles(NotificationPageStyle);

export const NotificationPage = ({
                                     history
                                 }) => {
    const classes = useStyles();
    const {t} = useTranslation();
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
        <Container>
            <List className={classes.listDescription}>
                <ListItem disableGutters divider className={classes.listItem}>
                    <Grid container className={classes.gridDescription}>
                        <Grid item xl={4} lg={4} md={4} sm={4}>
                            <Typography>{t('NAME')}</Typography>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4}>
                            <Typography>{t('DATE')}</Typography>
                        </Grid>
                        <Grid item xl={1} lg={1} md={1} sm={1}>
                            <Typography>{t('TIME')}</Typography>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
            {renderNotification()}
        </Container>
    );
};

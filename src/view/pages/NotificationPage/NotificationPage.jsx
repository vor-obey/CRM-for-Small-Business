import React, {useCallback} from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import MessageIcon from "@material-ui/icons/Message";
import {NotificationPageStyle} from "./NotificationPage.style";
import {NotificationList} from "./NotificationList/NotificationList";
import {displayNotification} from "../../../data/store/auxiliary/auxiliaryThunkActions";
import {makeStyles, Button, List, Container, ListItem, Grid, Typography} from "@material-ui/core";

const useStyles = makeStyles(NotificationPageStyle);

export const NotificationPage = ({
                                     history
                                 }) => {
    const classes = useStyles();
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.auxiliaryReducer.notificationsArr);

    const onClick = () => {
        history.push('/orders');
    };

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

    const renderButton = () => {
      return (
          <div className={classes.divButton}>
              <Button
                  onClick={() => dispatch(displayNotification({
                      icon: <MessageIcon style={{color: 'rgba(63,81,181,1)'}}/>,
                      text: 'New Order !',
                      date: new Date(),
                      onClick: onClick
                  }))}
              >
                  Show Notification New Order
              </Button>
              <Button
                  onClick={() => dispatch(displayNotification({
                      icon: 'https://b1.filmpro.ru/c/17488.700xp.jpg',
                      text: 'New Message',
                      date: new Date(),
                      onClick: onClick
                  }))}
              >
                  Show Notification Instagram
              </Button>
          </div>
      );
    };

    return (
        <Container>
            {renderButton()}
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

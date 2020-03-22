import React, {useCallback, useState} from 'react'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
    Button,
    SwipeableDrawer,
    List,
    ListItem,
    ListItemText,
    makeStyles, Divider, ListItemIcon,
} from '@material-ui/core';
import {profileStyles} from "./Profile.style";
import {Link} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import {useTranslation} from "react-i18next";
import {CustomDialog} from "../CustomDialog/CustomDialog";

const useStyles = makeStyles(profileStyles);

export const Profile = (props) => {
    const {currentUser} = props;
    const classes = useStyles();
    const {t} = useTranslation('');

    const [userDrawer, setUserDrawer] = React.useState({
        right: false,
    });
    const [isShow, setIsShow] = useState(false);

    const handleOpenDialog = useCallback(() => {
        setIsShow(prevState => !prevState);
    }, []);

    const logOutHandler = () => {
        let token = localStorage.getItem("acc");

        if (token) {
            return localStorage.removeItem("acc");
        }
    };

    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setUserDrawer({...userDrawer, [side]: open});
    };

    const isActive = (e) => window.location.pathname === e ? true : null;

    const displayUser = side => {

        if (!currentUser) {
            return null;
        }

        return (
            <div
                className={classes.list}
                role="presentation"
                onClick={toggleDrawer(side, false)}
                onKeyDown={toggleDrawer(side, false)}
            >
                <List>
                    <ListItem>
                        <ListItemText>{`${currentUser.firstName} ${currentUser.lastName}`}</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>{currentUser.organization.name}</ListItemText>
                    </ListItem>
                    <Divider variant="fullWidth" component="li"/>
                    <ListItem
                        className={classes.menuItem}
                        button
                        component={Link}
                        to={`/users/${currentUser.userId}/edit`}
                        selected={isActive('/')}>
                        <ListItemIcon><EditIcon/></ListItemIcon>
                        <ListItemText>{t('EDIT_PROFILE')}</ListItemText>
                    </ListItem>
                    <Divider variant="fullWidth" component="li"/>
                    <ListItem
                        className={classes.menuItem}
                        button
                        onClick={handleOpenDialog}>
                        <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                        <ListItemText>{t('LOGOUT')}</ListItemText>
                    </ListItem>
                </List>
            </div>
        )
    };

    return (

        <div>
            <Button onClick={toggleDrawer('right', true)}>
                <AccountCircleIcon
                    className={classes.account}
                />
            </Button>
            <SwipeableDrawer
                anchor="right"
                open={userDrawer.right}
                onClose={toggleDrawer('right', false)}
                onOpen={toggleDrawer('right', true)}
            >
                {displayUser('right')}
            </SwipeableDrawer>
            <CustomDialog
                title={t('LOGOUT')}
                children={t('LOGOUT_TEXT')}
                isShow={isShow}
                onClose={handleOpenDialog}
                closeText={t('NO')}
                actionText={t('YES')}
                exit={'/'}
                onAction={logOutHandler}
            />
        </div>
    );
};

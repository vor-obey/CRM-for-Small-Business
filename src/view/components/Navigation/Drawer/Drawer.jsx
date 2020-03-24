import React from 'react';
import {Link} from "react-router-dom";

import {
    SwipeableDrawer,
    Button,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    withStyles
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PlusIcon from '@material-ui/icons/PlusOne';
import MenuIcon from '@material-ui/icons/Menu';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import {drawerStyle} from "./Drawer.style";
import {useTranslation} from "react-i18next";

function Drawer(props) {
    const {classes} = props;
    const [state, setState] = React.useState({
        left: false,
    });
    const {t} = useTranslation('');

    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({...state, [side]: open});
    };

    const isActive = (e) => window.location.pathname === e ? true : null;

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <ListItem
                    className={classes.menuItem}
                    button
                    component={Link}
                    to="/dashboard"
                    selected={isActive('/')}>
                    <ListItemIcon className={classes.menuIcon}><HomeIcon/></ListItemIcon>
                    <ListItemText>{t('HOME')}</ListItemText>
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem
                    className={classes.menuItem}
                    button
                    component={Link}
                    to="/create-order"
                    selected={isActive('/#')}>
                    <ListItemIcon className={classes.menuIcon}><PlusIcon/></ListItemIcon>
                    <ListItemText>{t('CREATE_ORDER')}</ListItemText>
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem
                    className={classes.menuItem}
                    button
                    component={Link}
                    to="/customers"
                    selected={isActive('/customers')}>
                    <ListItemIcon className={classes.menuIcon}><AssignmentIndIcon/></ListItemIcon>
                    <ListItemText>{t('CUSTOMERS')}</ListItemText>
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem
                    className={classes.menuItem}
                    button
                    component={Link}
                    to="/users"
                    selected={isActive('/users')}>
                    <ListItemIcon className={classes.menuIcon}><PeopleIcon/></ListItemIcon>
                    <ListItemText>{t('USERS')}</ListItemText>
                </ListItem>
                <ListItem
                    className={classes.menuItem}
                    button
                    component={Link}
                    to="/orders"
                    selected={isActive('/orders')}>
                    <ListItemIcon className={classes.menuIcon}><InsertDriveFileIcon/></ListItemIcon>
                    <ListItemText>{t('ORDERS')}</ListItemText>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <Button onClick={toggleDrawer('left', true)}>
                <MenuIcon
                    className={classes.burger}
                />
            </Button>
            <SwipeableDrawer
                open={state.left}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {sideList('left')}
            </SwipeableDrawer>
        </div>
    );
}

export default withStyles(drawerStyle)(Drawer);

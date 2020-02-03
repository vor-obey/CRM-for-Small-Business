import React from 'react';
import { Link } from "react-router-dom";

import {
    SwipeableDrawer,
    Button,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    withStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PlusIcon from '@material-ui/icons/PlusOne';
import MenuIcon from '@material-ui/icons/Menu';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { drawerStyle } from "./Drawer.style";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


function Drawer(props) {
    const { classes } = props;
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [side]: open });
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
                <ListItem button
                          component={Link}
                          to="/dashboard"
                          selected={isActive('/')}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem button
                          component={Link}
                          to="/"
                          selected={isActive('/#')}>
                    <ListItemIcon><PlusIcon /></ListItemIcon>
                    <ListItemText>Create order</ListItemText>
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem button
                          component={Link}
                          to="/customers"
                          selected={isActive('/customers')}>
                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                    <ListItemText>Customers</ListItemText>
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem button
                          component={Link}
                          to="/users"
                          selected={isActive('/users')}>
                    <ListItemIcon><PeopleIcon /></ListItemIcon>
                    <ListItemText>Users</ListItemText>
                </ListItem>
                <ListItem button
                          component={Link}
                          to="/orders"
                          selected={isActive('/orders')}>
                    <ListItemIcon><InsertDriveFileIcon /></ListItemIcon>
                    <ListItemText>Orders</ListItemText>
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem button
                          component={Link}
                          to="/logout"
                          selected={isActive('/logout')}>
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText>Log Out</ListItemText>
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

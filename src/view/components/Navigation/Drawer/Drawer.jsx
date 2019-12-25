import React from 'react';
import { SwipeableDrawer, Button, List, Divider, ListItem, ListItemIcon, ListItemText, withStyles} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ContactsIcon from '@material-ui/icons/Contacts';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DescriptionIcon from '@material-ui/icons/Description';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MenuIcon from '@material-ui/icons/Menu';
import { drawerStyle } from "./Drawer.style";
import { Link } from "react-router-dom";


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
                        to="/">
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem button
                        component={Link}
                        to="/users">
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText>Users</ListItemText>
                    </ListItem>
                    <ListItem button
                        component={Link}
                        to="/create-user">
                        <ListItemIcon><PersonAddIcon /></ListItemIcon>
                        <ListItemText>Create user</ListItemText>
                    </ListItem>
                    <ListItem button
                        component={Link}
                        to="/">
                        <ListItemIcon><ContactsIcon /></ListItemIcon>
                        <ListItemText>User view</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem button
                        component={Link}
                        to="/">
                        <ListItemIcon><InsertDriveFileIcon /></ListItemIcon>
                        <ListItemText>Orders</ListItemText>
                    </ListItem>
                    <ListItem button
                        component={Link}
                        to="/">
                        <ListItemIcon><DescriptionIcon /></ListItemIcon>
                        <ListItemText>Create order</ListItemText>
                    </ListItem>
                    <ListItem button
                        component={Link}
                        to="/">
                        <ListItemIcon><FileCopyIcon /></ListItemIcon>
                        <ListItemText>Order view</ListItemText>
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

import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';

import {
    SwipeableDrawer,
    Button,
    withStyles
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PlusIcon from '@material-ui/icons/PlusOne';
import MenuIcon from '@material-ui/icons/Menu';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ChatIcon from '@material-ui/icons/Chat';
import MessageIcon from "@material-ui/icons/Message";
import {drawerStyle} from "./Drawer.style";
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import {Sidebar} from "./Sidebar";

import {
    CHAT,
    CHAT_TEMPLATES,
    CUSTOMERS,
    DASHBOARD,
    NOTIFICATIONS,
    ORDERS,
    ORDERS_CREATE,
    PRODUCT_TEMPLATES,
    PRODUCT_TYPES,
    PRODUCTS,
    USERS
} from "../../../../constants/routes";

const NAVIGATION = [
    {
        to: DASHBOARD,
        Icon: HomeIcon,
        label: 'HOME',
    },
    {
        to: CUSTOMERS,
        Icon: AssignmentIndIcon,
        label: 'CUSTOMERS'
    },
    {
        to: USERS,
        Icon: PeopleIcon,
        label: 'USERS'
    },
    {
        to: ORDERS,
        Icon: InsertDriveFileIcon,
        label: 'ORDERS',
        children: [
            {
                to: ORDERS,
                Icon: InsertDriveFileIcon,
                label: 'ORDERS',
            },
            {
                to: ORDERS_CREATE,
                Icon: PlusIcon,
                label: 'CREATE_ORDER'
            },
        ]
    },
    {
        to: PRODUCTS,
        Icon: InsertDriveFileIcon,
        label: 'PRODUCTS',
        children: [
            {
                to: PRODUCTS,
                Icon: InsertDriveFileIcon,
                label: 'PRODUCTS',
            },
            {
                to: PRODUCT_TEMPLATES,
                Icon: InsertDriveFileIcon,
                label: 'PRODUCT_CATEGORIES'
            },
            {
                to: PRODUCT_TYPES,
                Icon: InsertDriveFileIcon,
                label: 'PRODUCT_TYPES'
            }
        ]
    },
    {
        to: CHAT,
        Icon: ChatIcon,
        label: 'CHAT',
        children: [
            {
                to: CHAT,
                Icon: ChatIcon,
                label: 'CHAT'
            },
            {
                to: CHAT_TEMPLATES,
                Icon: AddToHomeScreenIcon,
                label: 'MESSAGE_TEMPLATES'
            }
        ]
    },
    {
        to: NOTIFICATIONS,
        Icon: MessageIcon,
        label: 'NOTIFICATION'
    },
]


function Drawer(props) {
    const {classes} = props;
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeSidebar, setActiveSidebar] = useState(null);
    const { pathname } = useLocation();


    const toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpen(open);
        setActiveSidebar(null);
    };

    const childSidebars = NAVIGATION.reduce((acc, item) => {
        return !item.children ? acc : [...acc, {
            parent: item.to,
            options: item.children
        }];
    }, [])

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>
                <MenuIcon
                    className={classes.burger}
                />
            </Button>
            <SwipeableDrawer
                open={isOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <Sidebar side='left'
                         toggleDrawer={toggleDrawer}
                         options={NAVIGATION}
                         setActive={setActiveSidebar}
                />
                {childSidebars.map(({ parent, options }) => (
                    <Sidebar side='left'
                             key={parent}
                             toggleDrawer={toggleDrawer}
                             parent={parent}
                             options={options}
                             setActive={setActiveSidebar}
                             isActive={activeSidebar ? activeSidebar === parent : pathname.startsWith(parent)}
                    />
                ))}
            </SwipeableDrawer>
        </div>
    );
}

export default withStyles(drawerStyle)(Drawer);

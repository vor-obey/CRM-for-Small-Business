import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';

import {
    Drawer as MUIDrawer,
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PlusIcon from '@material-ui/icons/PlusOne';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ChatIcon from '@material-ui/icons/Chat';
import MessageIcon from "@material-ui/icons/Message";
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
import {makeStyles} from "@material-ui/core/styles";

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

const useStyles = makeStyles((theme) => ({
    root: {
        width: 150
    },
    navigation: {
        width: 150,
        height: '100%',
        overflow: 'hidden',
        marginTop: 86,
        boxShadow: '2px 5px 10px rgba(0,0,0,0.1)',
    },
    list: {
        width: 150,
    },
    fullList: {
        width: 'auto',
    },
    burger: {
        color: '#ffffff',
    },
    menuItem: {
        '&:hover': {
            color: '#fff',
            background: 'linear-gradient(90deg, rgba(63,81,181,1) 50%, rgba(34,171,199,1) 100%)',
            '& $menuIcon': {
                color: '#fff',
            },
        },
    },
    menuIcon:{},
}))

const Drawer = () => {
    const classes = useStyles();
    const [activeSidebar, setActiveSidebar] = useState(null);
    const { pathname } = useLocation();

    const childSidebars = NAVIGATION.reduce((acc, item) => {
        return !item.children ? acc : [...acc, {
            parent: item.to,
            options: item.children
        }];
    }, [])

    return (
        <MUIDrawer variant='permanent' className={classes.root} classes={{
            paper: classes.navigation
        }}>
            <Sidebar side='left'
                     options={NAVIGATION}
                     setActive={setActiveSidebar}
            />
            {childSidebars.map(({ parent, options }) => (
                <Sidebar side='left'
                         key={parent}
                         parent={parent}
                         options={options}
                         setActive={setActiveSidebar}
                         isActive={activeSidebar ? activeSidebar === parent : pathname.startsWith(parent)}
                />
            ))}
        </MUIDrawer>
    );
}

export default Drawer;

import React from 'react';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/styles';
import {useTranslation} from 'react-i18next';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import cx from 'clsx';
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        background: 'white',
    },
    list: {
        padding: 0
    },
    fullList: {
        width: 'auto',
    },
    child: {
        position: 'absolute',
        transform: 'translateX(100%)',
        transition: 'transform .15s linear'
    },
    childActive: {
        transform: 'translateX(0)'
    },
    burger: {
        color: '#ffffff',
    },
    menuItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            color: '#fff',
            background: 'linear-gradient(90deg, rgba(63,81,181,1) 50%, rgba(34,171,199,1) 100%)',
            '& $menuIcon': {
                color: '#fff',
            },
        },
    },
    backButton: {

    },
    menuText: {
      textAlign: 'center'
    },
    menuIcon: {
        minWidth: 30,
        minHeight: 30,
        '& svg': {
            width: 30,
            height: 30,
        }
    },
    levelIcon: {
        position: 'absolute',
        right: 10,
        bottom: 30,
        minWidth: 15,
        '& svg': {
            width: 15,
            height: 15
        }
    }
}))

export const Sidebar = ({ options, parent, setActive, isActive }) => {
    const {t} = useTranslation('');
    const classes = useStyles();

    return (
        <div
            className={cx(
                classes.root,
                {
                    [classes.child]: Boolean(parent),
                    [classes.childActive]: isActive,
                }
            )}
            role='presentation'
        >
            <List className={classes.list}>
                { parent && (
                    <>
                        <ListItem
                            key='back'
                            className={cx(classes.menuItem, classes.backButton)}
                            onClick={() => setActive('root')}
                            button>
                            <ListItemIcon className={classes.menuIcon}>
                                <ArrowBackIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Back
                            </ListItemText>
                        </ListItem>
                        <Divider />
                    </>

                )}
                {options.map(({to, Icon, label, children}) => (
                    <ListItem
                        key={to}
                        className={classes.menuItem}
                        button
                        component={Link}
                        to={to}>
                        <ListItemIcon className={classes.menuIcon}>
                            <Icon />
                        </ListItemIcon>
                        <ListItemText className={classes.menuText}>
                            {t(label)}
                        </ListItemText>
                        {
                            !!children && (
                                <ListItemIcon
                                    className={classes.levelIcon}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setActive(to);
                                    }}>
                                    <ArrowForwardIosIcon />
                                </ListItemIcon>
                            )
                        }
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

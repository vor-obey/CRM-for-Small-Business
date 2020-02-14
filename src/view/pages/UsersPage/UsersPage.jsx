import React, {useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Container, List, ListItem, Grid, Typography, Hidden, makeStyles} from '@material-ui/core';
import {usersPageStyle} from "./UsersPage.style";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {UserService} from "../../../services";
import {useDispatch} from "react-redux";
import {UserListItem} from "./UserListItem/UserListItem";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";

const useStyles = makeStyles(usersPageStyle);

export const UsersPage = (props) => {
    const {history} = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                dispatch(setIsLoading(true));
                const response = await UserService.list();
                setUserList(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE}))
            }
        };
        fetchUsers();
    }, [dispatch]);

    const navigateToUserDetails = useCallback((userId) => {
        history.push(`/users/${userId}`)
    }, [history]);

    const renderRows = useCallback(() => {
        if (!userList || !userList.length) {
            return null;
        }
        return userList.map((user) => {
            return (
                <UserListItem
                    key={user.userId}
                    user={user}
                    classes={classes}
                    navigateToUserDetails={navigateToUserDetails}
                />
            );
        })
    }, [userList, classes, navigateToUserDetails]);

    return (
        <Container className={classes.root}>
            <List className={classes.container}>
                <ListItem divider>
                    <Grid container className={classes.userListContainer}>
                        <Grid item xs={4} md={2}>
                            <Typography className={classes.userItemTitle}>
                                First Name
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Typography className={classes.userItemTitle}>
                                Last Name
                            </Typography>
                        </Grid>
                        <Hidden smDown>
                            <Grid item xs={3} md={2}>
                                <Typography className={classes.userItemTitle}>
                                    Email
                                </Typography>
                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <Grid item xs={3} md={2}>
                                <Typography className={classes.userItemTitle}>
                                    Contact Number
                                </Typography>
                            </Grid>
                        </Hidden>
                        <Grid item xs={4} md={2}>
                            <Typography className={classes.userItemTitle}>
                                Role
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
                {renderRows()}
            </List>
            <Grid container justify={'center'}>
                <Button
                    type='submit'
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    component={Link}
                    to={'/create-user'}>
                    <PersonAddIcon className={classes.addUser}/>
                    Create user
                </Button>
            </Grid>
        </Container>
    );
};

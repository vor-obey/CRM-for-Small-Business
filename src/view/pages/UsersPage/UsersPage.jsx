import React, {useCallback, useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, List, ListItem, Grid, Typography, Hidden, makeStyles} from '@material-ui/core';
import { usersPageStyle } from "./UsersPage.style";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {UserService} from "../../../services";
import {setNewUserCreated} from "../../../data/store/user/userActions";

const useStyles = makeStyles(usersPageStyle);

export const UsersPage = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const isNewUserCreated = useSelector(state => state.userReducer.isNewUserCreated);
    const [userList, setUserList] = useState([]);

    // todo refactor to optimize renders
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await UserService.list();
            setUserList(response);
            dispatch(setNewUserCreated(false))
        };

        fetchUsers();
    }, [dispatch, isNewUserCreated]);

    const navigateToUserDetails = useCallback((userId) => {
        props.history.push(`/users/${userId}`)
    }, [props.history]);

    const renderRows = useCallback(() => {
        if (!userList || !userList.length) {
            return null;
        }

        return userList.map((user) => {
            return (
                <ListItem className={classes.userBlock} divider style={{cursor: 'pointer'}} key={user.userId} onClick={() => navigateToUserDetails(user.userId)}>
                    <Grid container justify={'space-between'} alignItems={'flex-start'}>
                        <Grid item xs={4} md={2}>
                            <Typography className={classes.userItem} display="block" variant="body2" align="justify">
                                {user.firstName}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Typography className={classes.userItem} display="block" variant="body2" align="left" >
                                {user.lastName}
                            </Typography>
                        </Grid>
                        <Hidden smDown>
                            <Grid item xs={3} md={2}>
                                <Typography className={classes.userItem} display="block" variant="body2" align="left">
                                    {user.email}
                                </Typography>
                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <Grid item xs={3} md={2}>
                                <Typography className={classes.userItem} display="block" variant="body2" align="left">
                                    {user.contactNumber}
                                </Typography>
                            </Grid>
                        </Hidden>
                        <Grid item xs={4} md={2}>
                            <Typography className={classes.userItem} display="block" variant="body2" align="left">
                                {user.role.name}
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
            )
        })
    }, [userList, classes, navigateToUserDetails]);

    return(
        <Container className={classes.root}>
            <List className={classes.container}>
                <ListItem divider >
                    <Grid container justify={'space-between'} alignItems={'center'}>
                        <Grid item xs={4} md={2}>
                            <Typography className={classes.userItem} variant="body1" align="left">
                                First Name
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Typography className={classes.userItem} variant="body1" align="left">
                                Last Name
                            </Typography>
                        </Grid>
                        <Hidden smDown>
                            <Grid item xs={3} md={2}>
                                <Typography className={classes.userItem} variant="body1" align="left">
                                    Email
                                </Typography>
                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <Grid item xs={3} md={2}>
                                <Typography className={classes.userItem} variant="body1" align="left">
                                    Contact Number
                                </Typography>
                            </Grid>
                        </Hidden>
                        <Grid item xs={4} md={2}>
                            <Typography className={classes.userItem} variant="body1" align="left">
                                Role
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
                {renderRows()}
            </List>
            <Grid container justify={'center'} >
                <Button
                    type='submit'
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    component={Link}
                    to={'/create-user'}>
                    <PersonAddIcon className={classes.addUser} />
                    Create user
                </Button>
            </Grid>
        </Container>
    );
};

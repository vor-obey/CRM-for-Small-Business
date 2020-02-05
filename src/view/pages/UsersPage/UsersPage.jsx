import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadUsers } from "../../../data/store/user/userThunkAction";
import { setNewUserCreated } from "../../../data/store/user/userActions";
import {
    List, ListItem, ListItemText,
    Grid, Typography, Button,
    Hidden, Container, withStyles
} from '@material-ui/core';
import { usersPageStyle } from "./UsersPage.style";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

class UsersPage extends Component {

    componentDidMount() {
        const { loadUsers } = this.props;
        loadUsers();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const { isNewUserCreated, loadUsers, setNewUserCreated } = this.props;

        if (isNewUserCreated) {
            setNewUserCreated(false);
            loadUsers();
        }
    }

    renderRows() {
        const { userList, classes } = this.props;

        if (!userList || !userList.length) {
            return null;
        }

        return userList.map((user) => {
            return (
                <ListItem className={classes.userListItem} divider style={{cursor: 'pointer'}} key={user.userId} onClick={() => this.props.history.push(`/users/${user.userId}`)}>
                    <Grid container justify={'space-around'}>
                        <Grid item xs={2}>
                            <ListItemText primary={user.firstName} />
                        </Grid>
                        <Grid item xs={2}>
                            <ListItemText primary={user.lastName}/>
                        </Grid>
                        <Hidden smDown>
                            <Grid item xs={3}>
                                <ListItemText primary={user.email}/>
                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <Grid item xs={3}>
                                <ListItemText primary={user.contactNumber}/>
                            </Grid>
                        </Hidden>
                        <Grid item xs={2}>
                            <ListItemText primary={user.role.name}/>
                        </Grid>
                    </Grid>
                </ListItem>
            )
        })
    }

    render() {
        const { classes } = this.props;

        return(
            <Container className={classes.root}>
                <List className={classes.container}>
                    <ListItem divider >
                        <Grid container justify={'space-around'}>
                            <Grid item xs={2}>
                                <Typography variant="h6" align="left">First Name</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6" align="left">Last Name</Typography>
                            </Grid>
                            <Hidden smDown>
                                <Grid item xs={3}>
                                    <Typography variant="h6" align="left">Email</Typography>
                                </Grid>
                            </Hidden>
                            <Hidden smDown>
                                <Grid item xs={3}>
                                    <Typography variant="h6" align="left">Contact Number</Typography>
                                </Grid>
                            </Hidden>
                            <Grid item xs={2}>
                                <Typography variant="h6" align="left">Role</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                    {this.renderRows()}
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
    }
}

const mapStateToProps = (state) => {
    const { userList, newUser, isNewUserCreated } = state.userReducer;

    return {
        userList,
        newUser,
        isNewUserCreated
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUsers: () => dispatch(loadUsers()),
        setNewUserCreated: () => dispatch(setNewUserCreated()),
    }
};

export default withStyles(usersPageStyle)(connect(mapStateToProps, mapDispatchToProps)(UsersPage));


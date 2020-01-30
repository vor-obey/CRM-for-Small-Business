import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadUsers } from "../../../data/store/user/userThunkAction";

import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Container,
    withStyles } from '@material-ui/core';
import { usersPageStyle } from "./UsersPage.style";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

class UsersPage extends Component {

    componentDidMount() {
        const { loadUsers } = this.props;
        loadUsers();
    }


    //TODO refactor
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.userList && this.props.userList.length !== 0 && this.props.userList) {
            if (this.props.userList.findIndex((user) => user.userId === this.props.userList.userId) === -1) {
                const { loadUsers } = this.props;
                loadUsers();
            }
        }
    }

    renderRows() {
        const { userList } = this.props;

        if (!userList || !userList.length) {
            return null;
        }

        return userList.map((user) => {
            return (
                <TableRow style={{cursor: 'pointer'}} key={user.userId} onClick={() => this.props.history.push(`/users/${user.userId}`)}>
                    <TableCell align="left">{user.firstName}</TableCell>
                    <TableCell align="left">{user.lastName}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">{user.contactNumber}</TableCell>
                    <TableCell align="left">{user.role.name}</TableCell>
                </TableRow>
            )
        })
    }

    render() {
        const { classes } = this.props;

        return(
            <Container className={classes.allUsers}>
                <TableContainer>
                    <Table className={classes.table} align="center" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">First Name</TableCell>
                                <TableCell align="left">Last Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Contact number</TableCell>
                                <TableCell align="left">Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.renderRows()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    type='submit'
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    component={Link}
                    to={'/create-user'}
                >
                    <PersonAddIcon className={classes.addUser} />
                    Create user
                </Button>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const { userList, newUser } = state.userReducer;

    return {
        userList,
        newUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUsers: () => dispatch(loadUsers()),
    }
};

export default withStyles(usersPageStyle)(connect(mapStateToProps, mapDispatchToProps)(UsersPage));


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

    renderRows() {
        const { userList } = this.props;

        if (userList) {
            return (userList.map((user) => {
                return (
                    <TableRow style={{cursor: 'pointer'}} key={user.userId} onClick={() => this.props.history.push(`/users/${user.id}`)}>
                        <TableCell align="left">{user.firstName}</TableCell>
                        <TableCell align="left">{user.lastName}</TableCell>
                        <TableCell align="left">{user.email}</TableCell>
                        <TableCell align="left">{user.contactNumber}</TableCell>
                        <TableCell align="left">{user.role.name}</TableCell>
                    </TableRow>
                )
            }))
        }
        return null;
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
    const { userList } = state.userReducer;

    return {
        userList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUsers: () => dispatch(loadUsers()),
    }
};

export default withStyles(usersPageStyle)(connect(mapStateToProps, mapDispatchToProps)(UsersPage));


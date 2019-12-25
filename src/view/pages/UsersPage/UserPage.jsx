import React, { Component } from 'react';
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
import { userPageStyle } from "./UserPage.style";
import PersonAddIcon from '@material-ui/icons/PersonAdd';


class UserPage extends Component{

    componentDidMount() {
        const { loadUsers } = this.props;
        loadUsers();
    }

    render() {
        const { classes } = this.props;

        return(
            <Container className={classes.allUsers}>
                <TableContainer>
                    <Table className={classes.table} align="center" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="left">First Name</TableCell>
                                <TableCell align="left">Last Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.props.userList.map( u =>
                            <TableRow key={u.id}>
                                <TableCell align="center">{u.id}</TableCell>
                                <TableCell align="left">{u.firstName}</TableCell>
                                <TableCell align="left">{u.lastName}</TableCell>
                                <TableCell align="left">{u.email}</TableCell>
                                <TableCell align="left">{u.role}</TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    type='submit'
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    href="/create-user"
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

export default withStyles(userPageStyle)(connect(mapStateToProps, mapDispatchToProps)(UserPage));


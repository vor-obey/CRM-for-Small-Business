import React, {useCallback, useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Container,
    makeStyles } from '@material-ui/core';
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

    const renderRows = useCallback(() => {
        if (!userList || !userList.length) {
            return null;
        }

        return userList.map((user) => {
            return (
                <TableRow style={{cursor: 'pointer'}} key={user.userId} onClick={() => props.history.push(`/users/${user.userId}`)}>
                    <TableCell align="left">{user.firstName}</TableCell>
                    <TableCell align="left">{user.lastName}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">{user.contactNumber}</TableCell>
                    <TableCell align="left">{user.role.name}</TableCell>
                </TableRow>
            )
        })
    }, [userList, props.history]);

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
                        {renderRows()}
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
};

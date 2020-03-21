import React, {useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Container, List, ListItem, Grid, Typography, Hidden, makeStyles} from '@material-ui/core';
import {usersPageStyle} from "./UsersPage.style";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {RoleService, UserService} from "../../../services";
import {useDispatch} from "react-redux";
import {UserListItem} from "./UserListItem/UserListItem";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";
import {FilterInput} from "../../components/Filter/FilterInput/FilterInput";
import {filter} from "../../../utils/helpers";
import {USER_URLS} from '../../../constants/urls';
import {useTranslation} from 'react-i18next';
import {ListSelector} from "../../components/ListSelector/ListSelector";


const useStyles = makeStyles(usersPageStyle);

export const UsersPage = ({history}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {t} = useTranslation('');

    const [userList, setUserList] = useState([]);
    const [roles, setRoles] = useState([]);
    const [inputFilter, setInputFilter] = useState('');
    const [select, setSelect] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setIsLoading(true));
                const [response, roles] = await Promise.all([UserService.list(), RoleService.list()]);
                setUserList(response);
                setRoles(roles);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
            }
        };
        fetchData();
    }, [dispatch]);

    const navigateToUserDetails = useCallback((userId) => {
        history.push(`${USER_URLS.USERS}/${userId}`)
    }, [history]);

    const onChangeHandler = useCallback((event) => {
        const {value} = event.target;
        setInputFilter(value)
    }, []);

    const onChangeSelect = useCallback((event) => {
        const {value} = event.target;
        setSelect(value);
    }, []);

    const filterUsers = useCallback(() => {
        let filteredUsers = filter(userList, inputFilter);

        if (!select) {
            return filteredUsers;
        }

        return filter(filteredUsers, select, ['role']);
    }, [inputFilter, select, userList]);

    const renderSelect = useCallback(() => {
        return (
            <ListSelector
                classes={classes}
                label={t('SORT_BY_ROLE')}
                roles={roles}
                value={select}
                onChange={onChangeSelect}
            />
        )
    }, [roles, classes, t, select, onChangeSelect]);

    const renderRows = useCallback(() => {
        if (!userList || !userList.length) {
            return null;
        }

        return filterUsers().map((user) => {
            return (
                <UserListItem
                    key={user.userId}
                    user={user}
                    classes={classes}
                    navigateToUserDetails={navigateToUserDetails}
                />
            );
        })
    }, [userList, classes, navigateToUserDetails, filterUsers]);

    return (
        <Container className={classes.root}>
            <Grid className={classes.searchBox}>
                <FilterInput
                    className={classes.search}
                    value={inputFilter}
                    label={t('FILTER')}
                    onChange={onChangeHandler}
                />
                {roles ? renderSelect() : null}
            </Grid>
            <List className={classes.container}>
                <ListItem divider>
                    <Grid container className={classes.userListContainer}>
                        <Grid item xs={4} md={2}>
                            <Typography className={classes.userItemTitle}>
                                {t('FIRST_NAME')}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Typography className={classes.userItemTitle}>
                                {t('LAST_NAME')}
                            </Typography>
                        </Grid>
                        <Hidden smDown>
                            <Grid item xs={3} md={2}>
                                <Typography className={classes.userItemTitle}>
                                    {t('EMAIL')}
                                </Typography>
                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <Grid item xs={3} md={2}>
                                <Typography className={classes.userItemTitle}>
                                    {t('NUMBER')}
                                </Typography>
                            </Grid>
                        </Hidden>
                        <Grid item xs={4} md={2}>
                            <Typography className={classes.userItemTitle}>
                                {t('ROLE')}
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
                    to='/create-user'>
                    <PersonAddIcon className={classes.addUser}/>
                    {t('CREATE')}
                </Button>
            </Grid>
        </Container>
    );
};

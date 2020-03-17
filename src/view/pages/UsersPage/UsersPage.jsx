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
import {FilterInput} from "../../components/Filter/FilterInput/FilterInput";
import {filter} from "../../../utils/helpers";
import {USER_URLS} from '../../../constants/urls';
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles(usersPageStyle);

export const UsersPage = ({history}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [userList, setUserList] = useState([]);
    const [inputFilter, setInputFilter] = useState('');
    const { t } = useTranslation('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                dispatch(setIsLoading(true));
                const response = await UserService.list();
                setUserList(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
            }
        };
        fetchUsers();
    }, [dispatch]);

    const navigateToUserDetails = useCallback((userId) => {
        history.push(`${USER_URLS.USERS}/${userId}`)
    }, [history]);


    const onChangeHandler = useCallback((event) => {
        const {value} = event.target;
        setInputFilter(value)
    }, []);


    const renderRows = useCallback(() => {
        if (!userList || !userList.length) {
            return null;
        }
        return filter(userList, inputFilter).map((user) => {
                return (
                    <UserListItem
                        key={user.userId}
                        user={user}
                        classes={classes}
                        navigateToUserDetails={navigateToUserDetails}
                    />
                );
            })
    }, [userList, classes, navigateToUserDetails, inputFilter]);

    return (
        <Container className={classes.root}>
            <FilterInput
                className={classes.search}
                value={inputFilter}
                label={t('FILTER')}
                onChange={onChangeHandler}
            />
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
                    to='/create-user'
                >
                    <PersonAddIcon className={classes.addUser}/>
                    {t('CREATE')}
                </Button>
            </Grid>
        </Container>
    );
};

import React, {useCallback, useState} from 'react';
import {Link} from "react-router-dom";
import {
    Button,
    Container,
    List,
    ListItem,
    Grid,
    Typography,
    makeStyles,
    useMediaQuery
} from '@material-ui/core';
import {usersPageStyle} from "./UsersPage.style";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {UserListItem} from "./UserListItem/UserListItem";
import {InputFilter} from "../../components/Filter/InputFilter";
import {filter} from "../../../utils/helpers";
import {API_URLS} from '../../../constants/api_urls';
import {useTranslation} from 'react-i18next';
import {SelectFilter} from "../../components/Filter/SelectFilter";
import {useManagers, useRoles} from '../../../utils/hooks/userHooks';
import {USERS, USERS_CREATE} from "../../../constants/routes";

const useStyles = makeStyles(usersPageStyle);

export const UsersPage = ({history}) => {
    const classes = useStyles();
    const {t} = useTranslation('');

    const {managers} = useManagers();
    const minWidth600 = useMediaQuery('(min-width:600px)');
    const {roles} = useRoles();
    const [inputFilter, setInputFilter] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const navigateToUserDetails = useCallback((userId) => {
        history.push(`${USERS}/${userId}`)
    }, [history]);

    const onFilterChangedHandler = useCallback((event) => {
        const {value} = event.target;
        setInputFilter(value)
    }, []);

    const onSelectHandler = useCallback((event) => {
        const {value} = event.target;
        setSelectedOption(value);
    }, []);

    const filterUsers = useCallback(() => {
        let filteredUsers = filter(managers, inputFilter);

        if (!selectedOption) {
            return filteredUsers;
        }

        return filter(filteredUsers, selectedOption, ['role']);
    }, [inputFilter, selectedOption, managers]);

    const renderSelect = useCallback(() => {
        return (
            <SelectFilter
                classes={classes}
                label={t('SORT_BY_ROLE')}
                roles={roles}
                value={selectedOption}
                onChange={onSelectHandler}
            />
        )
    }, [roles, classes, t, selectedOption, onSelectHandler]);

    const renderRows = useCallback(() => {
        if (!managers || !managers.length) {
            return null;
        }

        return filterUsers().map((user) => {
            return (
                <UserListItem
                    minWidth={minWidth600}
                    key={user.userId}
                    user={user}
                    classes={classes}
                    navigateToUserDetails={navigateToUserDetails}
                />
            );
        })
    }, [managers, classes, navigateToUserDetails, filterUsers, minWidth600]);

    return (
        <Container className={classes.root}>
            <Grid  className={classes.searchBox}>
                <InputFilter
                    classes={classes}
                    value={inputFilter}
                    label={t('FILTER')}
                    onChange={onFilterChangedHandler}
                />
                {roles ? renderSelect() : null}
            </Grid>
            <List>
                <ListItem disableGutters divider>
                    <Grid container className={classes.gridUserContainer}>
                        <Grid item xl={3} lg={3} md={3} sm={3} >
                            <Typography>{t('FIRST_NAME')}</Typography>
                        </Grid>
                        <Grid item xl={3} lg={3} md={3} sm={3} >
                            <Typography>{t('LAST_NAME')}</Typography>
                        </Grid>
                        <Grid item xl={4} ld={4} md={4} sm={4} >
                            <Typography>{t('NUMBER')}</Typography>
                        </Grid>
                        <Grid item xl={2} ld={2} md={2} sm={2} >
                            <Typography>{t('ROLE')}</Typography>
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
                    to={USERS_CREATE}>
                    <PersonAddIcon className={classes.addUser}/>
                    {t('CREATE')}
                </Button>
            </Grid>
        </Container>
    );
};

import React from 'react';
import {Grid, Hidden, ListItem, Typography} from "@material-ui/core";
import {ROLES} from "../../../../constants/statuses";
import {useTranslation} from "react-i18next";

export const UserListItem = (props) =>{

    const {
        user,
        classes,
        navigateToUserDetails
    } = props;
    const {t} = useTranslation();

    return (
        <ListItem className={classes.userListItem} divider onClick={() => navigateToUserDetails(user.userId)}>
            <Grid container className={classes.userListContainer}>
                <Grid item xs={4} md={2}>
                    <Typography className={classes.userItem} variant={'body2'}>
                        {user.firstName}
                    </Typography>
                </Grid>
                <Grid item xs={4} md={2}>
                    <Typography className={classes.userItem} variant={'body2'}>
                        {user.lastName}
                    </Typography>
                </Grid>
                <Hidden smDown>
                    <Grid item xs={3} md={2}>
                        <Typography className={classes.userItem} variant={'body2'}>
                            {user.email}
                        </Typography>
                    </Grid>
                </Hidden>
                <Hidden smDown>
                    <Grid item xs={3} md={2}>
                        <Typography className={classes.userItem} variant={'body2'}>
                            {user.contactNumber}
                        </Typography>
                    </Grid>
                </Hidden>
                <Grid item xs={4} md={2}>
                    <Typography className={classes.userItem} variant={'body2'}>
                       {t(ROLES[user.role.name])}
                    </Typography>
                </Grid>
            </Grid>
        </ListItem>
    )
};

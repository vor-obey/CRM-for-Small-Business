import React from 'react';
import {Grid, ListItem, Typography} from "@material-ui/core";
import {ROLES} from "../../../../constants/statuses";
import {useTranslation} from "react-i18next";
import ListItemText from "@material-ui/core/ListItemText";

export const UserListItem = (props) =>{

    const {
        user,
        classes,
        minWidth,
        navigateToUserDetails
    } = props;
    const {t} = useTranslation();

    return (
        <ListItem key={user.userId} disableGutters divider button
                  onClick={() => navigateToUserDetails(user.userId)}>
            <Grid container>
                <Grid item xl={3} lg={3} md={3} sm={3} xs={12} className={classes.gridList}>
                    <Typography className={classes.textList}>
                        {t('FIRST_NAME')}:
                    </Typography>
                    <ListItemText primary={user.firstName} secondary={minWidth && user.email}/>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={3} xs={12} className={classes.gridList}>
                    <Typography className={classes.textList}>
                        {t('LAST_NAME')}:
                    </Typography>
                    <ListItemText primary={user.lastName}/>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={12} className={classes.gridNumber}>
                    <ListItemText primary={user.contactNumber}/>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={12} className={classes.gridList}>
                    <Typography className={classes.textList}>
                        {t('ROLE')}:
                    </Typography>
                    <ListItemText primary={t(ROLES[user.role.name.toUpperCase()])} />
                </Grid>
            </Grid>
        </ListItem>
    )
};

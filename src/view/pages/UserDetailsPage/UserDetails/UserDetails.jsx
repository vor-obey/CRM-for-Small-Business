import React from 'react';
import {Grid, List, ListItem, Typography} from "@material-ui/core";

export const UserDetails = (props) => {

    const {userDetails, classes} = props;

    return  (
        <Grid className={classes.root}>
            <List className={classes.containerList}>
                <ListItem className={classes.container}>
                    <Grid
                        item
                        direction={'column'}
                        justify={'space-around'}
                        xs={12} sm={6}>
                        <Grid item xs={12} md={12} className={classes.userItem}>
                            <Typography variant="h6">
                                First Name
                            </Typography>
                            <Typography variant="body1">
                                {userDetails.firstName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} className={classes.userItem}>
                            <Typography variant="h6">
                                Last Name
                            </Typography>
                            <Typography variant="body1">
                                {userDetails.lastName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} className={classes.userItem}>
                            <Typography variant="h6">
                                Middle Name
                            </Typography>
                            <Typography variant="body1">
                                {userDetails.middleName}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        justify={'space-around'}
                        direction={'column'}
                        xs={12} sm={6}>
                        <Grid item xs={12} md={12} className={classes.userItem}>
                            <Typography variant="h6">
                                Email Address
                            </Typography>
                            <Typography variant="body1">
                                {userDetails.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} className={classes.userItem} >
                            <Typography variant="h6">
                                Contact number
                            </Typography>
                            <Typography variant="body1">
                                {userDetails.contactNumber}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} className={classes.userItem}>
                            <Typography variant="h6">
                                Role
                            </Typography>
                            <Typography variant="body1">
                                {userDetails.role.name}
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
        </Grid>
    )
};

import React from 'react';
import {Grid, Typography} from "@material-ui/core";

export const UserDetails = (props) => {

    const {userDetails, classes} = props;

    return  (
        <Grid className={classes.root}>
            <Grid item container direction={'column'} xs={12} sm={3}>
                <Grid className={classes.userItem}>
                    <Typography variant="body1">
                        First Name
                    </Typography>
                    <Typography className={classes.userTypography} variant="body2">
                        {userDetails.firstName}
                    </Typography>
                </Grid>
                <Grid className={classes.userItem}>
                    <Typography variant="body1">
                        Last Name
                    </Typography>
                    <Typography className={classes.userTypography} variant="body2">
                        {userDetails.lastName}
                    </Typography>
                </Grid>
                <Grid className={classes.userItem}>
                    <Typography variant="body1">
                        Middle Name
                    </Typography>
                    <Typography className={classes.userTypography} variant="body2">
                        {userDetails.middleName}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container direction={'column'} xs={12} sm={3}>
                <Grid className={classes.userItem}>
                    <Typography variant="body1">
                        Email Address
                    </Typography>
                    <Typography className={classes.userTypography} variant="body2">
                        {userDetails.email}
                    </Typography>
                </Grid>
                <Grid className={classes.userItem} >
                    <Typography variant="body1">
                        Contact number
                    </Typography>
                    <Typography className={classes.userTypography} variant="body2">
                        {userDetails.contactNumber}
                    </Typography>
                </Grid>
                <Grid className={classes.userItem}>
                    <Typography variant="body1">
                        Role
                    </Typography>
                    <Typography className={classes.userTypography} variant="body2">
                        {userDetails.role.name}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
};

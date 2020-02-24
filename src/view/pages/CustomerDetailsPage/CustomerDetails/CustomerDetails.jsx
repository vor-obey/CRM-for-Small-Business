import React from 'react';
import {Grid, List, ListItem, Typography} from "@material-ui/core";

export const CustomerDetails = (props) => {

    const {customerDetails, classes} = props;

    return (
        <Grid className={classes.root}>
            <List className={classes.containerList}>
                <ListItem className={classes.container}>
                    <Grid
                        item
                        direction={'column'}
                        justify='space-around'
                        xs={12} sm={6}>
                        <Grid item xs={12} md={12} className={classes.customerItem}>
                            <Typography variant="h6">
                                Username
                            </Typography>
                            <Typography variant="body1">
                                {customerDetails.username}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} className={classes.customerItem}>
                            <Typography variant="h6">
                                Name
                            </Typography>
                            <Typography variant="body1">
                                {customerDetails.name}
                            </Typography>
                        </Grid>
                        {customerDetails.source.name ? (
                            <Grid item xs={12} md={12} className={classes.customerItem}>
                                <Typography variant="h6">
                                    Source
                                </Typography>
                                <Typography variant="body1">
                                    {customerDetails.source.name}
                                </Typography>
                            </Grid>)
                            : null
                        }
                    </Grid>
                    <Grid
                        item
                        justify={'space-around'}
                        direction={'column'}
                        xs={12} sm={6}>
                        <Grid item xs={12} md={12} className={classes.customerItem}>
                            <Typography variant="h6">
                                Email Address
                            </Typography>
                            <Typography variant="body1">
                                {customerDetails.contactEmail}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} className={classes.customerItem}>
                            <Typography variant="h6">
                                Contact number
                            </Typography>
                            <Typography variant="body1">
                                {customerDetails.contactNumber}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} className={classes.customerItem}>
                            <Typography variant="h6">
                                Details
                            </Typography>
                            <Typography variant="body1">
                                {customerDetails.details}
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
        </Grid>
    )
};

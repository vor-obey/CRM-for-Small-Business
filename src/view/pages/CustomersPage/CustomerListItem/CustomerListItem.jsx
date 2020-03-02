import React from 'react';
import {Grid, Hidden, ListItem, Typography} from "@material-ui/core";

export const CustomerListItem = (props) => {

    const {
        customer,
        classes,
        navigateToCustomerDetails
    } = props;

    return (
        <ListItem className={classes.customerBlock}
                  divider
                  style={{cursor: 'pointer'}}
                  onClick={() => navigateToCustomerDetails(customer.customerId)} >
            <Grid container className={classes.customerListContainer}>
                <Grid item xs={5} md={2}>
                    <Typography className={classes.customerItem} variant={'body2'}>
                        {customer.username}
                    </Typography>
                </Grid>
                <Grid item xs={5} md={2}>
                    <Typography className={classes.customerItem} variant={'body2'}>
                        {customer.name}
                    </Typography>
                </Grid>
                <Hidden smDown>
                    <Grid item xs={3} md={2}>
                        <Typography className={classes.customerItem} variant={'body2'}>
                            {customer.contactNumber}
                        </Typography>
                    </Grid>
                </Hidden>
                <Hidden smDown>
                    <Grid item xs={3} md={2}>
                        <Typography className={classes.customerItem} variant={'body2'}>
                            {customer.contactEmail}
                        </Typography>
                    </Grid>
                </Hidden>
            </Grid>
        </ListItem>
    )
};

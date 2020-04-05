import React from 'react';
import {Grid, ListItem, Typography} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";

export const CustomerListItem = (props) => {

    const {
        t,
        customer,
        classes,
        minWidth,
        navigateToCustomerDetails
    } = props;

    return (
        <ListItem key={customer.customerId} disableGutters divider button
                  onClick={() => navigateToCustomerDetails(customer.customerId)}>
            <Grid container>
                <Grid item xl={5} lg={5} md={5} sm={5} xs={12} className={classes.gridList}>
                    <Typography className={classes.textList}>
                        {t('USERNAME')}:
                    </Typography>
                    <ListItemText primary={customer.username} secondary={minWidth && customer.contactEmail}/>
                </Grid>
                <Grid item xl={5} lg={5} md={5} sm={4} xs={12} className={classes.gridList}>
                    <Typography className={classes.textList}>
                        {t('NAME')}:
                    </Typography>
                    <ListItemText primary={customer.name}/>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={3} xs={12} className={classes.gridList}>
                    <Typography className={classes.textList}>
                        {t('NUMBER')}:
                    </Typography>
                    <ListItemText primary={customer.contactNumber} />
                </Grid>
            </Grid>
        </ListItem>
    )
};

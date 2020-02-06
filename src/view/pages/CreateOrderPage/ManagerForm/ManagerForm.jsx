import React from "react";
import {Divider, Grid, Typography} from "@material-ui/core";

export const ManagerForm = (props) => {
    const {classes} = props;
    return (
        <>
            <Grid item xl={12} xs={12}>
                <Typography className={classes.textOrder} variant='h4'>
                    Manager
                </Typography>
                <Divider/>
            </Grid>
            <Grid item lg={12} xs={2} className={classes.gridCustomers}>
                {/*   manager autocomplete */}
            </Grid>
        </>
    );
};
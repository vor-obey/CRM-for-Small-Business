import React from 'react';
import {Grid, Typography} from "@material-ui/core";

export const OrganizationDetails = ({
                                        t,
                                        owner,
                                        classes,
                                        organizationDetails
                                    }) => {
    return (
        <Grid className={classes.root}>
            <Grid item container direction={'column'} xs={12} sm={6}>
                <Grid className={classes.organizationItem}>
                    <Typography variant="body1">
                        {t('ORGANIZATION_NAME')}
                    </Typography>
                    <Typography className={classes.organizationTypography} variant="body2">
                        {organizationDetails && organizationDetails.name}
                    </Typography>
                </Grid>
                <Grid className={classes.organizationItem}>
                    <Typography variant="body1">
                        {t('NP_API')}
                    </Typography>
                    <Typography className={classes.organizationTypography} variant="body2">
                        {organizationDetails.apiKeyNP}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container direction={'column'} xs={12} sm={6}>
                <Grid className={classes.organizationItem}>
                    <Typography variant="body1">
                        {t('OWNER_NAME')}
                    </Typography>
                    <Typography className={classes.organizationTypography} variant="body2">
                        {`${owner && owner.firstName} ${owner && owner.lastName}`}
                    </Typography>
                </Grid>
                <Grid className={classes.organizationItem}>
                    <Typography variant="body1">
                        {t('NUMBER')}
                    </Typography>
                    <Typography className={classes.organizationTypography} variant="body2">
                        {owner && owner.contactNumber}
                    </Typography>
                </Grid>
                <Grid className={classes.organizationItem}>
                    <Typography variant="body1">
                        {t('EMAIL')}
                    </Typography>
                    <Typography className={classes.organizationTypography} variant="body2">
                        {owner && owner.email}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

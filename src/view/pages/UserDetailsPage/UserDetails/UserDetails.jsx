import React from 'react';
import {Grid, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {ROLES} from "../../../../constants/statuses";

export const UserDetails = (props) => {
    const { t } = useTranslation('');

    const {userDetails, classes} = props;

    return  (
        <Grid className={classes.root}>
            <Grid item container direction={'column'} xs={12} sm={6}>
                <Grid className={classes.userItem}>
                    <Typography variant="body1">
                        {t('FIRST_NAME')}
                    </Typography>
                    <Typography className={classes.userTypography} variant="body2">
                        {userDetails.firstName}
                    </Typography>
                </Grid>
                <Grid className={classes.userItem}>
                    <Typography variant="body1">
                        {t('LAST_NAME')}
                    </Typography>
                    <Typography className={classes.userTypography} variant="body2">
                        {userDetails.lastName}
                    </Typography>
                </Grid>
                <Grid className={classes.userItem}>
                    <Typography variant="body1">
                        {t('MIDDLE_NAME')}
                    </Typography>
                    <Typography className={classes.userTypography} variant="body2">
                        {userDetails.middleName}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container direction={'column'} xs={12} sm={6}>
                <Grid className={classes.userItem}>
                    <Typography variant="body1">
                        {t('EMAIL')}
                    </Typography>
                    <Typography className={classes.userTypography} variant="body2">
                        {userDetails.email}
                    </Typography>
                </Grid>
                <Grid className={classes.userItem} >
                    <Typography variant="body1">
                        {t('NUMBER')}
                    </Typography>
                    <Typography className={classes.userTypography} variant="body2">
                        {userDetails.contactNumber}
                    </Typography>
                </Grid>
                <Grid className={classes.userItem}>
                    <Typography variant="body1">
                        {t('ROLE')}
                    </Typography>
                    <Typography className={classes.userTypography} variant="body2">
                        {t(ROLES[userDetails.role.name.toUpperCase()])}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
};

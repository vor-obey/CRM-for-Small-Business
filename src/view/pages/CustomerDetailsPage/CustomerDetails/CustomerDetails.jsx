import React from 'react';
import {Grid, Link, List, ListItem, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";

export const CustomerDetails = (props) => {
    const { t } = useTranslation('');

    const {customerDetails, classes} = props;

    return (
        <Grid className={classes.root}>
            <List className={classes.containerList}>
                <ListItem className={classes.container}>
                    <Grid
                        container
                        item
                        direction={'column'}
                        justify='space-around'
                        xs={12} sm={6}>
                        <Grid item xs={12} md={12} className={classes.customerItem}>
                            <Typography variant="h6">
                                {t('USERNAME')}
                            </Typography>
                            <Typography variant="body1">
                                {customerDetails.username}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} className={classes.customerItem}>
                            <Typography variant="h6">
                                {t('FULL_NAME')}
                            </Typography>
                            <Typography variant="body1">
                                {customerDetails.name}
                            </Typography>
                        </Grid>
                        {customerDetails.name ? (
                            <Grid item xs={12} md={12} className={classes.customerItem}>
                                <Typography variant="h6">
                                    {t('SOURCES')}
                                </Typography>
                                <Typography variant="body1">
                                    {customerDetails.name}
                                </Typography>
                            </Grid>)
                            : null
                        }
                    </Grid>
                    <Grid
                        container
                        item
                        justify={'space-around'}
                        direction={'column'}
                        xs={12} sm={6}>
                        <Grid item xs={12} md={12} className={classes.customerItem}>
                            <Typography variant="h6">
                                {t('EMAIL')}
                            </Typography>
                            <Typography variant="body1">
                                <Link href={`mail:${customerDetails.contactEmail}`}>{customerDetails.contactEmail}</Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} className={classes.customerItem}>
                            <Typography variant="h6">
                                {t('NUMBER')}
                            </Typography>
                            <Typography variant="body1">
                                <Link href={`tel:${customerDetails.contactNumber}`}>{customerDetails.contactNumber}</Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} className={classes.customerItem}>
                            <Typography variant="h6">
                                {t('DETAILS')}
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

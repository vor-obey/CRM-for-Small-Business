import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import EditIcon from "@material-ui/icons/Edit";
import {OrganizationDetailsStyle} from "./OrganizationDetailsPage.style";
import {OrganizationDetails} from "./OrganizationDetails/OrganizationDetails";
import {Container, Fab, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import {useOrganizationDetailsById} from '../../../utils/hooks/organizationHooks';
import isEmpty from 'lodash/isEmpty';
import {Integrations} from '../../components/Integrations/Integrations';

const useStyles = makeStyles(OrganizationDetailsStyle);

export const OrganizationDetailsPage = ({
                                            history
                                        }) => {

    const {id} = useParams();
    const classes = useStyles();
    const {t} = useTranslation('');
    const [organizationDetails,, triggerOrganizationDetailsUpdate] = useOrganizationDetailsById(id);
    const currentUser = useSelector(state => state.userReducer.currentUser);

    const renderOrganizationDetails = useCallback(() => {
        if (isEmpty(organizationDetails)) {
            return null;
        }

        return <OrganizationDetails
            t={t}
            classes={classes}
            owner={currentUser}
            organizationDetails={organizationDetails}
        />
    }, [organizationDetails, currentUser, classes, t]);

    const handleClickEdit = useCallback(() => {
        history.push(`${id}/edit`);
    }, [id, history]);

    return (
        <Container maxWidth='md' className={classes.container}>
            <Paper className={classes.paper}>
                <Grid container item xs={12} className={classes.organizationGrid}>
                    <Grid item xs={12}>
                        <Typography variant="h5" className={classes.title}>
                            {t('ORGANIZATION_DETAILS')}
                        </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        {renderOrganizationDetails()}
                    </Grid>
                    <Integrations
                        classes={classes}
                        organization={organizationDetails}
                        triggerOrganizationDetailsUpdate={triggerOrganizationDetailsUpdate}
                    />
                    <Grid container item xs={12} className={classes.buttonContainer}>
                        <Fab
                            onClick={handleClickEdit}
                            className={classes.buttonFab}
                            color="primary"
                            aria-label="edit"
                            size="small">
                            <EditIcon/>
                        </Fab>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
};

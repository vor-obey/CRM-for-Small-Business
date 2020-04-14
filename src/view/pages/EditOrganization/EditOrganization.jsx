import React, {useCallback} from 'react';
import Grid from "@material-ui/core/Grid";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import BusinessIcon from "@material-ui/icons/Business";
import {EditOrganizationStyle} from "./EditOrganization.style";
import {useOrganizationDetailsById} from "../../../utils/customHooks";
import {makeStyles, Avatar, Container, Button, CssBaseline, Typography} from "@material-ui/core";
import {SaveOrganizationForm} from "../../components/SaveOrganization/SaveOrganizationForm";
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {OrganizationService} from '../../../services/index';
import {useDispatch} from 'react-redux';
import {getCurrentUser} from '../../../data/store/user/userActions';

const useStyles = makeStyles(EditOrganizationStyle);

export const EditOrganization = ({history}) => {
    const {id} = useParams();
    const {t} = useTranslation();
    const classes = useStyles();
    const [organizationDetails, setOrganizationDetails] = useOrganizationDetailsById(id);
    const dispatch = useDispatch();

    const onSubmitHandler = useCallback(async (event) => {
        event.preventDefault();
        try {
            dispatch(setIsLoading(true));
            const {organizationId, name, apiKeyNP} = organizationDetails;
            const response = await OrganizationService.update({
                organizationId,
                name,
                apiKeyNP
            });
            if (response.success) {
                await dispatch(getCurrentUser());
                history.push(`/organizations/${organizationId}`);
            } else {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        }
    }, [organizationDetails, dispatch, history]);

    const onChangeHandler = useCallback((event) => {
        const {name, value} = event.target;
        setOrganizationDetails(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }, [setOrganizationDetails]);

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <BusinessIcon/>
                </Avatar>
                <Typography component="h1" variant="h5" className={classes.text}>
                    {t('EDIT_ORGANIZATION')}
                </Typography>
                <form className={classes.form} onSubmit={onSubmitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <SaveOrganizationForm
                                onChangedInput={onChangeHandler}
                                organization={organizationDetails}
                                classes={classes}
                                isEdit={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button
                            className={classes.submit}
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            {t('EDIT')}</Button>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};
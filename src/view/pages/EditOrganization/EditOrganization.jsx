import React, {useCallback} from 'react';
import Grid from "@material-ui/core/Grid";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import BusinessIcon from "@material-ui/icons/Business";
import {EditOrganizationStyle} from "./EditOrganization.style";
import {makeStyles, Avatar, Container, Button, CssBaseline, Typography} from "@material-ui/core";
import {SaveOrganizationForm} from "../../components/SaveOrganization/SaveOrganizationForm";
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {OrganizationService} from '../../../services/index';
import {useDispatch} from 'react-redux';
import {getCurrentUser} from '../../../data/store/user/userActions';
import {useOrganizationDetailsById} from '../../../utils/hooks/organizationHooks';

const useStyles = makeStyles(EditOrganizationStyle);

export const EditOrganization = ({history}) => {
    const {id} = useParams();
    const {t} = useTranslation();
    const classes = useStyles();
    const {organizationDetails, setOrganizationDetails} = useOrganizationDetailsById(id);
    const dispatch = useDispatch();

    const validateDetails = useCallback(({name, apiKeyNP}) => {
        const errors = [];
        if (name.length < 3) {
            errors.push(<span key={1} style={{display: 'block'}}>{t('ERROR_NAME_LENGTH')}</span>)
        }
        if (apiKeyNP.length > 0 && apiKeyNP.length > 32) {
            errors.push(<span key={2} style={{display: 'block'}}>{t('ERROR_API_LENGTH')}</span>)
        }
        if (!errors.length) {
            return true;
        }
        dispatch(setSnackBarStatus({isOpen: true, message: errors, success: false}));
        return false;
    }, [dispatch, t]);

    const onSubmitHandler = useCallback(async (event) => {
        event.preventDefault();
        const isValid = validateDetails(organizationDetails);
        if (isValid) {
            try {
                dispatch(setIsLoading(true));
                const {organizationId, name, apiKeyNP} = organizationDetails;
                const response = await OrganizationService.update({
                    organizationId,
                    name,
                    apiKeyNP,
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
        }
    }, [organizationDetails, dispatch, history, validateDetails]);

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
                            {t('SAVE')}</Button>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

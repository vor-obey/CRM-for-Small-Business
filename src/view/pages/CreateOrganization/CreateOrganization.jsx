import React, {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {OrganizationService} from "../../../services";
import {Avatar, Button, Container, CssBaseline, Typography} from "@material-ui/core";
import BusinessIcon from '@material-ui/icons/Business';
import {makeStyles} from "@material-ui/core/styles";
import {saveOrganizationStyle} from "../../components/SaveOrganization/SaveOrganizationStyle";
import {SaveOrganizationForm} from "../../components/SaveOrganization/SaveOrganizationForm";
import {SaveUserDetails} from "../../components/SaveUser/SaveUserDetails/SaveUserDetails";
import {SaveUserCredentials} from "../../components/SaveUser/SaveUserCredentials/SaveUserCredentials";
import Grid from "@material-ui/core/Grid";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(saveOrganizationStyle);

export const CreateOrganization = ({history}) => {
    const {t} = useTranslation('');
    const dispatch = useDispatch();
    const classes = useStyles();
    const [organization, setOrganization] = useState({
        name: '',
        apiKeyNP: '',
        codeValue: '',
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        contactNumber: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const onSubmitHandler = useCallback(async (event) => {
        event.preventDefault();
        const {confirmPassword, ...org} = organization;
        if (organization.password !== confirmPassword) {
            dispatch(setSnackBarStatus({isOpen: true, message: t('PASSWORD_DOESNT_MATCH'), success: false}))
        } else if (organization.name.length < 3) {
            dispatch(setSnackBarStatus({isOpen: true, message: t('ERROR_NAME_LENGHT'), success: false}))
        } else if (organization.apiKeyNP.length < 32 || organization.apiKeyNP.length > 32) {
            dispatch(setSnackBarStatus({isOpen: true, message: t('ERROR_API_LENGHT'), success: false}))
        } else if (organization.contactNumber.length < 10 || organization.contactNumber.length > 12) {
            dispatch(setSnackBarStatus({isOpen: true, message: t('INVALID_NUMBER'), success: false}))
        } else {
            try {
                dispatch(setIsLoading(true));
                const response = await OrganizationService.create(org);
                if (response.success) {
                    dispatch(setIsLoading(false));
                    history.push('/');
                } else {
                    dispatch(setIsLoading(false));
                    dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
                }
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
            }
        }
    }, [t, dispatch, organization, history]);


    const onChangeHandler = useCallback((event) => {
        const {name, value} = event.target;
        setOrganization(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }, []);

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(prevState => !prevState)
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <BusinessIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('CREATE_ORGANIZATION')}
                </Typography>
                <form className={classes.form} onSubmit={onSubmitHandler}>
                    <SaveOrganizationForm
                        classes={classes}
                        organization={organization}
                        onChangedInput={onChangeHandler}
                    />
                    <Typography className={classes.user} component="h1" variant="h6">
                        {t('CREATE_ADMIN')}
                    </Typography>
                    <SaveUserDetails
                        userDetails={organization}
                        onChangedInput={onChangeHandler}
                        classes={classes}
                        renderRoles={false}
                    />
                    <Grid item xs={12} sm={12} className={classes.cred}>
                        <SaveUserCredentials
                            credentials={organization}
                            showPassword={showPassword}
                            toggleShowPassword={handleClickShowPassword}
                            onChangedInput={onChangeHandler}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button
                            className={classes.submit}
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            {t('CREATE')}</Button>
                    </Grid>
                </form>
            </div>
        </Container>
    )
};

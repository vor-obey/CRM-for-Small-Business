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

    const validateDetails = useCallback(({
                                             password,
                                             confirmPassword,
                                             name,
                                             apiKeyNP,
                                             contactNumber
                                         }) => {
        const errors = [];
        if (password !== confirmPassword) {
            errors.push(<span key={1} style={{display: 'block'}}>{t('PASSWORD_DOESNT_MATCH')}</span>)
        }
        if (name.length < 3) {
            errors.push(<span key={2} style={{display: 'block'}}>{t('ERROR_NAME_LENGTH')}</span>)
        }
        if (apiKeyNP.length > 0 && apiKeyNP.length > 32) {
            errors.push(<span key={3} style={{display: 'block'}}>{t('ERROR_API_LENGTH')}</span>)
        }
        if (contactNumber.length < 10 || contactNumber.length > 12) {
            errors.push(<span key={4} style={{display: 'block'}}>{t('INVALID_NUMBER')}</span>)
        }
        if (!errors.length) {
            return true;
        }
        dispatch(setSnackBarStatus({isOpen: true, message: errors, success: false}));
        return false;
    }, [dispatch, t]);

    const onSubmitHandler = useCallback(async (event) => {
        event.preventDefault();
        const isValid = validateDetails(organization);
        if (isValid) {
            try {
                dispatch(setIsLoading(true));
                const {confirmPassword, ...org} = organization;
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
    }, [dispatch, organization, history, validateDetails]);


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
                        isEdit={false}
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

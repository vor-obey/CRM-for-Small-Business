import React, {useCallback, useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {SaveIntegration} from '../SaveIntegration/SaveIntegration';
import Typography from "@material-ui/core/Typography";
import IntegrationService from '../../../services/IntegrationService';
import {useDispatch} from 'react-redux';
import {closeModal, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {TextField} from '@material-ui/core';
import {InstagramService} from '../../../services';
import {useTranslation} from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import {getCurrentUser} from '../../../data/store/user/userActions';

export const CreateIntegration = ({
                                      classes,
                                      triggerOrganizationDetailsUpdate
                                  }) => {
    const [creds, setCreds] = useState({
        username: '',
        password: '',
        type: ''
    });
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [codeForm, setCodeForm] = useState({
        isOpen: false,
        type: ''
    });
    const [verificationCode, setVerificationCode] = useState('');
    const [twoFactorLoginData, setTwoFactorLoginData] = useState({});
    const {t} = useTranslation('');

    const onChangedHandler = useCallback((name, value) => {
        setCreds(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    }, []);

    const onSubmit = useCallback(async () => {
        if (!creds.username.length || !creds.password.length || !creds.type.length) {
            dispatch(setSnackBarStatus({
                isOpen: true,
                message: t('FILL_ALL_THE_FIELDS'),
                success: false
            }));
            return;
        }
        if (creds.type === 'instagram') {
            try {
                setLoading(true);
                const {success, message, data} = await IntegrationService.create(creds);
                if (success) {
                    setLoading(false);
                    dispatch(closeModal());
                    dispatch(setSnackBarStatus({
                        isOpen: true,
                        message: `IG account ${creds.username} was successfully integrated`,
                        success: true
                    }));
                    triggerOrganizationDetailsUpdate();
                    dispatch(getCurrentUser());
                } else {
                    setLoading(false);
                    switch (message) {
                        case 'CHALLENGE_REQUIRED': {
                            setCodeForm({
                                isOpen: true,
                                type: 'email'
                            });
                            break;
                        }
                        case '2FA_REQUIRED': {
                            setCodeForm({
                                isOpen: true,
                                type: '2FA'
                            });
                            setTwoFactorLoginData(data);
                            break;
                        }
                        case 'INVALID_USER': {
                            dispatch(setSnackBarStatus({
                                isOpen: true,
                                message: t('USERNAME_INCORRECT'),
                                success: false
                            }));
                            break;
                        }
                        case 'INVALID_PASSWORD': {
                            dispatch(setSnackBarStatus({
                                isOpen: true,
                                message: t('PASSWORD_INCORRECT'),
                                success: false
                            }));
                            break;
                        }
                        default: {
                            dispatch(setSnackBarStatus({
                                isOpen: true,
                                message,
                                success: false
                            }));
                            break;
                        }
                    }
                }
            } catch (e) {
                dispatch(setSnackBarStatus({
                    isOpen: true,
                    message: e.message,
                    success: false
                }));
            }
        }
    }, [creds, triggerOrganizationDetailsUpdate, dispatch, t]);

    const sendSecurityCode = useCallback(async () => {
        if (!verificationCode.length) {
            dispatch(setSnackBarStatus({isOpen: true, message: 'Incorrect code length', success: false}));
            return;
        }
        try {
            setLoading(true);
            const {success, message} = await InstagramService.sendSecurityCode({
                code: verificationCode,
                username: creds.username
            });
            if (success) {
                setLoading(false);
                setVerificationCode('');
                dispatch(closeModal());
                dispatch(setSnackBarStatus({
                    isOpen: true,
                    message: `IG account ${creds.username} was successfully integrated`,
                    success: true
                }));
                triggerOrganizationDetailsUpdate();
                dispatch(getCurrentUser());
            } else {
                setLoading(false);
                if (message === 'CHALLENGE_WRONG_CODE') {
                    dispatch(setSnackBarStatus({
                        isOpen: true,
                        message: t('CODE_SENT_AGAIN'),
                        success: false
                    }));
                } else {
                    dispatch(setSnackBarStatus({isOpen: true, message, success: false}));
                }
            }
        } catch (e) {
            setLoading(false);
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        }
    }, [creds.username, dispatch, verificationCode, triggerOrganizationDetailsUpdate, t]);

    const verify2FA = useCallback(async () => {
        if (!verificationCode.length) {
            dispatch(setSnackBarStatus({isOpen: true, message: 'Incorrect code length', success: false}));
            return;
        }
        try {
            setLoading(true);
            const {success, message} = await InstagramService.verify2FA({
                ...twoFactorLoginData,
                verificationCode
            });
            if (success) {
                setLoading(false);
                setVerificationCode('');
                dispatch(closeModal());
                dispatch(setSnackBarStatus({
                    isOpen: true,
                    message: `IG account ${creds.username} was successfully integrated`,
                    success: true
                }));
                triggerOrganizationDetailsUpdate();
                dispatch(getCurrentUser());
            } else {
                setLoading(false);
                if (message === 'CHALLENGE_WRONG_CODE') {
                    dispatch(setSnackBarStatus({
                        isOpen: true,
                        message: t('CODE_SENT_AGAIN'),
                        success: false
                    }));
                } else if (message === 'CHALLENGE_REQUIRED') {
                    setCodeForm({
                        isOpen: true,
                        type: 'email'
                    });
                    dispatch(setSnackBarStatus({
                        isOpen: true,
                        message,
                        success: false
                    }));
                } else {
                    dispatch(setSnackBarStatus({isOpen: true, message, success: false}));
                }
            }
        } catch (e) {
            setLoading(false);
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        }
    }, [creds.username, dispatch, twoFactorLoginData, verificationCode, triggerOrganizationDetailsUpdate, t]);

    const renderForms = useCallback(() => {
        const {isOpen, type} = codeForm;
        if (isOpen) {
            return (
                <>
                    <Grid container item xs={12}>
                        <Typography variant='h6'>
                            {t('CODE_SENT')}
                        </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        <TextField
                            label={t('VERIFICATION_CODE')}
                            name="verificationCode"
                            variant="outlined"
                            type="text"
                            value={verificationCode}
                            onChange={(event) => setVerificationCode(event.target.value)}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid container item xs={12} className={classes.buttonContainer}>
                        <Button
                            className={classes.button}
                            variant='outlined'
                            onClick={type === 'email' ? sendSecurityCode : verify2FA}
                        >
                            Send
                        </Button>
                    </Grid>
                </>
            );
        }

        return (
            <>
                <SaveIntegration
                    creds={creds}
                    onChangedHandler={onChangedHandler}
                />
                <Grid container item xs={12} className={classes.buttonContainer}>
                    <Button
                        className={classes.button}
                        variant='outlined'
                        onClick={onSubmit}
                    >
                        {t('SAVE')}
                    </Button>
                </Grid>
            </>
        );

    }, [t, classes, creds, codeForm, onChangedHandler, onSubmit, verificationCode, sendSecurityCode, verify2FA]);

    return (
        <Container maxWidth='xs'>
            <Grid container style={{marginTop: 14}}>
                <Typography variant="subtitle1" style={{marginBottom: 20}}>
                    {t('ADD_INTEGRATION')}
                </Typography>
                {loading ? (
                    <Grid container item xs={12} justify='center' alignItems='center' style={{paddingBottom: '20px'}}>
                        <CircularProgress/>
                    </Grid>
                ) : (renderForms())}
            </Grid>
        </Container>
    );
};
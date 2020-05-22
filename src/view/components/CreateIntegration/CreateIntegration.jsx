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

export const CreateIntegration = ({
                                      labels,
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

    const onChangedHandler = useCallback((event) => {
        const {name, value} = event.target;
        setCreds(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    }, []);

    const onSubmit = useCallback(async () => {
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
                                message: `The username you entered doesn't appear to belong to an account. Please check your username and try again.`,
                                success: false
                            }));
                            break;
                        }
                        case 'INVALID_PASSWORD': {
                            dispatch(setSnackBarStatus({
                                isOpen: true,
                                message: `The password you entered is incorrect. Please try again.`,
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
    }, [creds, triggerOrganizationDetailsUpdate, dispatch]);

    const sendSecurityCode = useCallback(async () => {
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
            } else {
                setLoading(false);
                if (message === 'CHALLENGE_WRONG_CODE') {
                    dispatch(setSnackBarStatus({
                        isOpen: true,
                        message: `Code was sent again to your email. Please try again`,
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
    }, [creds.username, dispatch, verificationCode]);

    const verify2FA = useCallback(async () => {
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
            } else {
                setLoading(false);
                if (message === 'CHALLENGE_WRONG_CODE') {
                    dispatch(setSnackBarStatus({
                        isOpen: true,
                        message: `Code was sent again. Please try again`,
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
    }, [creds.username, dispatch, twoFactorLoginData, verificationCode]);

    const renderForms = useCallback(() => {
        const {isOpen, type} = codeForm;
        console.log(codeForm);
        if (isOpen) {
            return (
                <>
                    <Grid container item xs={12}>
                        <Typography variant='h6'>
                            {type === 'email' ? 'Security code was sent to your email.' : 'Verification code was sent via SMS/TOTP'}
                        </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        <TextField
                            label='Verification Code'
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
                            {labels.actionButton}
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
                        {labels.actionButton}
                    </Button>
                </Grid>
            </>
        );

    }, [classes, creds, codeForm, labels, onChangedHandler, onSubmit, verificationCode, sendSecurityCode, verify2FA]);

    return (
        <Container maxWidth='xs'>
            <Grid container style={{marginTop: 20}}>
                <Typography variant="subtitle1" style={{marginBottom: 20}}>
                    {labels.title}
                </Typography>
                {loading ? (<div>loading</div>) : (renderForms())}
            </Grid>
        </Container>
    );
};
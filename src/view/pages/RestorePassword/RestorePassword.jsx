import React, {useCallback, useState} from "react";
import {RestorePasswordStyle} from './RestorePassword.style'
import {useParams} from 'react-router-dom';

import {
    Box,
    Button,
    Container, FormControl, IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core';
import {UserService} from "../../../services";
import {useTranslation} from "react-i18next";
import {Visibility, VisibilityOff} from "@material-ui/icons";

const useStyles = makeStyles(RestorePasswordStyle);

export const RestorePassword = ({history}) => {
    const {t} = useTranslation('');
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonText, setButtonText] = useState(t('SEND'));
    const {token} = useParams();

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(prevState => !prevState)
    }, []);

    const onPasswordInputChangedHandler = useCallback((event) => {
        setErrorMessage('');
        const {value} = event.target;
        setPassword(value);
    }, []);

    const onConfirmationPasswordInputChangedHandler = useCallback((event) => {
        setErrorMessage('');
        const {value} = event.target;
        setConfirmationPassword(value);
    }, []);


    const onSubmitHandler = useCallback(async (e) => {
        e.preventDefault();
        setButtonText(t('SENDING'));
        const response = await UserService.sendNewPassword({token, password});
        setButtonText(t('SEND'));
        if (response.success) {
            history.push('/')
        } else {
            setErrorMessage(t('ERROR'));
            setPassword('');
            setConfirmationPassword('');
        }
    }, [t, history, password, token]);

    const disableButton = useCallback(() => {
        if (password !== confirmationPassword) {
            return true;
        }
        return !password || !confirmationPassword;

    }, [confirmationPassword, password]);

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.root}>
                <Typography component="h1" variant="h5">
                    {t('RESTORE_PASSWORD')}
                </Typography>
                <form className={classes.form} onSubmit={onSubmitHandler}>
                    <FormControl
                        variant="outlined"
                        required
                        fullWidth
                        className={classes.input}
                    >
                        <InputLabel>{t('PASSWORD')}</InputLabel>
                        <OutlinedInput
                            autoFocus
                            required
                            name="password"
                            margin='normal'
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={onPasswordInputChangedHandler}
                            labelWidth={70}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        size='small'
                                        edge='end'>
                                        {showPassword ? <Visibility fontSize='small'/> :
                                            <VisibilityOff fontSize='small'/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        required
                        fullWidth
                        className={classes.input}
                    >
                        <InputLabel>{t('REPEAT_PASSWORD')}</InputLabel>
                        <OutlinedInput
                            autoFocus
                            required
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={confirmationPassword}
                            onChange={onConfirmationPasswordInputChangedHandler}
                            labelWidth={155}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        size='small'
                                        edge='end'>
                                        {showPassword ? <Visibility fontSize='small'/> :
                                            <VisibilityOff fontSize='small'/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={disableButton()}
                        className={classes.submit}
                    >
                        {buttonText}
                    </Button>
                </form>
                {confirmationPassword !== password ? (<Box>{t('PASSWORD_DOESNT_MATCH')}</Box>) : null}
                {errorMessage ? <div>{errorMessage}</div> : null}
            </div>
        </Container>
    )
};

export default RestorePassword;

import React, {useCallback, useState} from "react";
import {useDispatch} from "react-redux";

import {Avatar, Button, CssBaseline, TextField, Typography, Container, makeStyles} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {loginStyles} from './Login.style.js';
import {getCurrentUser, login} from "../../../data/store/user/userThunkAction";
import {setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(loginStyles);

export const Login = ({
                          history
                      }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {t} = useTranslation('');

    const [userLoginData, setUserLoginData] = useState({
        email: '',
        password: '',
    });

    const onChange = useCallback(async (event) => {
        const {name, value} = event.target;
        setUserLoginData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }, []);

    const onSubmitForm = useCallback(async (event) => {
        event.preventDefault();
        try {
            const {email, password} = userLoginData;
            await dispatch(login(email, password));
            await dispatch(getCurrentUser());
        } catch (e) {
            dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
        }
    }, [userLoginData, dispatch]);


    const handleClick = useCallback(() => {
        history.push('/forgot-password');
    }, [history]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('LOGIN')}
                </Typography>
                <form className={classes.form} onSubmit={onSubmitForm}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label={t('EMAIL')}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={userLoginData.email}
                        onChange={onChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t('PASSWORD')}
                        type="password"
                        value={userLoginData.password}
                        onChange={onChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {t('LOGIN_BUTTON')}
                    </Button>
                </form>
                <Button
                    onClick={handleClick}>
                    {t('FORGOT_PASSWORD')}
                </Button>
            </div>
        </Container>
    )
};

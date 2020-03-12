import React, {useCallback, useState} from "react";
import {useDispatch} from "react-redux";

import {Avatar, Button, CssBaseline, TextField, Typography, Container, makeStyles} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {loginStyles} from './Login.style.js';
import {getCurrentUser, login} from "../../../data/store/user/userThunkAction";
import {useTranslation} from "react-i18next";


const useStyles = makeStyles(loginStyles);

export const Login = (props) => {
    const {history} = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation('');

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
    },[]);

    const onSubmitForm = useCallback(async (event) => {
        event.preventDefault();
        const {email, password} = userLoginData;
        const response = await dispatch(login(email, password));

        if (response) {
            await dispatch(getCurrentUser());
            history.push('/dashboard');
        }
    }, [userLoginData, history, dispatch]);


    const handleClick = () => {
        history.push('/forgot-password');
    };

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
                        {t('LOGINBUTTON')}
                    </Button>
                </form>
                <Button
                    onClick={handleClick}>
                    {t('FORGOTPASS')}
                </Button>
            </div>
        </Container>
    )
};

import React, {useCallback, useState} from 'react';
import {Grid, TextField, Button, Typography, makeStyles} from '@material-ui/core';
import {InstagramService, StorageService} from '../../../../services';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLoading, setSnackBarStatus} from '../../../../data/store/auxiliary/auxiliaryActions';
import {chatWrapperStyles} from "../ChatWrapper.style";
import Paper from "@material-ui/core/Paper";

const useStyle = makeStyles(chatWrapperStyles);

export const ChatEnter = ({setConnection}) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.userReducer.currentUser);
    const [isLogin, setIsLogin] = useState(false);
    const [isCode, setIsCode] = useState(false);
    const [creds, setCreds] = useState({
        username: '',
        password: ''
    });
    const [securityCode, setSecurityCode] = useState('');

    const validate = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            const response = await InstagramService.validate();
            if (response.success) {
                dispatch(setIsLoading(false));
                StorageService.setChatConnection(true);
                setConnection(true);
            } else {
                dispatch(setIsLoading(false));
                const role = currentUser.role.name;
                if (role === 'Owner') {
                    setIsLogin(true);
                } else {
                    dispatch(setSnackBarStatus({
                        isOpen: true,
                        message: t('OWNER_HAVE_NOT_INTEGRATED'),
                        success: false
                    }));
                }
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        }
    }, [dispatch, currentUser, setConnection]);

    const login = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            const response = await InstagramService.login(creds);
            if (response.success) {
                dispatch(setIsLoading(false));
                StorageService.setChatConnection(true);
                setConnection(true);
            } else {
                if (response.message === 'POST /api/v1/accounts/login/ - 400 Bad Request; challenge_required') {
                    dispatch(setIsLoading(false));
                    setIsLogin(prevState => !prevState);
                    setIsCode(prevState => !prevState);
                }
            }
            console.log(response);
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        }
    }, [creds, dispatch, setConnection]);

    const sendSecurityCode = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            const response = await InstagramService.sendSecurityCode({code: securityCode, username: creds.username});
            console.log(response);
            if (response.success) {
                dispatch(setIsLoading(false));
                StorageService.setChatConnection(true);
                setConnection(true);
            } else {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        }
    }, [creds, dispatch, securityCode, setConnection]);

    const onChange = (event) => {
        const {name, value} = event.target;
        setCreds(prevState => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const renderPages = () => {
        if (isLogin) {
            return (
                <>
                    <Grid container item xs={12} sm={12} className={classes.chatEnterContainer}>
                        <Paper className={classes.paper}>
                            <Grid item xl={12} style={{margin: '0 0 20px'}}>
                                <TextField
                                    variant='outlined'
                                    size='small'
                                    label='Username'
                                    name='username'
                                    value={creds.username}
                                    onChange={onChange}
                                    autoComplete='off'
                                />
                            </Grid>
                            <Grid item xl={12} style={{margin: '0 0 20px'}}>
                                <TextField
                                    size='small'
                                    variant='outlined'
                                    label='Password'
                                    name='password'
                                    value={creds.password}
                                    onChange={onChange}
                                    type='password'
                                    autoComplete='off'
                                />
                            </Grid>
                            <Grid item xl={12}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={login}
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </>
            );
        }
        if (isCode) {
            return (
                <>
                    <Grid container item xs={12} sm={12} className={classes.chatEnterContainer}>
                        <Paper className={classes.paper}>
                            <Grid item xl={12} style={{margin: '0 0 20px'}}>
                                <Grid item xl={12}>
                                    <Typography>
                                        Check email bla-bla security code
                                    </Typography>
                                </Grid>
                                <Grid item xl={12}>
                                    <TextField
                                        label='Code'
                                        name='code'
                                        value={securityCode}
                                        onChange={(event) => setSecurityCode(event.target.value)}
                                        autoComplete='off'
                                    />
                                </Grid>
                                <Grid item xl={12}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={sendSecurityCode}>
                                        Send security code
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </>
            );
        }
        return (
            <Grid container item xs={12} sm={12} className={classes.chatEnterContainer}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={validate}>
                    Enter
                </Button>
            </Grid>
        );
    };

    return (
        <Grid container style={{flexDirection: 'column'}}>
            {renderPages()}
        </Grid>
    );
};
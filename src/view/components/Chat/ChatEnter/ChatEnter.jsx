import React, {useCallback, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {InstagramService, StorageService} from '../../../../services';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLoading, setSnackBarStatus} from '../../../../data/store/auxiliary/auxiliaryActions';
import Typography from '@material-ui/core/Typography';

export const ChatEnter = ({setConnection}) => {
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
                setConnection();
            } else {
                dispatch(setIsLoading(false));
                const role = currentUser.role.name;
                if (role === 'Owner') {
                    setIsLogin(true);
                } else {
                    dispatch(setSnackBarStatus({
                        isOpen: true,
                        message: `Organization owner haven't added IG credentials yet`,
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
                setConnection();
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
                setConnection();
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
                    <Grid item xl={12}>
                        <TextField
                            label='Username'
                            name='username'
                            value={creds.username}
                            onChange={onChange}
                            autoComplete='off'
                        />
                    </Grid>
                    <Grid item xl={12}>
                        <TextField
                            label='Password'
                            name='password'
                            value={creds.password}
                            onChange={onChange}
                            type='password'
                            autoComplete='off'
                        />
                    </Grid>
                    <Grid item xl={12}>
                        <Button onClick={login}>
                            Login
                        </Button>
                    </Grid>
                </>
            );
        }
        if (isCode) {
            return (
                <>
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
                        <Button onClick={sendSecurityCode}>
                            Send security code
                        </Button>
                    </Grid>
                </>
            );
        }
        return (
            <Grid item>
                <Button onClick={validate}>
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
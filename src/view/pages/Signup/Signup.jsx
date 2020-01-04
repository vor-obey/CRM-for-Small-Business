import React, { useState } from 'react';

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Typography,
    Container,
    IconButton,
    InputAdornment,
    OutlinedInput,
    FormControl,
    InputLabel,
    withStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { signupStyle } from "./Signup.style";
import NumberFormat from 'react-number-format';


const Signup = (props) => {
        const { classes } = props;

        const [values, setValues] = useState({
            password: '',
            passwordValid: '',
            showPassword: false,
        });

        const handleChange = prop => event => {
            setValues({ ...values, [prop]: event.target.value });
        };

        const handleClickShowPassword = () => {
            setValues({ ...values, showPassword: !values.showPassword });
        };

        const handleMouseDownPassword = (e) => {
            e.preventDefault();
        };


        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} onSubmit={handleMouseDownPassword}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Last Name"
                                    name="lastName"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    size='small'
                                                    edge='end'
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={70}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" required>
                                    <InputLabel htmlFor="outlined-adornment-password" >Repeat Password </InputLabel>
                                    <OutlinedInput
                                        required

                                        placeholder='Repeat Password *'
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.passwordValid}
                                        onChange={handleChange('passwordValid')}
                                        labelWidth={145}
                                        endAdornment={
                                            <InputAdornment position="end" >
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    size='small'
                                                    edge='end'
                                                >
                                                    {values.showPassword ? <Visibility fontSize='small' /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <NumberFormat
                                    variant="outlined"
                                    customInput={TextField}
                                    required
                                    format="+38 (###) ###-##-##"
                                    mask="_"
                                    fullWidth
                                    name="contact"
                                    label="Contact number"
                                    type="tel"
                                    autoComplete="contact-number"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
}

export default withStyles(signupStyle)(Signup);

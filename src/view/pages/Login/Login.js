import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../../data/store/user/userThunkAction";
import StorageService from '../../../services/StorageService';

import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container, withStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { loginStyles } from './Login.style.js';
import { Alert } from '@material-ui/lab';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isAuthenticated: false,
        };

        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    async login(e) {
        e.preventDefault();
        const { email, password } = this.state;
        const { login, history } = this.props;
        await login(email, password);

        const token = StorageService.getJWTToken();

        if (token) {
            history.push('/dashboard');
        }
    };

    handleClick = () => {
        this.props.history.push('./restore-password')
    };

    render() {
        const { classes } = this.props;

        return(
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <form className={classes.form} onSubmit={this.login} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item>
                                { this.props.loginError ? (<Alert severity="error">The username or password provided were incorrect!</Alert>) : null }
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    const {
        currentUser,
        loginError } = state.userReducer;

    return {
        currentUser,
        loginError
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login(email, password)),
    }
};

export default withStyles(loginStyles)(connect(mapStateToProps, mapDispatchToProps)(Login));

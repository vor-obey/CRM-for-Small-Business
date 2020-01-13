import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/styles';
import { loginStyles } from './Login.style.js';
import {connect} from "react-redux";
import { login } from "../../../data/store/user/userThunkAction";
import Box from "@material-ui/core/Box";


class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            logIn: false,
        };

        const token = localStorage.getItem("token");
        if(token == null){
            this.state.logIn = false;
        }

        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        localStorage.clear();
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login(e){
        e.preventDefault();
        const { email, password } = this.state;

        this.props.login(email, password)
    }

    render() {
        const { classes, currentUser } = this.props;
        if (currentUser) {
           return (<Redirect to='/admin' />)
        }

        if(currentUser){
            console.log('SUCCESS!');
        }

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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
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
                                { this.props.loginError ? (<Box>The username or password provided were incorrect!</Box>) : null }
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
};

const mapStateToProps = (state) => {
    const { currentUser, loginError } = state.userReducer;

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

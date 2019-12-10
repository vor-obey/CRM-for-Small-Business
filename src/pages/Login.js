import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';



export default class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            message: '',
            logIn: false,
        }

        const token = localStorage.getItem("token");
        let logIn = false;
        if(token == null){
            logIn = false;
        };

        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        localStorage.clear();
    }
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm(e){
        e.preventDefault();
        const { username, password } = this.state;

        if(username === "test" && password === "test") {
            localStorage.setItem('token', 'ss');
            this.setState({
                logIn: true
            })
        }
    }

    render() {

        if (this.state.logIn) {
            return <Redirect to='/admin' />
        }


        return(
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div >
                    <Avatar>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <form Validate onSubmit={this.submitForm} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="username"
                            autoComplete="email"
                            autoFocus
                            value={this.state.username}
                            onChange={this.onChange}
                            error={this.state.message.length === 0 ? false : true }
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
                            error={this.state.message.length === 0 ? false : true }
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
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}

                                </Link>
                                {/*{ <Box>The username or password provided were incorrect!</Box> }*/}
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
};

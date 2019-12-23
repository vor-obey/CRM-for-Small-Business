import React, { Component } from 'react';
import { Avatar, Button, CssBaseline, TextField, InputLabel, MenuItem, Select, Grid, Typography, Container, withStyles }from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { signupStyle } from './Signup.style.js';
import { connect } from 'react-redux';
import { postUser } from "../../../data/store/user/userThunkAction";

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: ''
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(e){
        e.preventDefault();
        this.props.postUser();
        console.log(this.state);
    }

    onChangeHandler(e){
        this.setState({ [e.target.name]: e.target.value })
    }


    render(){
        const { classes } = this.props;
        // const {handleSubmit} = this.props;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonAddIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create user
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.onSubmitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="First Name"
                                    value={this.state.firstName}
                                    onChange={this.onChangeHandler}
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
                                    autoComplete="lname"
                                    value={this.state.lastName}
                                    onChange={this.onChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={this.state.email}
                                    onChange={this.onChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={this.state.password}
                                    onChange={this.onChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Repeat password"
                                    type="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-controlled-open-select-label">Role</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    className={classes.select}
                                    value={this.state.role}
                                    name="role"
                                    onChange={this.onChangeHandler}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem
                                        value="admin"
                                      >Admin</MenuItem>
                                    <MenuItem
                                        value="moderator"
                                    >Moderator</MenuItem>
                                    <MenuItem
                                        value="manager"
                                    >Manager</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Add user
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        postUser: (user) => dispatch(postUser(user)),
    }
};

export default withStyles(signupStyle)(connect(null, mapDispatchToProps)(SignUp));

import React, { Component } from 'react';

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Typography,
    Container,
    Select,
    IconButton,
    InputAdornment,
    OutlinedInput,
    FormControl,
    InputLabel,
    withStyles } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import NumberFormat from 'react-number-format';
import { createuserStyle } from './CreateUser.style.js';
import { connect } from 'react-redux';
import { postUser } from "../../../data/store/user/userThunkAction";


class CreateUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            inputs: {
                firstName: '',
                lastName: '',
                middleName: '',
                email: '',
                password: '',
                confirmPassword: '',
                contactNumber: '',
                role: ''
            },
            showPassword: false,
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    }

    handleClickShowPassword() {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword,
        }));
    };

    onChangeHandler(e) {
        const inputs = {
            ...this.state.inputs,
            [e.target.name]: e.target.value,
        };
        this.setState({ inputs });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const {
            confirmPassword,
            ...user
        } = this.state.inputs;

        if (user.password === confirmPassword) {
            this.props.postUser(user);
        }
    }

    render(){
        const { classes } = this.props;

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
                    <form className={classes.form} onSubmit={this.onSubmitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label={"First Name"}
                                    name={"firstName"}
                                    variant={"outlined"}
                                    type={"text"}
                                    value={this.state.inputs.firstName}
                                    onChange={this.onChangeHandler}
                                    required
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label={"Last Name"}
                                    name={"lastName"}
                                    variant={"outlined"}
                                    type={"text"}
                                    value={this.state.inputs.lastName}
                                    onChange={this.onChangeHandler}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={"Middle Name"}
                                    name={"middleName"}
                                    value={this.state.inputs.middleName}
                                    onChange={this.onChangeHandler}
                                    variant={"outlined"}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={"Email Address"}
                                    name={"email"}
                                    variant={"outlined"}
                                    type="email"
                                    value={this.state.inputs.email}
                                    onChange={this.onChangeHandler}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="outlined"
                                required>

                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        label={"Password"}
                                        name={"password"}
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.inputs.password}
                                        onChange={this.onChangeHandler}
                                        labelWidth={85}
                                        
                                        fullWidth
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                    size='small'
                                                    edge='end'
                                                >
                                                    {this.state.showPassword ? <Visibility fontSize='small' /> : <VisibilityOff fontSize='small' />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" required>
                                    <InputLabel htmlFor="outlined-adornment-password" >Repeat Password </InputLabel>
                                    <OutlinedInput
                                        label={"Password"}
                                        name={"confirmPassword"}
                                        placeholder={"Repeat Password *"}
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.inputs.confirmPassword}
                                        onChange={this.onChangeHandler}
                                        labelWidth={145}
                                        required
                                        fullWidth
                                        endAdornment={
                                            <InputAdornment position="end" >
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                    size='small'
                                                    edge='end'
                                                >
                                                    {this.state.showPassword ? <Visibility fontSize='small' /> : <VisibilityOff fontSize='small' />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <NumberFormat
                                    customInput={TextField}
                                    label={"Contact number"}
                                    name={"contactNumber"}
                                    type={"tel"}
                                    variant={"outlined"}
                                    format={"+38 (###) ###-##-##"}
                                    mask={"_"}
                                    value={this.state.inputs.phone}
                                    onChange={this.onChangeHandler}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl 
                                    variant="outlined"
                                    className={classes.formControl}
                                    required
                                    >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                    Role
                                    </InputLabel>
                                    <Select
                                        native
                                        name={"role"}
                                        value={this.state.inputs.role}
                                        onChange={this.onChangeHandler}
                                        labelWidth={40}
                                        required
                                        inputProps={{
                                            name: 'role',
                                          }}
                                        >
                                            <option value=""></option>
                                            <option value={"admin"}>Admin</option>
                                            <option value={"moderator"}>Moderator</option>
                                            <option value={"manager"}>Manager</option>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            className={classes.submit}
                            type={"submit"}
                            variant={"contained"}
                            color={"primary"}
                            fullWidth
                        >Add user</Button>
                    </form>
                </div>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postUser: (user) => {
            dispatch(postUser(user));
        }
    }
};

export default withStyles(createuserStyle)(connect(null, mapDispatchToProps)(CreateUser));

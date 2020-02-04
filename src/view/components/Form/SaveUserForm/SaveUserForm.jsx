import React, {useCallback, useEffect, useState} from 'react';
import {
    Avatar, Button, Container,
    CssBaseline, FormControl,
    Grid, IconButton, InputAdornment,
    InputLabel, OutlinedInput, Select,
    TextField, Typography, makeStyles
} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import NumberFormat from 'react-number-format';
import { saveUserFormStyle } from './SaveUserForm.style';
import {useDispatch} from "react-redux";
import {UserService} from "../../../../services";
import {getRoles} from "../../../../data/store/user/userThunkAction";

const useStyles = makeStyles(saveUserFormStyle);

export const SaveUserForm = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [roleId, setRoleId] = useState({});
    const [userDetails, setUserDetails] = useState({
        ...roleId,
        firstName: '',
        lastName:  '',
        middleName: '',
        contactNumber: '',
    });
    const [user, setUser] = useState({
        ...userDetails,
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);


    const handleClickShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    useEffect(() => {
        const fetchRoles = async () => {
            const response = await UserService.getRoles();
            setRoleId(response);
            dispatch(getRoles())
        };
        fetchRoles();
    }, [dispatch]);

    const renderSelect = useCallback(() => {
        if (!roleId || !roleId.length){
            return null;
        }

        return roleId.map((role) => {
            return (
                <option key={role.roleId} value={role.roleId}>{role.name}</option>
            )
        });
    },[roleId]);

    const onChangeHandler = (event) => {
        event.persist();
        setUserDetails(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
        setUser(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
    };

    const renderEmailPassword = () => {
        return (
            <>
                <Grid item xs={12}>
                    <TextField
                        label={"Email Address"}
                        name={"email"}
                        variant={"outlined"}
                        type="email"
                        value={user.email}
                        defaultValue={user.email}
                        onChange={onChangeHandler}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined" required>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            label={"Password"}
                            name={"password"}
                            type={showPassword ? 'text' : 'password'}
                            value={user.password}
                            onChange={onChangeHandler}
                            labelWidth={85}
                            fullWidth
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        size='small'
                                        edge='end'>
                                        {showPassword ? <Visibility fontSize='small' /> : <VisibilityOff fontSize='small' />}
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
                            type={showPassword ? 'text' : 'password'}
                            value={user.confirmPassword}
                            onChange={onChangeHandler}
                            labelWidth={145}
                            required
                            fullWidth
                            endAdornment={
                                <InputAdornment position="end" >
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        size='small'
                                        edge='end'>
                                        {showPassword ? <Visibility fontSize='small' /> : <VisibilityOff fontSize='small' />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
            </>
        )
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonAddIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {props.titleText}
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={"First Name"}
                                name={"firstName"}
                                variant={"outlined"}
                                type={"text"}
                                value={userDetails.firstName}
                                onChange={onChangeHandler}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={"Last Name"}
                                name={"lastName"}
                                variant={"outlined"}
                                type={"text"}
                                value={userDetails.lastName}
                                onChange={onChangeHandler}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={"Middle Name"}
                                name={"middleName"}
                                value={userDetails.middleName}
                                onChange={onChangeHandler}
                                variant={"outlined"}
                                required
                                fullWidth
                            />
                        </Grid>
                        {props.isEdit && renderEmailPassword()}
                        <Grid item xs={12} sm={6}>
                            <NumberFormat
                                customInput={TextField}
                                label={"Contact number"}
                                name={"contactNumber"}
                                type={"tel"}
                                variant={"outlined"}
                                format={"+38 (###) ###-##-##"}
                                mask={"_"}
                                value={userDetails.contactNumber}
                                onChange={onChangeHandler}
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
                                    name={"roleId"}
                                    value={userDetails.roleId}
                                    onChange={onChangeHandler}
                                    labelWidth={40}
                                    required
                                    inputProps={{
                                        name: 'roleId',
                                    }}>
                                    <option value=""></option>
                                    {renderSelect()}
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
                    >{props.submitButton}</Button>
                </form>
            </div>
        </Container>
    );
};

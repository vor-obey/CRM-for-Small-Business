import React, {useState} from 'react';
import {
    Avatar, Button, Container,
    CssBaseline,
    FormControl,
    Grid, IconButton, InputAdornment,
    InputLabel,
    OutlinedInput, Select,
    TextField,
    Typography,
} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import NumberFormat from 'react-number-format';
import { saveUserFormStyle } from './SaveUserForm.style';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(saveUserFormStyle);

export const SaveUserForm = (props) => {
    const classes = useStyles();
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName:  '',
        middleName: '',
        contactNumber: '',
        roleId: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const roles = [
        {roleId: 1, name: 'Admin'},
        {roleId: 2, name: 'Moderator'},
        {roleId: 3, name: 'Manager'},
    ];


    //     if (props.userDetails)  {
    //         prepopulatedInput = {
    //             firstName: props.userDetails.firstName || '',
    //             lastName: props.userDetails.lastName || '',
    //             middleName: props.userDetails.middleName || '',
    //             email: props.userDetails.email || '',
    //             password: props.userDetails.password || '',
    //             confirmPassword: props.userDetails.confirmPassword || '',
    //             contactNumber: props.userDetails.contactNumber || '',
    //             roleId: props.userDetails.roleId || '',
    //         }
    //     }
    //     state = {
    //         inputs: {
    //             firstName: '',
    //             lastName:  '',
    //             middleName: '',
    //             email: '',
    //             password: '',
    //             confirmPassword: '',
    //             contactNumber: '',
    //             roleId: '',
    //             ...prepopulatedInput,
    //         },
    //         showPassword: false,
    //     };

    const handleClickShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    const renderSelect = () => {
        return roles.map((role) => {
            return (
                <option key={role.roleId} value={role.roleId}>{role.name}</option>
            )
        });
    };

    const onChangeHandler = (event) => {
        event.persist();
        setUserDetails(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
        console.log(event.target.name, event.target.value)
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(userDetails);
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
                        value={userDetails.email}
                        defaultValue={props.email}
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
                            value={userDetails.password}
                            onChange={onChangeHandler}
                            labelWidth={85}
                            // disabled={props.disabled}
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
                            value={userDetails.confirmPassword}
                            onChange={onChangeHandler}
                            labelWidth={145}
                            required
                            fullWidth
                            // disabled={props.disabled}
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

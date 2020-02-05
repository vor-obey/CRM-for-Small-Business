import React, {useCallback, useState} from 'react';
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
import {UserCredentials} from "./UserCredentialsForm/UserCredentialsForm";

const useStyles = makeStyles(saveUserFormStyle);

export const SaveUserForm = (props) => {
    const {
        userDetails,
        titleText,
        buttonText,
        isEdit,
        onSubmit,
        roles
    } = props;
    const classes = useStyles();
    const [userDetailsInputs, setUserDetailsInputs] = useState({
        firstName: (userDetails && userDetails.firstName) || '',
        lastName:  (userDetails && userDetails.lastName) || '',
        middleName: (userDetails && userDetails.middleName) || '',
        contactNumber: (userDetails && userDetails.contactNumber) || '',
        roleId: '',
    });
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);


    const handleClickShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    const renderSelect = useCallback(() => {
        return roles.map((role) => {
            return (
                <option key={role.roleId} value={role.roleId}>{role.name}</option>
            )
        });
    },[roles]);

    const onChangeHandler = (event) => {
        const {name, value} = event.target;
        if (!isEdit) {
            setUserCredentials(prevState => {
                return {
                    ...prevState,
                    [event.target.name]: event.target.value
                }
            });
        }
        setUserDetailsInputs(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    };

    const returnUserInput = () => {
      let input = {...userDetailsInputs};
      if (!isEdit) {
          input = {...input, ...userCredentials};
      }
      return input;
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonAddIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {titleText}
                </Typography>
                <form className={classes.form} onSubmit={(event) => onSubmit(event, returnUserInput())}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={"First Name"}
                                name={"firstName"}
                                variant={"outlined"}
                                type={"text"}
                                value={userDetailsInputs.firstName}
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
                                value={userDetailsInputs.lastName}
                                onChange={onChangeHandler}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={"Middle Name"}
                                name={"middleName"}
                                value={userDetailsInputs.middleName}
                                onChange={onChangeHandler}
                                variant={"outlined"}
                                required
                                fullWidth
                            />
                        </Grid>
                        {!isEdit && <UserCredentials/>}
                        <Grid item xs={12} sm={6}>
                            <NumberFormat
                                customInput={TextField}
                                label={"Contact number"}
                                name={"contactNumber"}
                                type={"tel"}
                                variant={"outlined"}
                                format={"+38 (###) ###-##-##"}
                                mask={"_"}
                                value={userDetailsInputs.contactNumber}
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
                                    value={userDetailsInputs.roleId}
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
                    >{buttonText}</Button>
                </form>
            </div>
        </Container>
    );
};

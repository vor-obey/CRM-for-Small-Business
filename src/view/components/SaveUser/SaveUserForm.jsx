import React, {useState} from 'react';
import {
    Avatar, Container,
    CssBaseline,
    Typography, makeStyles
} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {saveUserStyle} from './SaveUser.style';
import {SaveUserCredentials} from "./SaveUserCredentials/SaveUserCredentials";
import {SaveUserDetails} from "./SaveUserDetails/SaveUserDetails";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(saveUserStyle);

export const SaveUserForm = (props) => {
    const {
        userDetails,
        titleText,
        buttonText,
        isEdit,
        roles,
        onSubmit
    } = props;

    const classes = useStyles();
    const [userDetailsInputs, setUserDetailsInputs] = useState({
        firstName: (userDetails && userDetails.firstName) || '',
        lastName: (userDetails && userDetails.lastName) || '',
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
        setShowPassword(prevState => !prevState)
    };

    const onChangedInputDetails = (event) => {
        const {name, value} = event.target;
        setUserDetailsInputs(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    };

    const onChangedInputCredentials = (event) => {
        const {name, value} = event.target;
        setUserCredentials(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    };

    const onSubmitForm = (event) => {
      event.preventDefault();
      const input = isEdit ? userDetailsInputs : {...userDetailsInputs, ...userCredentials};
      onSubmit(input);
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
                <form className={classes.form} onSubmit={onSubmitForm}>
                    <SaveUserDetails
                        roles={roles}
                        userDetails={userDetailsInputs}
                        onChangedInput={onChangedInputDetails}
                        classes={classes}
                    />
                    {!isEdit ?
                        <SaveUserCredentials
                            showPassword={showPassword}
                            toggleShowPassword={handleClickShowPassword}
                            onChangedInput={onChangedInputCredentials}
                            credentials={userCredentials}
                        /> : null}
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

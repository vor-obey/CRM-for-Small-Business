import React, {useState, useEffect, useCallback} from 'react';
import {
    Avatar, Container,
    CssBaseline,
    Typography, Button, makeStyles
} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {saveUserStyle} from './SaveUser.style';
import {SaveUserCredentials} from "./SaveUserCredentials/SaveUserCredentials";
import {SaveUserDetails} from "./SaveUserDetails/SaveUserDetails";

const useStyles = makeStyles(saveUserStyle);

export const SaveUserForm = (props) => {
    const {
        userDetails,
        title,
        buttonText,
        isEdit,
        roles,
        onSubmit,
        currentUser,
    } = props;

    const classes = useStyles();

    const [userDetailsInputs, setUserDetailsInputs] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        contactNumber: '',
        roleId: ''
    });
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setUserDetailsInputs(userDetails);
    }, [userDetails]);

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(prevState => !prevState)
    }, []);

    const onChangedInputDetails = useCallback((event) => {
        const {name, value} = event.target;
        setUserDetailsInputs(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }, []);

    const onChangedInputCredentials = useCallback((event) => {
        const {name, value} = event.target;
        setUserCredentials(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }, []);

    const onSubmitForm = useCallback((event) => {
      event.preventDefault();
      const input = isEdit ? userDetailsInputs : {...userDetailsInputs, ...userCredentials};
      onSubmit(input);
    }, [isEdit, onSubmit, userCredentials, userDetailsInputs]);

    const renderCredentials = () => {
        if ((isEdit && (userDetails.userId = currentUser)) || !isEdit) {
            return (
                <SaveUserCredentials
                    showPassword={showPassword}
                    toggleShowPassword={handleClickShowPassword}
                    onChangedInput={onChangedInputCredentials}
                    credentials={userCredentials}
                />
            )
        }

        return null;

    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonAddIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {title}
                </Typography>
                <form className={classes.form} onSubmit={onSubmitForm}>
                    <SaveUserDetails
                        roles={roles}
                        userDetails={userDetailsInputs}
                        onChangedInput={onChangedInputDetails}
                        classes={classes}
                    />
                    {renderCredentials()}
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

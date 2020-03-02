import React, {useCallback, useEffect, useState} from 'react';
import {Avatar, Button, Container, CssBaseline, makeStyles, Typography} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {saveUserStyle} from './SaveUser.style';
import {SaveUserCredentials} from "./SaveUserCredentials/SaveUserCredentials";
import {SaveUserDetails} from "./SaveUserDetails/SaveUserDetails";
import {COMMON_ERROR_MESSAGE_VALIDATE} from "../../../constants/statuses";
import {useDispatch} from "react-redux";
import {setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";

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

   const dispatch = useDispatch();

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
      if (userCredentials.password !== userCredentials.confirmPassword) {
         dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE_VALIDATE}));
      } else {
         const {confirmPassword, ...userCreds} = userCredentials;
         let input = {...userDetailsInputs, ...userCreds};

         if (isEdit && userDetails.userId !== currentUser.userId) {
            input = userDetailsInputs;
         }
         onSubmit(input);
      }
   }, [isEdit, onSubmit, userCredentials, userDetailsInputs, currentUser, userDetails, dispatch]);

   const renderCredentials = useCallback(() => {
      if (isEdit && (currentUser && userDetails && currentUser.userId !== userDetails.userId)) {
         return null;
      }
      return (
         <SaveUserCredentials
            showPassword={showPassword}
            toggleShowPassword={handleClickShowPassword}
            onChangedInput={onChangedInputCredentials}
            credentials={userCredentials}
         />
      )
   }, [
      currentUser,
      isEdit,
      handleClickShowPassword,
      onChangedInputCredentials,
      showPassword,
      userCredentials,
      userDetails
   ]);

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

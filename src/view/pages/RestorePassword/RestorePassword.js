import React, {useState} from "react";
import {RestorePasswordStyle} from './RestorePassword.style'
import {useParams} from 'react-router-dom';

import {Box, Button, Container, TextField, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core';
import {UserService} from "../../../services";

const useStyles = makeStyles(RestorePasswordStyle);

export const RestorePassword = (props) => {
   const classes = useStyles();
   const [password, setPassword] = useState('');
   const [confirmationPassword, setConfirmationPassword] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   const [buttonText, setButtonText] = useState('Send');
   const {token} = useParams();

   const onPasswordInputChangedHandler = event => {
      setErrorMessage('');
      const {value} = event.target;
      setPassword(value);
   };

   const onConfirmationPasswordInputChangedHandler = event => {
      setErrorMessage('');
      const {value} = event.target;
      setConfirmationPassword(value);
   };


   const onSubmitHandler = async (e) => {
      e.preventDefault();
      setButtonText('Sending...');
      const response = await UserService.sendNewPassword({token, password});
         setButtonText('Send');
         if (response.success) {
            props.history.push('/')
         } else {
            setErrorMessage('Error');
            setPassword('');
            setConfirmationPassword('');
         }
   };

   const disableButton = () => {
      if (password !== confirmationPassword) {
         return true;
      }
      return !password || !confirmationPassword;

   };

   return (
      <Container component="main" maxWidth="xs">
         <div className={classes.root}>
            <Typography component="h1" variant="h5">
               Restore your Password
            </Typography>
            <form className={classes.form} onSubmit={onSubmitHandler}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  autoComplete="password"
                  autoFocus
                  type="password"
                  value={password}
                  onChange={onPasswordInputChangedHandler}
               />
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  autoComplete="current-password"
                  value={confirmationPassword}
                  onChange={onConfirmationPasswordInputChangedHandler}
               />

               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={disableButton()}
                  className={classes.submit}
               >
                  {buttonText}
               </Button>
            </form>
            {password !== confirmationPassword ? <Box>Password doesn't match</Box> : null}
            {errorMessage ? <div>{errorMessage}</div> : null}
         </div>
      </Container>
   )
};

export default RestorePassword;

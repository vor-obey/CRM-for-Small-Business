import React, {useState} from "react";
import {RestorePasswordStyle} from './RestorePassword.style'
import {useParams} from 'react-router-dom';

import {Button, Container, TextField, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(RestorePasswordStyle);

export const RestorePassword = () => {
   const classes = useStyles();
   const [password, setPassword] = useState('');
   const [confirmationPassword, setConfirmationPassword] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   const {token} = useParams();

   const onPasswordInputChangedHandler = event => {
      const {value} = event.target;
      setPassword(value);
   };

   const onConfirmationPasswordInputChangedHandler = event => {
      const {value} = event.target;
      setConfirmationPassword(value);
   };

   const onClickHandler = (e) => {
      e.preventDefault();
      if (password !== confirmationPassword) {
         setErrorMessage(`Password doesn't match`)
      } else {
         setErrorMessage('');
         console.log({password, token})
      }
   };

   return (
      <Container component="main" maxWidth="xs">
         <div className={classes.root}>
            <Typography component="h1" variant="h5">
               Restore Password
            </Typography>
            <form className={classes.form}>
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
               <div className={classes.error}>
                  {errorMessage}
               </div>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={onClickHandler}
               >
                  Send
               </Button>
            </form>
         </div>
      </Container>
   )
};

export default RestorePassword;

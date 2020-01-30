import React, {useState} from 'react';

import {ForgotPasswordStyles} from "./ForgotPassword.style";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import {Button, CssBaseline} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import UserService from '../../../services/UserService';

const useStyles = makeStyles(ForgotPasswordStyles);

export const ForgotPassword = () => {
   const [email, setEmail] = useState('');
   const classes = useStyles();

   const onInputChangedHandler = (event) => {
      const {value} = event.target;
      setEmail(value);
   };

   const onSubmitHandler = async (event) => {
      event.preventDefault();
      await UserService.sendPasswordResetEmail(email);
   };

      return (
         <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.root} >
               <Typography component="h1" variant="h5">
                  Enter your email to restore your password
               </Typography>
               <form className={classes.form} onSubmit={onSubmitHandler}>
                  <TextField
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                     type='email'
                     autoFocus
                     value={email}
                     onChange={onInputChangedHandler}
                  />
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     color="primary"
                     className={classes.submit}
                  >
                     Send
                  </Button>
               </form>
            </div>
         </Container>
      );
};

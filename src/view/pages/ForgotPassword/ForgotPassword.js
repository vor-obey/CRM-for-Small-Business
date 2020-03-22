import React, {useState} from 'react';

import {ForgotPasswordStyles} from "./ForgotPassword.style";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import UserService from "../../../services/UserService";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(ForgotPasswordStyles);

export const ForgotPassword = () => {
   const { t } = useTranslation('');
   const [email, setEmail] = useState('');
   const [messageText, setMessageText] = useState('hello');
   const [buttonText, setButtonText] = useState('Send');
   const [isForm, setIsForm] = useState(true);

   const classes = useStyles();

   const onInputChangedHandler = (event) => {
      const {value} = event.target;
      setEmail(value);
   };

   const onSubmitHandler = async (event) => {
      event.preventDefault();
      setButtonText(t('SENDING'));
      const response = await UserService.sendPasswordResetEmail(email);
      setButtonText(t('SEND'));
      setIsForm(false);

      if (response.success) {
         setMessageText(t('CHECK_EMAIL'));
      } else {
         setMessageText(t('NO_FOUND_EMAIL'));
      }
   };

   const onClickedHandler = () => {
      setIsForm(prevState => !prevState);
   };

   const disableButton = () => {
      return !email;

   };

   const displayStatus = () => {
      return (
         <Box className={classes.display}>
            <Typography component="h1" variant="h5">
               {messageText}
            </Typography>
            <Button
               color="primary"
               fullWidth
               variant="contained"
               onClick={onClickedHandler}
               className={classes.button}>
               {t('TRY_AGAIN')}
            </Button>
         </Box>
      )
   };

   const displayForm = () => {
      return (
         <Box className={classes.root}>
            <Typography component="h1" variant="h5">
               {t('ENTER_EMAIL')}
            </Typography>
            <form className={classes.form} onSubmit={onSubmitHandler}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={t('EMAIL')}
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
                  disabled={disableButton()}
               >
                  {buttonText}
               </Button>
            </form>
         </Box>
      )
   };

   return (
      <Container component="main" maxWidth="xs">
         {isForm ? displayForm() : displayStatus()}
      </Container>
   );
};

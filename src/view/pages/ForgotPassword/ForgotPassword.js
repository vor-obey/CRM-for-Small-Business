import React from 'react';

import {ForgotPasswordStyles} from "./ForgotPassword.style";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import {Button, CssBaseline} from "@material-ui/core";
import {withStyles} from '@material-ui/core';

class ForgotPassword extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         email: '',
      };

   }

   onChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value
      })
   };

   handleSubmit = (e) => {
      e.preventDefault();
      const {email} = this.state;
      console.log(email)
   };

   render() {
      const {classes} = this.props;

      return (
         <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.root} >
               <Typography component="h1" variant="h5">
                  Enter your email to restore your password
               </Typography>
               <form className={classes.form} onSubmit={this.handleSubmit}>
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
                     value={this.state.email}
                     onChange={this.onChange}
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
   }
}

export default withStyles(ForgotPasswordStyles)(ForgotPassword);

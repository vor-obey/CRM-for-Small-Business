import React from 'react'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {makeStyles} from '@material-ui/core';
import {Container, Box, Typography} from "@material-ui/core";

import {profileStyles} from "./Profile.style";

const useStyles = makeStyles(profileStyles);

export const Profile = (props) => {
   const classes = useStyles();
   const {currentUser} = props;

   const displayUser = () => {
      if (!currentUser) {
         return null;
      }
      return (
         <Container  className={classes.container}>
            <Box className={classes.textWrapper}>
               <Box className={classes.userName}>
                  <Typography className={classes.userName}>
                     {`${currentUser.firstName} ${currentUser.lastName}`}
                  </Typography>
               </Box>
               <Box className={classes.orgName}>
                  <Typography className={classes.orgName}>
                     {currentUser.organization.name}
                  </Typography>
               </Box>
            </Box>
            <AccountCircleIcon className={classes.icon}/>
         </Container>
      );
   };

   return (
      displayUser()
   );
};

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
                  <Typography variant='h6'>
                     {`${currentUser.firstName} ${currentUser.lastName}`}
                  </Typography>
               </Box>
               <Box className={classes.orgName}>
                  <Typography variant='h6'>
                     {/*{currentUser.organization.name}*/}
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

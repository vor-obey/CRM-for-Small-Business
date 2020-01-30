import React from 'react'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {makeStyles} from '@material-ui/core';
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
         <div className={classes.container}>
            <div className={classes.textWrapper}>
               <div className={classes.userName}>
                  {`${currentUser.firstName} ${currentUser.lastName}`}
               </div>
               <div className={classes.orgName}>
                  {currentUser.organization.name}
               </div>
            </div>
            <AccountCircleIcon className={classes.icon}/>
         </div>
      );
   };

   return (
      displayUser()
   );
};

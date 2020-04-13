import React, {useCallback, useEffect, useState} from 'react';

import {useDispatch} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {OrganizationService} from "../../../services";
import BusinessIcon from "@material-ui/icons/Business";
import {EditOrganizationStyle} from "./EditOrganization.style";
import {useOrganizationDetailsById} from "../../../utils/customHooks";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {makeStyles, Avatar, Container, Button, CssBaseline, TextField, Typography} from "@material-ui/core";
import {SaveOrganizationForm} from "../../components/SaveOrganization/SaveOrganizationForm";

const useStyles = makeStyles(EditOrganizationStyle);

export const EditOrganization = ({
                                    history
                                 }) => {
   const {id} = useParams();
   const {t} = useTranslation();
   const classes = useStyles();
   const dispatch = useDispatch();
   const organizationDetails = useOrganizationDetailsById(id);

   const [organization, setOrganization] = useState({
      organizationName: '',
      apiKeyNP: '',
   });

   useEffect(() => {
      if (!organizationDetails) {
         return null;
      }
      setOrganization({
         organizationName: organizationDetails.name,
         apiKeyNP: organizationDetails.apiKeyNP
      });
   }, [organizationDetails]);

   const onSubmitHandler = useCallback(async (event) => {
      event.preventDefault();
      try {
         dispatch(setIsLoading(true));
         const response = await OrganizationService.update(organization);
         if (response.success) {
            history.push('/')
         } else {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
         }
      } catch (e) {
         dispatch(setIsLoading(false));
         dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
      }
   }, [organization, history, dispatch]);

   const onChangeHandler = useCallback((event) => {
      const {name, value} = event.target;
      setOrganization(prevState => {
         return {
            ...prevState,
            [name]: value
         }
      })
   }, []);

   return (

      <Container component="main" maxWidth="xs">
         <CssBaseline/>
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <BusinessIcon/>
            </Avatar>
            <Typography component="h1" variant="h5" className={classes.text}>
               {t('EDIT_ORGANIZATION')}
            </Typography>
            <form className={classes.form} onSubmit={onSubmitHandler}>
               <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                     <SaveOrganizationForm
                        onChangedInput={onChangeHandler}
                        organization={organization}
                        classes={classes}
                     />
                  </Grid>
               </Grid>
               <Grid item xs={12} sm={12}>
                  <Button
                     className={classes.submit}
                     type="submit"
                     variant="contained"
                     color="primary"
                     fullWidth
                  >
                     {t('EDIT')}</Button>
               </Grid>
            </form>
         </div>
      </Container>
   );
};

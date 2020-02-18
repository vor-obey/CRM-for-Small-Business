import React, {useState} from "react";
import {Divider, Grid, Typography} from "@material-ui/core";
import {CustomAutocomplete} from "../../../components/Autocomplete/Autocomplete";

export const ManagerForm = (props) => {
   const {
      classes,
      managers,
      onSelectHandler
   } = props;

   const [isOpen, setIsOpen] = useState(false);


   const onToggle = () => {
      setIsOpen(prevState => !prevState);
   };

   return (
      <>
         <Grid item xl={12} xs={12} className={classes.gridManager}>
            <Typography variant='h6'>
               Manager
            </Typography>
            <Divider/>
         </Grid>
         <Grid item lg={12} xs={12}>
            <Grid item>
               <CustomAutocomplete
                  isOpen={isOpen}
                  options={managers}
                  isLoading={!managers.length}
                  onToggle={onToggle}
                  onClose={onToggle}
                  onSelectHandler={onSelectHandler}
                  inputLabel='Select Manager'
                  primaryText='firstName'
                  secondaryText='lastName'
                  optionKey='userId'
               />
            </Grid>
         </Grid>
      </>
   );
};

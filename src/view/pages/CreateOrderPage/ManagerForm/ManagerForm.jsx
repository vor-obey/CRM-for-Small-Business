import React, {useState} from "react";
import {Divider, Grid, Typography} from "@material-ui/core";
import {CustomAutocomplete} from "../../../components/Autocomplete/Autocomplete";

export const ManagerForm = (props) => {
   const {
      managers,
      onSelectHandler
   } = props;

   const [isOpen, setIsOpen] = useState(false);

   const onToggle = () => {
      setIsOpen(prevState => !prevState);
   };

   return (
      <>
         <Grid item xl={12} xs={12}>
            <Typography  variant='h6'>
               Manager
            </Typography>
            <Divider/>
         </Grid>
         <Grid item lg={12} xs={2} >
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
      </>
   );
};

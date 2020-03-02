import React from "react";

import {
   Grid,
   makeStyles,
   Typography
} from "@material-ui/core";


import {
   dog,
   cloud
} from '../../../constants/images';

import {HomeStyles} from "./Home.style";

const useStyles = makeStyles(HomeStyles);

export const Home = () => {
   const classes = useStyles();

   return (
      <Grid container className={classes.root}>
         <Grid item className={classes.gridCloud}>
            <img className={classes.imgCloud} src={cloud} alt='cloud'/>
            <Typography className={classes.textInOne}> Тут скоро будет наш </Typography>
            <Typography className={classes.textInTwo}>дашборд</Typography>
         </Grid>
         <Grid item className={classes.gridDog}>
            <img className={classes.imgDog} src={dog} alt='logo'/>
         </Grid>
      </Grid>
   )
};


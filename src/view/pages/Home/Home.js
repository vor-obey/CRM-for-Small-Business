import React from "react";

import {
   Grid,
   makeStyles,
   Typography
} from "@material-ui/core";

import logo from '../../components/img/1.png';
import cloud from '../../components/img/Cloud.svg'

import {HomeStyles} from "./Home.style";

const useStyles = makeStyles(HomeStyles);

export const Home = () => {
   const classes = useStyles();

   return (
      <Grid container className={classes.root}>
         <Grid item className={classes.gridCloud}>
            <img className={classes.imgCloud} src={cloud} alt='cloud'/>
            <Typography className={classes.textInCloud} > Тут скоро будет наш <br />дашборд</Typography>
         </Grid>
         <Grid item className={classes.gridDog}>
            <img className={classes.imgDog} src={logo} alt='logo'/>
         </Grid>
      </Grid>
   )
};


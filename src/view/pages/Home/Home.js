import React from "react";

import {
   Card,
   Grid,
   Container,
   CardHeader,
   makeStyles,
   Typography,
   CardContent,
} from "@material-ui/core";

import {HomeStyles} from "./Home.style";
import {Graph} from './Graph/Graph'

const useStyles = makeStyles(HomeStyles);

export const Home = () => {
   const classes = useStyles();

   return (
      <Container className={classes.container}> 
         <Grid  container className={classes.root}>
            <Grid item xl={5} lg={5} md={5} sm={6} xs={6} className={classes.grid}>
               <Card className={classes.card}>
                  <CardContent>
                     <Typography variant='h6' className={classes.typography}>
                        NEW ORDERS
                     </Typography>
                     <Typography variant='h4'>
                        6
                     </Typography>
                  </CardContent>
               </Card>
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={6} xs={6} className={classes.grid}>
               <Card className={classes.card}>
                  <CardContent> 
                     <Typography variant='h6' className={classes.typography}>
                        IN PROGRESS 
                     </Typography>
                     <Typography variant='h4'>
                        10
                     </Typography>
                  </CardContent>
               </Card>
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={6} xs={6} className={classes.grid}>
               <Card className={classes.card}>
                  <CardContent >
                     <Typography variant='h6' className={classes.typography}>
                        READY TO SHIPPING 
                     </Typography>
                     <Typography variant='h4'>
                        4 
                     </Typography>
                  </CardContent>
               </Card>
            </Grid>
            <Grid item lg={5} md={5} sm={6} xs={6} className={classes.gridChat}>
               <Card className={classes.chat}>
                  <CardHeader 
                     title='Chat'
                     className={classes.header}
                  />
                  <CardContent>
                  </CardContent>
               </Card>
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12} className={classes.gridGraph}>
               <Card className={classes.graph}>
                  <CardHeader 
                     title='Statistic'
                     className={classes.header}
                  />
                  <CardContent>
                     <Graph />
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
      </Container>
   );
};


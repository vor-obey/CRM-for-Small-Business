import React from "react";

import {
   Card,
   Grid,
   CardHeader,
   CardContent,
   Container,
   makeStyles,
   Typography
} from "@material-ui/core";

import {Graph} from './Graph/Graph'
import {HomeStyles} from "./Home.style";

const useStyles = makeStyles(HomeStyles);

export const Home = () => {
   const classes = useStyles();

   return (
      <Container className={classes.container}> 
         <Grid  container className={classes.root}>
            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} className={classes.grid}>
               <Card className={classes.card}>
                  <CardContent className={classes.typography}>
                     <Typography variant='h6'>
                        NEW ORDERS
                     </Typography>
                     <Typography variant='h4'>
                        6
                     </Typography>
                  </CardContent>
               </Card>
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} className={classes.grid}>
               <Card className={classes.card}>
                  <CardContent className={classes.typography}>
                     <Typography variant='h6'>
                        IN PROGRESS 
                     </Typography>
                     <Typography variant='h4'>
                        10
                     </Typography>
                  </CardContent>
               </Card>
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} className={classes.grid}>
               <Card className={classes.card}>
                  <CardContent className={classes.typography}>
                     <Typography variant='h6'>
                        READY TO SHIPPING 
                     </Typography>
                     <Typography variant='h4'>
                       4 
                     </Typography>
                  </CardContent>
               </Card>
            </Grid>
            <Grid item lg={5} md={5} className={classes.gridChat}>
               <Card className={classes.chat}>
                  <CardHeader 
                     title='Chat'
                     className={classes.header}
                  />
                  <CardContent>
                     <Typography>
                        NEW ORDERS
                     </Typography>
                  </CardContent>
               </Card>
            </Grid>
            <Grid item lg={7} md={7} className={classes.gridGraph}>
               <Card className={classes.graph}>
                  <CardHeader 
                     title='Chat'
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


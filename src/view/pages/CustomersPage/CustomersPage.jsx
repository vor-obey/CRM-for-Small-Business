import React, {useCallback, useState} from 'react';
import {Link} from "react-router-dom";
import {
   Button,
   Grid,
   List,
   ListItem,
   Typography,
   Container,
   Hidden,
   makeStyles
} from '@material-ui/core';
import {customersPageStyle} from "./CustomersPage.style";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {CustomerListItem} from "./CustomerListItem/CustomerListItem";
import {USER_URLS} from "../../../constants/urls";
import {InputFilter} from "../../components/Filter/InputFilter";
import {filter} from "../../../utils/helpers";
import {useTranslation} from "react-i18next";
import {useCustomers} from '../../../utils/customHooks';

const useStyles = makeStyles(customersPageStyle);

export const CustomersPage = ({history}) => {
   const [customerList] = useCustomers();
   const classes = useStyles();
   const [inputFilter, setInputFilter] = useState('');
   const { t } = useTranslation('');

   const navigateToCustomerDetails = useCallback((customerId) => {
      history.push(`${USER_URLS.CUSTOMERS}/${customerId}`)
   }, [history]);

   const onFilterChangedHandler = useCallback((event) => {
      const {value} = event.target;
      setInputFilter(value)
   }, []);

   const renderRows = useCallback(() => {
      if (!customerList || !customerList.length) {
         return null;
      }
      return filter(customerList, inputFilter).map((customer) => {
         return (
            <CustomerListItem
               key={customer.customerId}
               customer={customer}
               classes={classes}
               navigateToCustomerDetails={navigateToCustomerDetails}
            />
         )
      })
   }, [customerList, classes, navigateToCustomerDetails, inputFilter]);

   return (
      <Container className={classes.root}>
         <Typography variant="h5" className={classes.title}>
            {t('CUSTOMERS')}
         </Typography>

         <Grid className={classes.searchBox}>
            <InputFilter
               className={classes.search}
               value={inputFilter}
               label={t('FILTER')}
               onChange={onFilterChangedHandler}
            />
         </Grid>
         <List className={classes.container}>
            <ListItem divider>
               <Grid container className={classes.customerListContainer}>
                  <Grid item xs={5} md={2}>
                     <Typography className={classes.customerItemTitle}>
                        {t('USERNAME')}
                     </Typography>
                  </Grid>
                  <Grid item xs={5} md={2}>
                     <Typography className={classes.customerItemTitle}>
                        {t('NAME')}
                     </Typography>
                  </Grid>
                  <Hidden smDown>
                     <Grid item xs={3} md={2}>
                        <Typography className={classes.customerItemTitle}>
                           {t('NUMBER')}
                        </Typography>
                     </Grid>
                  </Hidden>
                  <Hidden smDown>
                     <Grid item xs={3} md={2}>
                        <Typography className={classes.customerItemTitle}>
                           {t('EMAIL')}
                        </Typography>
                     </Grid>
                  </Hidden>
               </Grid>
            </ListItem>
            {renderRows()}
         </List>
         <Grid container justify='center'>
            <Button
               type='submit'
               variant="outlined"
               color="primary"
               className={classes.button}
               component={Link}
               to='/create-customer'
            >
               <PersonAddIcon className={classes.addCustomer}/>
               {t('CREATE_CUSTOMER')}
            </Button>
         </Grid>
      </Container>
   )
};

import React, {useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import {CustomerService} from "../../../services";
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
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";
import {USER_URLS} from "../../../constants/urls";
import {FilterInput} from "../../components/Filter/FilterInput/FilterInput";
import {filter} from "../../../utils/helpers";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(customersPageStyle);

export const CustomersPage = ({history}) => {
    const [customerList, setCustomerList] = useState([]);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [inputFilter, setInputFilter] = useState('');
    const { t } = useTranslation('');

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                dispatch(setIsLoading(true));
                const response = await CustomerService.list();
                setCustomerList(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
            }
        };
        fetchCustomers();
    }, [dispatch]);

    const navigateToCustomerDetails = useCallback((customerId) => {
        history.push(`${USER_URLS.CUSTOMERS}/${customerId}`)
    }, [history]);

   const onChangeHandler = (event) => {
      const {value} = event.target;
      setInputFilter(value)
   };

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
            <FilterInput
                className={classes.search}
                value={inputFilter}
                label={t('FILTER')}
                onChange={onChangeHandler}
            />
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
                    {t('CREATECUSTOMER')}
                </Button>
            </Grid>
        </Container>
    )
};
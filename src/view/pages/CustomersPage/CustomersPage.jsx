import React, {useCallback, useState} from 'react';
import {Link} from "react-router-dom";
import {
    Button,
    Grid,
    List,
    ListItem,
    Typography,
    Container,
    makeStyles, useMediaQuery
} from '@material-ui/core';
import {customersPageStyle} from "./CustomersPage.style";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {CustomerListItem} from "./CustomerListItem/CustomerListItem";
import {USER_URLS} from "../../../constants/urls";
import {InputFilter} from "../../components/Filter/InputFilter";
import {filter} from "../../../utils/helpers";
import {useTranslation} from "react-i18next";
import {useCustomers} from '../../../utils/hooks/customerHooks';
import {isEmpty} from 'lodash';

const useStyles = makeStyles(customersPageStyle);

export const CustomersPage = ({history}) => {
    const [customerList, loading] = useCustomers();
    const classes = useStyles();
    const [inputFilter, setInputFilter] = useState('');
    const {t} = useTranslation('');
    const minWidth600 = useMediaQuery('(min-width:600px)');

    const navigateToCustomerDetails = useCallback((customerId) => {
        history.push(`${USER_URLS.CUSTOMERS}/${customerId}`)
    }, [history]);

    const onFilterChangedHandler = useCallback((event) => {
        const {value} = event.target;
        setInputFilter(value)
    }, []);

    const renderRows = useCallback(() => {
        if (isEmpty(customerList)) {
            return null;
        }
        return filter(customerList, inputFilter).map((customer) => {
            return (
                <CustomerListItem
                    t={t}
                    key={customer.customerId}
                    customer={customer}
                    classes={classes}
                    minWidth={minWidth600}
                    navigateToCustomerDetails={navigateToCustomerDetails}
                />
            )
        })
    }, [customerList, classes, navigateToCustomerDetails, inputFilter, minWidth600, t]);

    console.log(customerList);

    if (isEmpty(customerList) || !loading) {
        return (
            <Grid container justify='center' style={{display: 'grid', paddingTop: 24}}>
                <Typography variant='h5' style={{paddingBottom: 18}}>{t('NO_NEW_CUSTOMERS')}</Typography>
                <Button
                    type='submit'
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to='/create-customer'
                >
                    <PersonAddIcon className={classes.addCustomer}/>
                    {t('CREATE_CUSTOMER')}
                </Button>
            </Grid>
        );
    }

    return (
        <Container className={classes.root}>
            <Grid className={classes.searchBox}>
                <InputFilter
                    classes={classes}
                    value={inputFilter}
                    label={t('FILTER')}
                    onChange={onFilterChangedHandler}
                />
            </Grid>
            <List>
                <ListItem disableGutters divider>
                    <Grid container className={classes.gridCustomerContainer}>
                        <Grid item xl={5} lg={5} md={5} sm={5}>
                            <Typography>{t('USERNAME')}</Typography>
                        </Grid>
                        <Grid item xl={5} lg={5} md={5} sm={4}>
                            <Typography>{t('NAME')}</Typography>
                        </Grid>
                        <Grid item xl={2} ld={2} md={2} sm={3}>
                            <Typography>{t('NUMBER')}</Typography>
                        </Grid>
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

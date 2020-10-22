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
import {InputFilter} from "../../components/Filter/InputFilter";
import {filter} from "../../../utils/helpers";
import {useTranslation} from "react-i18next";
import {useCustomers} from '../../../utils/hooks/customerHooks';
import {isEmpty} from 'lodash';
import {CUSTOMERS, CUSTOMERS_CREATE} from "../../../constants/routes";
import {useSelector} from "react-redux";

const useStyles = makeStyles(customersPageStyle);

export const CustomersPage = ({history}) => {
    const {customers} = useCustomers();
    const classes = useStyles();
    const [inputFilter, setInputFilter] = useState('');
    const {t} = useTranslation('');
    const minWidth600 = useMediaQuery('(min-width:600px)');
    const customersStatus = useSelector(state => state.customerReducer.customerStatus)

    const navigateToCustomerDetails = useCallback((customerId) => {
        history.push(`${CUSTOMERS}/${customerId}`)
    }, [history]);

    const onFilterChangedHandler = useCallback((event) => {
        const {value} = event.target;
        setInputFilter(value)
    }, []);

    const renderRows = useCallback(() => {
        if (isEmpty(customers)) {
            return null;
        }

        return filter(customers, inputFilter).map((customer) => {
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
    }, [customers, classes, navigateToCustomerDetails, inputFilter, minWidth600, t]);

    if (isEmpty(customers) && customersStatus.isSuccess) {
        return (
            <Grid container justify='center' style={{display: 'grid', paddingTop: 24}}>
                <Typography variant='h5' style={{paddingBottom: 18}}>{t('NO_NEW_CUSTOMERS')}</Typography>
                <Button
                    type='submit'
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to={CUSTOMERS_CREATE}
                >
                    <PersonAddIcon className={classes.addCustomer}/>
                    {t('CREATE_CUSTOMER')}
                </Button>
            </Grid>
        );
    } else if(isEmpty(customers) && !customersStatus.isSuccess){
        return null;
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
                    to={CUSTOMERS_CREATE}
                >
                    <PersonAddIcon className={classes.addCustomer}/>
                    {t('CREATE_CUSTOMER')}
                </Button>
            </Grid>
        </Container>
    )
};

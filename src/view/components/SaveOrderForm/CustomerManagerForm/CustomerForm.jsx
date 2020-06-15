import React, {useCallback, useState} from "react";

import {
    Divider,
    Button,
    Grid,
    Typography,
} from "@material-ui/core";

import {CustomAutocomplete} from "../../Autocomplete/Autocomplete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import {CreateCustomer} from "../../../pages/CreateCustomer/CreateCustomer";
import isEmpty from 'lodash/isEmpty';
import {useTranslation} from "react-i18next";
import {closeModal, renderModal} from "../../../../data/store/auxiliary/auxiliaryActions";
import {useDispatch} from "react-redux";

export const CustomerForm = ({
                                 classes,
                                 setCreatedCustomer,
                                 customers,
                                 customerLoading,
                                 managerLoading,
                                 managers,
                                 manager,
                                 customer,
                                 onManagerSelectHandler,
                                 onCustomerSelectHandler
                             }) => {
    const {t} = useTranslation('');
    const dispatch = useDispatch();
    const [isCustomerAutocompleteOpen, setIsCustomerAutocompleteOpen] = useState(false);
    const [isManagerAutocompleteOpen, setIsManagerAutocompleteOpen] = useState(false);

    const toggleCustomerAutocomplete = useCallback(() => {
        setIsCustomerAutocompleteOpen(prevState => !prevState);
    }, []);

    const toggleManagerAutocomplete = useCallback(() => {
        setIsManagerAutocompleteOpen(prevState => !prevState);
    }, []);

    const updateCustomersList = useCallback((customer) => {
        setCreatedCustomer(customer);
    }, [setCreatedCustomer]);

    const renderCustomerOptions = useCallback((customer) => {
        return (
            <Grid container alignItems='center'>
                <Grid item xs>
                <span key={customer.customerId}>
                   {customer.name}
                </span>
                    <Typography variant='body2' color='textSecondary'>
                        {customer.username}
                    </Typography>
                </Grid>
            </Grid>
        );
    }, []);

    const getCustomerOptionLabel = useCallback(customer => {
        if (isEmpty(customer)) {
            return '';
        }
        return customer.name
    }, []);

    const renderManagerOptions = useCallback((manager) => {
        return (
            <Grid container alignItems='center'>
                <Grid item xs>
                <span key={manager.userId}>
                   {manager.lastName} {manager.firstName} {manager.middleName}
                </span>
                    <Typography variant='body2' color='textSecondary'>
                        {manager.email}
                    </Typography>
                </Grid>
            </Grid>
        );
    }, []);

    const getManagerOptionLabel = useCallback(manager => {
        if (isEmpty(manager)) {
            return ''
        }
        return `${manager.firstName} ${manager.lastName}`;
    }, []);

    const filterCustomerOptions = useCallback((array, {inputValue}) => {
        if (!array.length) {
            return [];
        }

        const matchWhitespacesRegExp = /\s/g;
        const formattedInputValue = inputValue.toLowerCase().replace(matchWhitespacesRegExp, '');

        return array.filter((item) => {
            return item.username.toLowerCase().replace(matchWhitespacesRegExp, '').indexOf(formattedInputValue) !== -1
                || item.name.toLowerCase().replace(matchWhitespacesRegExp, '').indexOf(formattedInputValue) !== -1;
        });
    }, []);

    const filterManagerOptions = useCallback((array, {inputValue}) => {
        if (!array.length) {
            return [];
        }

        const matchWhitespacesRegExp = /\s/g;
        const formattedInputValue = inputValue.toLowerCase().replace(matchWhitespacesRegExp, '');

        return array.filter((item) => {
            return `${item.firstName} ${item.lastName} ${item.middleName}`
                .toLowerCase()
                .replace(matchWhitespacesRegExp, '')
                .indexOf(formattedInputValue) !== -1;
        });
    }, []);


    const handleCreateCustomer = useCallback(() => {
        dispatch(renderModal({
                isOpen: true,
                children: (<CreateCustomer
                    updateCustomerList={updateCustomersList}
                />),
                onCloseHandler: () => dispatch(closeModal())
            })
        )
    }, [dispatch, updateCustomersList]);


    return (
        <>
            <Grid item xl={12} xs={12}>
                <Typography className={classes.heading} variant='h6'>
                    {t('CUSTOMER')}
                </Typography>
                <Divider/>
            </Grid>
            <Grid item lg={1} sm={2} md={2} xs={2} className={classes.gridButton}>
                <Button
                    margin='normal'
                    color='primary'
                    fullWidth
                    onClick={handleCreateCustomer}
                >
                    <PersonAddIcon/>
                </Button>
            </Grid>
            <Grid item lg={11} sm={10} md={10} xs={10} className={classes.gridCustomers}>
                <CustomAutocomplete
                    isOpen={isCustomerAutocompleteOpen}
                    options={customers}
                    isLoading={customerLoading}
                    onSelectHandler={onCustomerSelectHandler}
                    onToggle={toggleCustomerAutocomplete}
                    onClose={toggleCustomerAutocomplete}
                    renderOption={renderCustomerOptions}
                    inputLabel={t('SELECT_CUSTOMER')}
                    getOptionLabel={getCustomerOptionLabel}
                    value={customer || ''}
                    onInputChangedHandler={() => {
                    }}
                    filterOptions={filterCustomerOptions}
                />
            </Grid>
            <Grid item lg={12} xs={12}>
                <Grid item>
                    <CustomAutocomplete
                        isOpen={isManagerAutocompleteOpen}
                        options={managers}
                        isLoading={managerLoading}
                        onToggle={toggleManagerAutocomplete}
                        onClose={toggleManagerAutocomplete}
                        onSelectHandler={onManagerSelectHandler}
                        renderOption={renderManagerOptions}
                        inputLabel={t('SELECT_MANAGER')}
                        getOptionLabel={getManagerOptionLabel}
                        value={manager || ''}
                        onInputChangedHandler={() => {
                        }}
                        filterOptions={filterManagerOptions}
                    />
                </Grid>
            </Grid>
        </>
    );
};

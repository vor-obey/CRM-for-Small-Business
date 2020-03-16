import React, {useCallback, useState} from "react";

import {
    Divider,
    Button,
    Grid,
    Typography,
} from "@material-ui/core";

import {CustomAutocomplete} from "../../../components/Autocomplete/Autocomplete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import {CustomModal} from "../../../components/CustomModal/CustomModal";
import {CreateCustomer} from "../../CreateCustomer/CreateCustomer";
import isEmpty from 'lodash/isEmpty';
import {useTranslation} from "react-i18next";

export const CustomerForm = ({
                                 classes,
                                 setCreatedCustomer,
                                 customers,
                                 managers,
                                 manager,
                                 customer,
                                 onManagerSelectHandler,
                                 onCustomerSelectHandler
                             }) => {
    const { t } = useTranslation('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCustomerAutocompleteOpen, setIsCustomerAutocompleteOpen] = useState(false);
    const [isManagerAutocompleteOpen, setIsManagerAutocompleteOpen] = useState(false);

    const toggleCustomerAutocomplete = useCallback(() => {
        setIsCustomerAutocompleteOpen(prevState => !prevState);
    }, []);

    const toggleManagerAutocomplete = useCallback(() => {
        setIsManagerAutocompleteOpen(prevState => !prevState);
    }, []);

    const toggleModal = useCallback(() => {
        setIsModalOpen(prevState => !prevState);
    }, []);

    const updateCustomersList = useCallback((customer) => {
        setCreatedCustomer(customer);
        toggleModal();
    }, [setCreatedCustomer, toggleModal]);

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
                   {manager.firstName} {manager.lastName}
                </span>
                    <Typography variant='body2' color='textSecondary'>
                        {manager.email}
                    </Typography>
                </Grid>
            </Grid>
        )
    }, []);

    const getManagerOptionLabel = useCallback(manager => {
        if (isEmpty(manager)) {
            return ''
        }
        return `${manager.firstName} ${manager.lastName}`;
    }, []);

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
                    onClick={toggleModal}
                >
                    <PersonAddIcon/>
                </Button>
            </Grid>
            <CustomModal
                open={isModalOpen}
                classes={classes}
                handleClose={toggleModal}
            >
                <CreateCustomer
                    updateCustomerList={updateCustomersList}
                />
            </CustomModal>
            <Grid item lg={11} sm={10} md={10} xs={10} className={classes.gridCustomers}>
                <CustomAutocomplete
                    isOpen={isCustomerAutocompleteOpen}
                    options={customers}
                    isLoading={!customers.length}
                    onSelectHandler={onCustomerSelectHandler}
                    onToggle={toggleCustomerAutocomplete}
                    onClose={toggleCustomerAutocomplete}
                    renderOption={renderCustomerOptions}
                    inputLabel={t('SELECTCUSTOMER')}
                    getOptionLabel={getCustomerOptionLabel}
                    value={customer}
                />
            </Grid>
            <Grid item lg={12} xs={12}>
                <Grid item>
                    <CustomAutocomplete
                        isOpen={isManagerAutocompleteOpen}
                        options={managers}
                        isLoading={!managers.length}
                        onToggle={toggleManagerAutocomplete}
                        onClose={toggleManagerAutocomplete}
                        onSelectHandler={onManagerSelectHandler}
                        renderOption={renderManagerOptions}
                        inputLabel={t('SELECTMANAGER')}
                        getOptionLabel={getManagerOptionLabel}
                        value={manager}
                    />
                </Grid>
            </Grid>
        </>
    );
};

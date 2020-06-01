import React, {useCallback, useEffect, useState} from 'react';
import isEmpty from 'lodash/isEmpty';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {internetDocumentStyles} from './InternetDocument.style';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';
import NovaPoshtaService from '../../../services/NovaPoshtaService';
import {Container, makeStyles, Grid, Button, Typography, TextField} from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {NovaPoshtaAddress} from '../NovaPoshtaAddress/NovaPoshtaAddress';

const useStyles = makeStyles(internetDocumentStyles);

const autocompleteBreakpoints = {
    xl: 6,
    lg: 6,
    sm: 6,
    xs: 12,
};

export const InternetDocument = ({orderDetails, handleClose}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [parcelDetails, setParcelDetails] = useState({
        weight: '',
        seatsAmount: '',
        description: '',
        cost: ''
    });
    const [recipient, setRecipient] = useState({
        fullName: '',
        phone: ''
    });
    const [senderPhone, setSenderPhone] = useState('');
    const {t} = useTranslation('');
    const [novaposhtaAddress, setNovaposhtaAddress] = useState({
        city: null,
        warehouse: null
    });

    const calculateTotalPoints = useCallback(() => {
        return `${orderDetails.orderToProducts.reduce((a, b) => a + b.orderProductPrice, 0)}`;
    }, [orderDetails]);

    useEffect(() => {
        if (orderDetails) {
            setRecipient({
                fullName: orderDetails.customer.name,
                phone: orderDetails.customer.contactNumber
            });
            setSenderPhone(orderDetails.manager.contactNumber);

            setParcelDetails({
                weight: '',
                seatsAmount: '',
                description: '',
                cost: calculateTotalPoints(),
            });
        }
    }, [orderDetails, calculateTotalPoints]);

    const onChangedParcelDetailsInput = useCallback((event) => {
        const {value, name} = event.target;
        setParcelDetails(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    }, []);

    const onChangedRecipientDetailsInput = useCallback((event) => {
        const {value, name} = event.target;
        setRecipient(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    }, []);

    const onChangedSenderPhone = useCallback((event) => {
        const {value} = event.target;
        setSenderPhone(value);
    }, []);

    const submit = useCallback(async () => {
        if (isEmpty(novaposhtaAddress.city) || isEmpty(novaposhtaAddress.warehouse)) {
            dispatch(setSnackBarStatus({isOpen: true, message: t('FILL_ALL_THE_FIELDS'), success: false}))
        } else {
            try {
                dispatch(setIsLoading(true));
                const response = await NovaPoshtaService.createInternetDocument({
                    orderId: orderDetails.orderId,
                    ...parcelDetails,
                    sender: {
                        cityRef: novaposhtaAddress.city.Ref,
                        warehouseRef: novaposhtaAddress.warehouse.Ref,
                        phone: senderPhone
                    },
                    recipient
                });
                if (response.success) {
                    dispatch(setIsLoading(false));
                    const internetDocument = response.data[0].IntDocNumber;
                    const {url} = await NovaPoshtaService.getInternetDocumentToPrint(internetDocument);
                    window.open(url);
                    handleClose();
                } else {
                    const err = response.errors.map((error, i) => {
                        return <span key={i} style={{display: 'block'}}>{t(response.errorCodes[i])}</span>
                    });
                    dispatch(setSnackBarStatus({isOpen: true, message: err, success: false}));
                    dispatch(setIsLoading(false));
                }
            } catch (e) {
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
                dispatch(setIsLoading(false));
            }
        }
    }, [t, dispatch, orderDetails, parcelDetails, recipient, senderPhone, handleClose, novaposhtaAddress]);

    const onNovaposhtaAddressSelectHandler = useCallback((obj) => {
        const {city, warehouse} = obj;
        if (city !== undefined) {
            setNovaposhtaAddress(prevState => ({...prevState, city}));
        }
        if (warehouse !== undefined) {
            setNovaposhtaAddress(prevState => ({...prevState, warehouse}));
        }
    }, []);

    const handleClick = useCallback((status) => {
        switch (status) {
            case 'fullName': {
                setRecipient({
                    fullName: orderDetails.customer.name,
                    phone: recipient.phone
                });
                break;
            }
            case 'recipientPhone': {
                setRecipient({
                    fullName: recipient.fullName,
                    phone: orderDetails.customer.contactNumber
                });
                break;
            }
            case 'senderPhone': {
                setSenderPhone(orderDetails.manager.contactNumber);
                break;
            }
            case 'cost': {
                setParcelDetails({
                    ...parcelDetails,
                    cost: calculateTotalPoints(),
                });
                break;
            }
            default: {
            }
        }
    }, [setRecipient, recipient, calculateTotalPoints, orderDetails, parcelDetails]);

    return (
        <Container className={classes.container}>
            <Grid container item xl={12} className={classes.root}>
                <Grid item xs={12} className={classes.title}>
                    <Typography variant='h6'>
                        {t('CREATE_INTERNET_DOCUMENT')}
                    </Typography>
                </Grid>
                <Grid container item sm={12} xs={12} spacing={2}>
                    <Grid item xl={12} xs={12}>
                        <TextField
                            label={t('DESCRIPTION')}
                            name="description"
                            variant="outlined"
                            type="text"
                            value={parcelDetails.description}
                            onChange={onChangedParcelDetailsInput}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <TextField
                            label={t('WEIGHT')}
                            name="weight"
                            variant="outlined"
                            type="number"
                            value={parcelDetails.weight}
                            onChange={onChangedParcelDetailsInput}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <TextField
                            label={t('SEATS_AMOUNT')}
                            name="seatsAmount"
                            variant="outlined"
                            value={parcelDetails.seatsAmount}
                            type="number"
                            onChange={onChangedParcelDetailsInput}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <TextField
                            label={t('COST')}
                            name="cost"
                            variant="outlined"
                            type="number"
                            value={parcelDetails.cost}
                            onChange={onChangedParcelDetailsInput}
                            InputProps={{
                                endAdornment: (
                                    <React.Fragment>
                                        {parcelDetails.cost !== calculateTotalPoints() ?
                                            <Button onClick={() => handleClick('cost')}><RestoreIcon
                                                color='primary'/></Button> : null}
                                    </React.Fragment>
                                )
                            }}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <TextField
                            label={t('RECIPIENT_FULL_NAME')}
                            name="fullName"
                            variant="outlined"
                            type="text"
                            value={recipient.fullName}
                            onChange={onChangedRecipientDetailsInput}
                            InputProps={{
                                endAdornment: (
                                    <React.Fragment>
                                        {recipient.fullName !== orderDetails.customer.name ?
                                            <Button onClick={() => handleClick('fullName')}><RestoreIcon
                                                color='primary'/></Button> : null}
                                    </React.Fragment>
                                )
                            }}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <TextField
                            label={t('RECIPIENT_PHONE')}
                            name="phone"
                            variant="outlined"
                            type="number"
                            value={recipient.phone}
                            onChange={onChangedRecipientDetailsInput}
                            InputProps={{
                                endAdornment: (
                                    <React.Fragment>
                                        {recipient.phone !== orderDetails.customer.contactNumber ?
                                            <Button onClick={() => handleClick('recipientPhone')}><RestoreIcon
                                                color='primary'/></Button> : null}
                                    </React.Fragment>
                                )
                            }}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <TextField
                            label={t('SENDER_PHONE')}
                            name="phone"
                            variant="outlined"
                            type="number"
                            value={senderPhone}
                            onChange={onChangedSenderPhone}
                            InputProps={{
                                endAdornment: (
                                    <React.Fragment>
                                        {senderPhone !== orderDetails.manager.contactNumber ?
                                            <Button onClick={() => handleClick('senderPhone')}><RestoreIcon
                                                color='primary'/></Button> : null}
                                    </React.Fragment>
                                )
                            }}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} style={{textAlign: 'center', padding: '10px 0'}}>
                        <Typography variant='h6'>
                            {t('SELECT_SENDER_ADDRESS')}
                        </Typography>
                    </Grid>
                    <NovaPoshtaAddress
                        breakPoints={autocompleteBreakpoints}
                        label={{
                            city: t('SENDER_CITY'),
                            warehouse: t('SENDER_WAREHOUSE')
                        }}
                        onNovaposhtaAddressSelectHandler={onNovaposhtaAddressSelectHandler}
                    />
                </Grid>
                <Grid item xs={12} style={{textAlign: 'center', padding: '10px 0 0'}}>
                    <Button
                        type='submit'
                        variant="outlined"
                        color="primary"
                        onClick={submit}
                    >
                        {t('SUBMIT')}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
};

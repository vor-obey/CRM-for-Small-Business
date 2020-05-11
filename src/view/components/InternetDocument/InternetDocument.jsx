import React, {useCallback, useEffect, useState} from 'react';
import isEmpty from 'lodash/isEmpty';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {internetDocumentStyles} from './InternetDocument.style';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';
import NovaPoshtaService from '../../../services/NovaPoshtaService';
import {NovaPoshtaAddress} from '../NovaPoshtaAddress/NovaPoshtaAddress';
import {Container, makeStyles, Grid, Button, Typography, TextField} from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';

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
    const city = useSelector(state => state.autocompleteReducer.city);
    const warehouse = useSelector(state => state.autocompleteReducer.warehouse);
    const {t} = useTranslation('');

    const cost = orderDetails.orderToProducts.map(cost => {
        return cost.orderProductPrice
    });

    const amount = orderDetails.orderToProducts.map(amount => {
        return amount.amount
    });

    useEffect(() => {
        if (orderDetails) {
            setRecipient({
                fullName: orderDetails.customer.name,
                phone: orderDetails.customer.contactNumber
            });
            setSenderPhone(orderDetails.manager.contactNumber);

            setParcelDetails({
                weight: '',
                seatsAmount: orderDetails.orderToProducts.map(amount => amount.amount),
                description: '',
                cost: orderDetails.orderToProducts.map(cost => cost.orderProductPrice),
            });
        }
    }, [orderDetails]);

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
        if (isEmpty(city) || isEmpty(warehouse)) {
            dispatch(setSnackBarStatus({isOpen: true, message: 'Fill all the fields', success: false}))
        } else {
            try {
                dispatch(setIsLoading(true));
                const response = await NovaPoshtaService.createInternetDocument({
                    orderId: orderDetails.orderId,
                    ...parcelDetails,
                    sender: {
                        cityRef: city.Ref,
                        warehouseRef: warehouse.Ref,
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
    }, [t, dispatch, orderDetails, city, parcelDetails, warehouse, recipient, senderPhone, handleClose]);


    const handleClick = useCallback((status) => {
        switch (status) {
            case 1: {
                setRecipient({
                    fullName: orderDetails.customer.name,
                    phone: recipient.phone
                });
                break;
            }
            case 2: {
                setRecipient({
                    fullName: recipient.fullName,
                    phone: orderDetails.customer.contactNumber
                });
                break;
            }
            case 3: {
                setSenderPhone(orderDetails.manager.contactNumber);
                break;
            }
            case 4: {
                setParcelDetails({
                    weight: parcelDetails.weight,
                    seatsAmount: amount,
                    description: parcelDetails.description,
                    cost: parcelDetails.cost,
                });
                break;
            }
            case 5: {
                setParcelDetails({
                    weight: parcelDetails.weight,
                    seatsAmount: parcelDetails.seatsAmount,
                    description: parcelDetails.description,
                    cost: cost,
                });
                break;
            }
            default: {}
        }
    }, [setRecipient, recipient, orderDetails, parcelDetails, cost, amount]);

    return (
        <Container>
            <Grid container item xl={12} className={classes.root}>
                <Grid item xs={12} style={{textAlign: 'center', padding: '5px 0 5px 0'}}>
                    <Typography variant='h6'>
                        {t('CREATE_INTERNET_DOCUMENT')}
                    </Typography>
                </Grid>
                <Grid container item xl={12} xs={12} spacing={2}>
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
                            type="text"
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
                            type="text"
                            value={parcelDetails.seatsAmount}
                            onChange={onChangedParcelDetailsInput}
                            InputProps={{
                                endAdornment: (
                                    <React.Fragment>
                                        {parcelDetails.seatsAmount > amount || parcelDetails.seatsAmount < amount ? <Button onClick={() => handleClick(4)}><RestoreIcon color='primary'/></Button> : null}
                                    </React.Fragment>
                                )
                            }}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <TextField
                            label={t('COST')}
                            name="cost"
                            variant="outlined"
                            type="text"
                            value={parcelDetails.cost}
                            onChange={onChangedParcelDetailsInput}
                            InputProps={{
                                endAdornment: (
                                    <React.Fragment>
                                        {parcelDetails.cost > cost || parcelDetails.cost < cost? <Button onClick={() => handleClick(5)}><RestoreIcon color='primary'/></Button> : null}
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
                                        {recipient.fullName !== orderDetails.customer.name ? <Button onClick={() => handleClick(1)}><RestoreIcon color='primary'/></Button> : null}
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
                            type="text"
                            value={recipient.phone}
                            onChange={onChangedRecipientDetailsInput}
                            InputProps={{
                                endAdornment: (
                                    <React.Fragment>
                                        {recipient.phone !== orderDetails.customer.contactNumber ? <Button onClick={() => handleClick(2)}><RestoreIcon color='primary'/></Button> : null}
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
                            type="text"
                            value={senderPhone}
                            onChange={onChangedSenderPhone}
                            InputProps={{
                                endAdornment: (
                                    <React.Fragment>
                                        {senderPhone !== orderDetails.manager.contactNumber ? <Button onClick={() => handleClick(3)}><RestoreIcon color='primary'/></Button> : null}
                                    </React.Fragment>
                                )
                            }}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} style={{textAlign: 'center', padding: '5px 0 5px 0'}}>
                        <Typography variant='h6'>
                            {t('SELECT_SENDER_ADDRESS')}
                        </Typography>
                    </Grid>
                    <NovaPoshtaAddress
                        breakPoints={autocompleteBreakpoints}
                        classes={{
                            city: classes.cityAutocomplete,
                            warehouse: classes.warehouseAutocomplete
                        }}
                        label={{
                            city: t('SENDER_CITY'),
                            warehouse: t('SENDER_WAREHOUSE')
                        }}
                    />
                </Grid>
                <Grid item xs={12} style={{textAlign: 'center'}}>
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

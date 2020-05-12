import React, {useCallback, useState} from "react";
import {OrderService} from "../../../services/index";
import {Link, useParams} from 'react-router-dom';
import {Grid, TextField, Container, Button, makeStyles, Typography, Paper} from "@material-ui/core";
import {orderDetailsStyles} from "./OrderDetailsPage.style";
import {OrderDetails} from './OrderDetails/OrderDetails';
import {useDispatch} from 'react-redux';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';
import isEmpty from 'lodash/isEmpty';
import {CustomDialog} from '../../components/CustomDialog/CustomDialog';
import {useTranslation} from "react-i18next";
import {CustomModal} from '../../components/CustomModal/CustomModal';
import {InternetDocument} from '../../components/InternetDocument/InternetDocument';
import {useOrderDetailsById} from '../../../utils/hooks/orderHooks';

const useStyles = makeStyles(orderDetailsStyles);

export const OrderDetailsPage = ({history}) => {
    const {id} = useParams();
    const [orderDetails, setOrderDetails] = useOrderDetailsById(id);
    const {shippingDetails: {address: {isCustom} = {}} = {}} = orderDetails;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const {t} = useTranslation('');

    const onStatusSelectHandler = useCallback(async (value) => {
        const {orderId} = orderDetails;
        try {
            dispatch(setIsLoading(true));
            const response = await OrderService.update({
                orderId,
                status: value,
            });
            if (response.success) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: t('STATUS_UPDATED_SUCCESSFULLY'), success: true}));
                setOrderDetails(prevState => {
                    return {
                        ...prevState,
                        status: parseInt(value)
                    };
                });
            } else {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: t('ERROR'), success: false}));
            }
        } catch {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: t('ERROR'), success: false}));
        }
    }, [dispatch, orderDetails, setOrderDetails, t]);


    const togglePrintModal = useCallback(() => {
        setIsPrintModalOpen(prevState => !prevState);
    }, []);

    const renderShippingAddress = useCallback(() => {
        if (isEmpty(orderDetails)) {
            return null;
        }

        const {isCustom, address} = orderDetails.shippingDetails.address;
        const parsedAddress = JSON.parse(address);

        if (!isCustom) {
            return (
                <>
                    <Grid item xs={12} sm={10} className={classes.containerFieldsItem}>
                        <Typography
                            variant='body2'
                            color='textSecondary'>
                            {t('CITY')}
                        </Typography>
                        <Typography
                            variant='body1'
                            className={classes.orderItem}>
                            {parsedAddress.city.Description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={10} className={classes.containerFieldsItem}>
                        <Typography
                            variant='body2'
                            color='textSecondary'>
                            {t('WAREHOUSE')}
                        </Typography>
                        <Typography
                            variant='body1'
                            className={classes.orderItem}>
                            {parsedAddress.warehouse.Description}
                        </Typography>
                    </Grid>
                </>
            )
        }
        return (
            <Grid container>
                <Grid item xl={12} lg={12} xs={12}>
                    <TextField
                        label={t('ADDRESS')}
                        margin="normal"
                        name="Address"
                        type="text"
                        value={parsedAddress}
                        inputProps={{
                            readOnly: true
                        }}
                        fullWidth
                    />
                </Grid>
            </Grid>
        )
    }, [classes, orderDetails, t]);

    const renderPrintButton = useCallback(() => {
        if (isEmpty(orderDetails) || isCustom) {
            return null;
        }

        return (
            <Button
                type='submit'
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={togglePrintModal}>
                {t('PRINT')}
            </Button>
        );

    }, [togglePrintModal, classes, orderDetails, isCustom, t]);

    const deleteOrder = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            const response = await OrderService.delete(id);
            if (response.success) {
                dispatch(setIsLoading(false));
                history.push('/orders');
            } else {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: false, message: COMMON_ERROR_MESSAGE, success: false}));
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
        }
    }, [id, history, dispatch]);

    const toggleDialog = useCallback(() => {
        setIsDialogOpen(prevState => !prevState);
    }, []);

    return (
        <Container maxWidth='md' className={classes.root}>
            <Paper className={classes.paper}>
                <OrderDetails
                    orderDetails={orderDetails}
                    classes={classes}
                    renderShippingAddress={renderShippingAddress}
                    onStatusSelectHandler={onStatusSelectHandler}
                />
                <Grid container item xs={12} sm={12} className={classes.buttonContainer}>
                    <Button
                        type='submit'
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        component={Link}
                        to='/orders'
                    >
                        {t('BACK')}
                    </Button>
                    <Button
                        type='submit'
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        onClick={toggleDialog}
                    >
                        {t('DELETE')}
                    </Button>
                    <Button
                        type='submit'
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        component={Link}
                        to={`/orders/${id}/edit`}
                    >
                        {t('EDIT')}
                    </Button>
                    {renderPrintButton()}
                </Grid>
                <CustomDialog
                    title={t('DELETE_ORDER')}
                    isShow={isDialogOpen}
                    onClose={toggleDialog}
                    closeText={t('DISAGREE')}
                    actionText={t('AGREE')}
                    onAction={deleteOrder}
                >
                    {t('CONFIRM_DELETE')}
                </CustomDialog>
                <CustomModal
                    classes={classes}
                    open={isPrintModalOpen}
                    handleClose={togglePrintModal}
                    breakpoints={{
                        xl: 12
                    }}
                >
                    <InternetDocument
                        orderDetails={orderDetails}
                        handleClose={togglePrintModal}
                    />
                </CustomModal>
            </Paper>
        </Container>
    );
};

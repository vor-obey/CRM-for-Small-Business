import React, {useCallback, useState} from "react";
import {OrderService} from "../../../services/index";
import {Link, useParams} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import {orderDetailsStyles} from "./OrderDetailsPage.style";
import {OrderDetails} from './OrderDetails/OrderDetails';
import {useDispatch} from 'react-redux';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import isEmpty from 'lodash/isEmpty';
import {Container} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {CustomDialog} from '../../components/CustomDialog/CustomDialog';
import {useOrderDetailsById} from '../../../utils/customHooks';
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(orderDetailsStyles);

export const OrderDetailsPage = ({history}) => {
    const {id} = useParams();
    const orderDetails = useOrderDetailsById(id);
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation('');

    const renderShippingAddress = useCallback(() => {
        if (isEmpty(orderDetails.shippingDetails)) {
           return null;
        }

        const {isCustom, address} = orderDetails.shippingDetails.address;

        if (!isCustom) {
            const parsedAddress = JSON.parse(address);
            return (
                <Grid container xl={12}>
                    <Grid item lg={12} xs={12}>
                        <TextField
                            label={t('CITY')}
                            margin="normal"
                            name="City"
                            type="text"
                            value={parsedAddress.address.city.Description}
                            inputProps={{
                                readOnly: true
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <TextField
                            label={t('WAREHOUSE')}
                            margin="normal"
                            name="warehouse"
                            type="text"
                            value={parsedAddress.address.warehouse.Description}
                            inputProps={{
                                readOnly: true
                            }}
                            fullWidth
                        />
                    </Grid>
                </Grid>
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
                        value={orderDetails.shippingDetails.address.address}
                        inputProps={{
                            readOnly: true
                        }}
                        fullWidth
                    />
                </Grid>
            </Grid>
        )
    }, [orderDetails, t]);

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
        setIsOpen(prevState => !prevState);
    }, []);


    return (
        <Container className={classes.root}>
            <OrderDetails
                orderDetails={orderDetails}
                classes={classes}
                renderShippingAddress={renderShippingAddress}
            />
            <Grid container justify="center">
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
            </Grid>
            <CustomDialog
                title={t('DELETEORDER')}
                isShow={isOpen}
                onClose={toggleDialog}
                closeText={t('DISAGREE')}
                actionText={t('AGREE')}
                onAction={deleteOrder}
            >
                {t('SUREDELETE')}
            </CustomDialog>
        </Container>
    );
};

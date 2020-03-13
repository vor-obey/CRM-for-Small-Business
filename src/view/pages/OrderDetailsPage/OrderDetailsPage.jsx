import React, {useCallback, useEffect, useState} from "react";
import {OrderService} from "../../../services/index";
import {useParams} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import {orderDetailsStyles} from "./OrderDetailsPage.style";
import {OrderDetails} from './OrderDetails/OrderDetails';
import {useDispatch} from 'react-redux';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import isEmpty from 'lodash/isEmpty';

const useStyles = makeStyles(orderDetailsStyles);

export const OrderDetailsPage = () => {
    const {id} = useParams();
    const [orderDetails, setOrderDetails] = useState({});
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOrderById = async (id) => {
            try {
                dispatch(setIsLoading(true));
                const response = await OrderService.findOneById(id);
                setOrderDetails(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
                dispatch(setIsLoading(false))
            }
        };
        fetchOrderById(id);
    }, [id, dispatch]);

    const renderShippingAddress = useCallback(() => {
        if (isEmpty(orderDetails)) {
            return null;
        }

        const {isCustom, address} = orderDetails.shippingDetails.address;

        if (!isCustom) {
            const parsedAddress = JSON.parse(address);
            return (
                <Grid container xl={12}>
                    <Grid item lg={12} xs={12}>
                        <TextField
                            label="City"
                            margin="normal"
                            name="City"
                            type="text"
                            value={parsedAddress.city.city}
                            inputProps={{
                                readOnly: true
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <TextField
                            label="Warehouse"
                            margin="normal"
                            name="warehouse"
                            type="text"
                            value={parsedAddress.warehouse.warehouse}
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
                        label="City"
                        margin="normal"
                        name="City"
                        type="text"
                        value={address}
                        inputProps={{
                            readOnly: true
                        }}
                        fullWidth
                    />
                </Grid>
            </Grid>
        )
    }, [orderDetails]);

    return (
        <OrderDetails
            orderDetails={orderDetails}
            classes={classes}
            renderShippingAddress={renderShippingAddress}
        />
    );
};

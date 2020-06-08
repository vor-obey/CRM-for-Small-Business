import React, {useCallback, useEffect} from 'react';
import {Divider, FormControl, Grid, InputLabel, OutlinedInput} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {setDescriptionToOrder} from "../../../../data/store/order/orderActions";
import isEmpty from "lodash/isEmpty";

export const DescriptionForm = ({isEdit, orderDetails}) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const orderStoreDescription = useSelector(state => state.orderReducer.description);

    useEffect(() => {
        if (!isEmpty(orderDetails)) {
            console.log(orderDetails);
            dispatch(setDescriptionToOrder(orderDetails.description));
        }
        return () => {
            if (isEdit) {
                dispatch(setDescriptionToOrder(''));
            }
        }
    }, [orderDetails, isEdit, dispatch]);

    const onOrderDescriptionChange = useCallback((event) => {
        dispatch(setDescriptionToOrder(event.target.value))
    }, [dispatch]);

    return (
        <Grid container item xs={12} sm={12}>
            <FormControl variant="outlined" fullWidth>
                <InputLabel>{t('DESCRIPTION')}</InputLabel>
                <OutlinedInput
                    label={t('DESCRIPTION')}
                    name='price'
                    type='text'
                    variant='outlined'
                    labelWidth={70}
                    value={orderStoreDescription}
                    onChange={onOrderDescriptionChange}
                />
            </FormControl>
            <Divider/>
        </Grid>
    );
};

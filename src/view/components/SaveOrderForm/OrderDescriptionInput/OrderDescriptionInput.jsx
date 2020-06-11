import React, {useCallback, useEffect} from 'react';
import {Divider, FormControl, Grid, InputLabel, OutlinedInput} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {setOrderDescription} from "../../../../data/store/order/orderActions";

export const OrderDescriptionInput = ({isEdit, description}) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const orderDescription = useSelector(state => state.orderReducer.description);

    useEffect(() => {
        if (description) {
            dispatch(setOrderDescription(description));
        }
        return () => {
            if (isEdit) {
                dispatch(setOrderDescription(''));
            }
        }
    }, [description, isEdit, dispatch]);

    const onChangedInput = useCallback((event) => {
        dispatch(setOrderDescription(event.target.value))
    }, [dispatch]);

    return (
        <Grid container item xs={12} sm={12}>
            <FormControl variant="outlined" fullWidth>
                <InputLabel>{t('DESCRIPTION')}</InputLabel>
                <OutlinedInput
                    label={t('DESCRIPTION')}
                    name='description'
                    type='text'
                    variant='outlined'
                    labelWidth={70}
                    value={orderDescription}
                    onChange={onChangedInput}
                />
            </FormControl>
            <Divider/>
        </Grid>
    );
};

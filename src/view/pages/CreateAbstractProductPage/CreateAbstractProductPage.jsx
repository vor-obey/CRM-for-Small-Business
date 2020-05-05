import React, {useCallback} from 'react';
import {SaveAbstractProduct} from '../../components/SaveAbstractProduct/SaveAbstractProduct';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import AbstractProductService from '../../../services/AbstractProductService';
import {useDispatch} from 'react-redux';
import {useTranslation} from "react-i18next";

export const CreateAbstractProductPage = ({history}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const createAbstractProduct = useCallback(async (data) => {
        const {productTypeId, abstractProductDetails} = data;
        try {
            dispatch(setIsLoading(true));
            await AbstractProductService.create({
                productTypeId,
                name: abstractProductDetails.name,
                price: abstractProductDetails.price,
                description: abstractProductDetails.description,
            });
            dispatch(setIsLoading(false));
            history.push('/abstract-products');
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        }
    }, [dispatch, history]);

    return (
        <SaveAbstractProduct
            labels={{
                title: t('CREATE_PRODUCT_CATEGORY'),
                button: t('CREATE')
            }}
            onSave={createAbstractProduct}
        />
    );
};
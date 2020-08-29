import React, {useCallback} from 'react';
import {SaveAbstractProduct} from '../../components/SaveAbstractProduct/SaveAbstractProduct';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import AbstractProductService from '../../../services/AbstractProductService';
import {useDispatch} from 'react-redux';
import {useTranslation} from "react-i18next";
import {PRODUCT_TEMPLATES, PRODUCTS_CREATE} from "../../../constants/routes";

export const CreateAbstractProductPage = ({history}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const createAbstractProduct = useCallback(async (data) => {
        const {productTypeId, abstractProductDetails} = data;
        try {
            dispatch(setIsLoading(true));
            const {abstractProductId} = await AbstractProductService.create({
                productTypeId,
                name: abstractProductDetails.name,
                price: abstractProductDetails.price,
                description: abstractProductDetails.description,
            });
            dispatch(setIsLoading(false));
            if (history.location.state !== undefined && history.location.state.createOrder) {
                history.push(PRODUCTS_CREATE, {
                    createOrder: true,
                    abstractProductId
                });
            } else if (history.location.state !== undefined && history.location.state.createProduct) {
                history.push(PRODUCTS_CREATE, {
                    abstractProductId
                });
            } else {
                history.push(PRODUCT_TEMPLATES);
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        }
    }, [dispatch, history]);

    return (
        <SaveAbstractProduct
            labels={{
                title: t('CREATE_PRODUCT_TEMPLATE'),
                button: t('CREATE')
            }}
            onSave={createAbstractProduct}
        />
    );
};
